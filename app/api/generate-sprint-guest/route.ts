import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/sprint-prompt';
import type { IntakeValues } from '@/lib/sprint-wizard-config';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const intake = (await request.json()) as IntakeValues;

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
    console.error('[generate-sprint-guest] Error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
