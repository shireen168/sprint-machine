import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/sprint-prompt';
import { validateIntake } from '@/lib/input-validation';
import { logger } from '@/lib/logger';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

logger.debug('Initializing generate-sprint endpoint');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '1 d'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      logger.warn('Unauthorized request to generate-sprint');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { success, remaining, reset } = await ratelimit.limit(`user:${userId}`);
    if (!success) {
      return NextResponse.json(
        { error: `Rate limit exceeded. ${remaining} generations remaining today.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) } }
      );
    }

    logger.debug('Sprint generation requested by user');
    const rawIntake = (await request.json()) as any;
    const intake = validateIntake(rawIntake);

    if (!intake) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

    const supabase = createServiceClient() as any;
    const userEmail = (sessionClaims?.email as string) || 'unknown@example.com';

    const { error: userUpsertError } = await supabase
      .from('users')
      .upsert({ id: userId, email: userEmail }, { onConflict: 'id' });

    if (userUpsertError) {
      logger.warn('User upsert failed');
    }

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

    if (insertError || !sprint) {
      logger.error('Sprint creation failed');
      return NextResponse.json({ error: 'Failed to create sprint' }, { status: 500 });
    }

    try {
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

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type');
      }

      let output;
      try {
        const jsonMatch = content.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        output = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        throw new Error('Failed to parse AI response');
      }

      const { error: updateError } = await supabase
        .from('sprints')
        .update({ status: 'complete', output })
        .eq('id', sprint.id);

      if (updateError) {
        throw new Error('Failed to save sprint output');
      }

      return NextResponse.json({ sprintId: sprint.id });
    } catch (aiError) {
      logger.error('Generation failed:', aiError instanceof Error ? aiError.message : String(aiError));
      await supabase
        .from('sprints')
        .update({ status: 'failed' })
        .eq('id', sprint.id);

      return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
  } catch (error) {
    logger.error('Request error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
