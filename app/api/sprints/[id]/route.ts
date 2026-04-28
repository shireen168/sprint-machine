import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { validateIntake } from '@/lib/input-validation';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '1 d'),
  analytics: true,
});

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a strategic marketing AI assistant that generates 30-day marketing sprint plans.

You must ALWAYS respond with valid JSON in this exact format:
{
  "offer": "clear, compelling description of what the customer gets",
  "campaign_theme": "unifying theme/angle for all marketing this month",
  "channel_strategy": ["bullet point 1", "bullet point 2", "bullet point 3 with specific allocations and reasoning"],
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
  "success_metric": ["metric 1: specific target", "metric 2: specific target", "metric 3: specific target"]
}

Generate practical, actionable advice. Keep copy concise and platform-appropriate.
Channel strategy should be 3-4 focused bullet points about which channels to prioritize and why.
Success metrics should be 3-6 specific, measurable goals for the 30-day period.`;

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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createServiceClient() as any;
    const { error } = await supabase.from('sprints').delete().eq('id', id).eq('user_id', userId);

    if (error) {
      logger.error('Delete failed');
      return NextResponse.json({ error: 'Failed to delete sprint' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Delete error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = createServiceClient() as any;

    // Handle partial updates (section edits)
    if (body.partialUpdate && body.output) {
      const { error } = await supabase
        .from('sprints')
        .update({ output: body.output })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw new Error('Failed to update sprint');
      return NextResponse.json({ success: true });
    }

    // Handle full regeneration (from edit wizard)
    const { success, remaining, reset } = await ratelimit.limit(`user:${userId}`);
    if (!success) {
      return NextResponse.json(
        { error: `Rate limit exceeded. ${remaining} regenerations remaining today.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) } }
      );
    }

    const rawIntake = body as any;
    const intake = validateIntake(rawIntake);
    if (!intake) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

    await supabase.from('sprints').update({ status: 'generating', intake, output: null }).eq('id', id).eq('user_id', userId);

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: USER_PROMPT_TEMPLATE(intake) }],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    const output = JSON.parse(jsonMatch[0]);

    const { error: updateError } = await supabase.from('sprints').update({ status: 'complete', output }).eq('id', id);

    if (updateError) throw new Error('Failed to save sprint');

    return NextResponse.json({ sprintId: id });
  } catch (error) {
    logger.error('Patch operation failed:', error instanceof Error ? error.message : String(error));
    const { id } = await params;
    const supabase = createServiceClient() as any;
    await supabase.from('sprints').update({ status: 'failed' }).eq('id', id);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
