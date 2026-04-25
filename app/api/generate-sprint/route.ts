import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a strategic marketing AI assistant that generates 30-day marketing sprint plans.

You must ALWAYS respond with valid JSON in this exact format:
{
  "offer": "clear, compelling description of what the customer gets",
  "campaign_theme": "unifying theme/angle for all marketing this month",
  "channel_strategy": "breakdown of which channels to prioritize and why",
  "content_calendar": {
    "w1": [
      {"day": "Monday", "topic": "topic", "platforms": ["platform"], "format": "format type"}
    ],
    "w2": [...],
    "w3": [...],
    "w4": [...]
  },
  "ready_to_use_copy": [
    {"day": "Day 1", "platform": "Instagram", "format": "Reel", "caption": "actual copy"}
  ],
  "success_metric": "how to measure success in 30 days"
}

Generate practical, actionable advice. Keep copy concise and platform-appropriate.`;

const USER_PROMPT_TEMPLATE = (intake: IntakeValues) => `
Generate a 30-day marketing sprint plan for:

Product: ${intake.product}
Target Customer: ${intake.customer}
Primary Goal: ${intake.goal}
Platforms: ${intake.platforms.join(', ')}
Monthly Budget: ${intake.budget}
Previous Attempts: ${intake.tried}
${intake.tried_details ? `Details: ${intake.tried_details}` : ''}
Differentiator: ${intake.differentiator}
${intake.extra ? `Additional Context: ${intake.extra}` : ''}

Please provide a comprehensive, ready-to-execute 30-day marketing plan in the JSON format specified.
`;

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse intake
    const intake = (await request.json()) as IntakeValues;
    if (!intake.product || !intake.customer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient() as any;

    console.log('[generate-sprint] Service client created, userId:', userId);
    console.log('[generate-sprint] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 20) + '...');

    // Ensure user exists with email
    const userEmail = (sessionClaims?.email as string) || 'unknown@example.com';
    const { error: userUpsertError } = await supabase
      .from('users')
      .upsert({ id: userId, email: userEmail }, { onConflict: 'id' });

    if (userUpsertError) {
      console.error('[generate-sprint] User upsert error:', userUpsertError);
    }

    // Insert sprint row (status: generating)
    const { data: sprint, error: insertError } = await supabase
      .from('sprints')
      .insert({
        user_id: userId,
        title: `30-Day Sprint: ${intake.product}`,
        goal: intake.goal,
        channels: intake.platforms,
        intake,
        status: 'generating',
      })
      .select()
      .single();

    if (insertError || !sprint) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create sprint' },
        { status: 500 }
      );
    }

    // Call Anthropic API
    try {
      console.log('[generate-sprint] Calling Anthropic API...');
      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20250501',
        max_tokens: 4000,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [
          {
            role: 'user',
            content: USER_PROMPT_TEMPLATE(intake),
          },
        ],
      });

      // Extract and parse response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type');
      }

      let output;
      try {
        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        output = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('Failed to parse AI response');
      }

      // Update sprint row (status: complete)
      const { error: updateError } = await supabase
        .from('sprints')
        .update({
          status: 'complete',
          output,
        })
        .eq('id', sprint.id);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error('Failed to save sprint output');
      }

      return NextResponse.json({
        sprintId: sprint.id,
      });
    } catch (aiError) {
      // Update sprint status to failed
      await supabase
        .from('sprints')
        .update({ status: 'failed' })
        .eq('id', sprint.id);

      console.error('AI generation error:', aiError);
      return NextResponse.json(
        { error: 'Generation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
