import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/sprint-prompt';
import { validateIntake } from '@/lib/input-validation';
import { logger } from '@/lib/logger';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '1 h'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { success, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. 1 request per hour.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          },
        }
      );
    }

    logger.debug('Guest sprint generation from:', ip);
    const rawIntake = (await request.json()) as any;
    const intake = validateIntake(rawIntake);

    if (!intake) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

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

    return NextResponse.json({ output });
  } catch (error) {
    logger.error('Guest generation error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
