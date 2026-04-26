import { auth } from '@clerk/nextjs/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const results = {
    auth: {} as any,
    supabase: {} as any,
    anthropic: {} as any,
  };

  // Test auth
  try {
    const { userId, sessionClaims } = await auth();
    results.auth = {
      success: true,
      userId: !!userId,
      email: sessionClaims?.email,
    };
  } catch (e) {
    results.auth = { success: false, error: String(e) };
  }

  // Test Supabase
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('users').select('count');
    results.supabase = {
      success: !error,
      error: error?.message,
    };
  } catch (e) {
    results.supabase = { success: false, error: String(e) };
  }

  // Test Anthropic
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Say hello' }],
    });
    results.anthropic = {
      success: true,
      hasContent: !!response.content[0],
    };
  } catch (e) {
    results.anthropic = { success: false, error: String(e) };
  }

  return NextResponse.json(results);
}
