import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/sprint-prompt';
import { validateIntake } from '@/lib/input-validation';
import { logger } from '@/lib/logger';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { NextRequest, NextResponse } from 'next/server';

logger.debug('Initializing generate-sprint endpoint');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      logger.warn('Unauthorized request to generate-sprint');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      logger.warn('User upsert failed:', userUpsertError);
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: userRow, error: userFetchError } = await supabase
      .from('users')
      .select('sprint_count_this_month, sprint_month')
      .eq('id', userId)
      .single();

    if (userFetchError) {
      logger.warn('Failed to fetch user sprint count:', userFetchError);
      return NextResponse.json({ error: 'Failed to check quota' }, { status: 500 });
    }

    const effectiveCount = userRow?.sprint_month !== currentMonth ? 0 : (userRow?.sprint_count_this_month ?? 0);
    const limit = 2;

    if (effectiveCount >= limit) {
      const nextReset = new Date();
      nextReset.setMonth(nextReset.getMonth() + 1, 1);
      nextReset.setHours(0, 0, 0, 0);
      const nextResetDate = nextReset.toISOString().slice(0, 10);

      return NextResponse.json(
        {
          error: 'Monthly limit reached',
          sprints_used: effectiveCount,
          sprints_remaining: 0,
          next_reset_date: nextResetDate,
        },
        { status: 429 }
      );
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
      logger.error('Sprint creation failed:', insertError);
      return NextResponse.json({ error: 'Failed to create sprint', details: insertError?.message }, { status: 500 });
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

      const newCount = effectiveCount + 1;
      const { error: countUpdateError } = await supabase
        .from('users')
        .update({
          sprint_count_this_month: newCount,
          sprint_month: currentMonth,
        })
        .eq('id', userId);

      if (countUpdateError) {
        logger.warn('Failed to update sprint count:', countUpdateError);
      }

      const nextReset = new Date();
      nextReset.setMonth(nextReset.getMonth() + 1, 1);
      nextReset.setHours(0, 0, 0, 0);
      const nextResetDate = nextReset.toISOString().slice(0, 10);

      return NextResponse.json({
        sprintId: sprint.id,
        sprints_used: newCount,
        sprints_remaining: limit - newCount,
        next_reset_date: nextResetDate,
      });
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
