import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import type { IntakeValues } from '@/lib/sprint-wizard-config';

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
