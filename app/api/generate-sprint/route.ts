import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/sprint-prompt';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { NextRequest, NextResponse } from 'next/server';

console.log('[generate-sprint] Init: ANTHROPIC_API_KEY present:', !!process.env.ANTHROPIC_API_KEY);
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const { userId, sessionClaims } = await auth();
    console.log('[generate-sprint] Auth result:', { userId, email: sessionClaims?.email });
    if (!userId) {
      console.error('[generate-sprint] No userId');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse intake
    const intake = (await request.json()) as IntakeValues;
    if (!intake.product || !intake.customer) {
      console.error('[generate-sprint] Missing fields:', { product: !!intake.product, customer: !!intake.customer });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('[generate-sprint] Creating Supabase client...');
    const supabase = createServiceClient() as any;
    console.log('[generate-sprint] Supabase client ready');

    // Ensure user exists with email
    const userEmail = (sessionClaims?.email as string) || 'unknown@example.com';
    console.log('[generate-sprint] Upserting user:', { userId, userEmail });
    const { error: userUpsertError } = await supabase
      .from('users')
      .upsert({ id: userId, email: userEmail }, { onConflict: 'id' });

    if (userUpsertError) {
      console.error('[generate-sprint] User upsert error:', userUpsertError);
    } else {
      console.log('[generate-sprint] User upsert successful');
    }

    // Insert sprint row (status: generating)
    console.log('[generate-sprint] Inserting sprint...');
    const { data: sprint, error: insertError } = await supabase
      .from('sprints')
      .insert({
        user_id: userId,
        title: `${intake.product} - ${intake.goal}`,
        goal: intake.goal,
        channels: intake.platforms,
        intake,
        status: 'generating',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[generate-sprint] Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create sprint' },
        { status: 500 }
      );
    }
    if (!sprint) {
      console.error('[generate-sprint] No sprint returned');
      return NextResponse.json(
        { error: 'Failed to create sprint' },
        { status: 500 }
      );
    }

    console.log('[generate-sprint] Sprint created:', sprint.id);

    // Call Anthropic API
    try {
      console.log('[generate-sprint] Calling Anthropic API...');
      console.log('[generate-sprint] API Key available:', !!client.apiKey || 'using env var');
      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
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

      console.log('[generate-sprint] API response received');

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
        const jsonStr = jsonMatch[0];
        console.log('[generate-sprint] Attempting to parse JSON...');
        console.log('[generate-sprint] JSON length:', jsonStr.length);
        console.log('[generate-sprint] First 500 chars:', jsonStr.substring(0, 500));
        console.log('[generate-sprint] copy_prompts check:', jsonStr.includes('"copy_prompts"'));
        output = JSON.parse(jsonStr);
        console.log('[generate-sprint] JSON parsed successfully');
      } catch (parseError) {
        console.error('[generate-sprint] Parse error:', parseError);
        console.error('[generate-sprint] Error position:', (parseError as any).message);
        throw new Error('Failed to parse AI response');
      }

      // Update sprint row (status: complete)
      console.log('[generate-sprint] Updating sprint status to complete...');
      const { error: updateError } = await supabase
        .from('sprints')
        .update({
          status: 'complete',
          output,
        })
        .eq('id', sprint.id);

      if (updateError) {
        console.error('[generate-sprint] Update error:', updateError);
        throw new Error('Failed to save sprint output');
      }

      console.log('[generate-sprint] Sprint completed successfully');
      return NextResponse.json({
        sprintId: sprint.id,
      });
    } catch (aiError) {
      console.error('[generate-sprint] AI generation error:', aiError);
      // Update sprint status to failed
      await supabase
        .from('sprints')
        .update({ status: 'failed' })
        .eq('id', sprint.id);

      return NextResponse.json(
        { error: 'Generation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[generate-sprint] Request error:', errorMsg);
    console.error('[generate-sprint] Stack:', error instanceof Error ? error.stack : '');
    return NextResponse.json(
      { error: 'Internal server error', details: errorMsg },
      { status: 500 }
    );
  }
}
