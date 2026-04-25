import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing Supabase env vars')
  process.exit(1)
}

const client = createClient(url, key)

const mockOutput = {
  offer: 'Transform your email marketing with AI-powered personalization. Send the right message to the right person at the right time.',
  campaign_theme: 'Personal Connection at Scale: Using AI to make every customer feel like your only customer.',
  channel_strategy: 'Primary: Email (3x/week), Secondary: LinkedIn (2x/week), Tertiary: Instagram Stories (daily). Focus on email for highest ROI.',
  content_calendar: {
    w1: [
      { day: 'Monday', topic: 'Email list growth hack', platforms: ['Email'], format: 'Newsletter' },
      { day: 'Wednesday', topic: 'AI personalization case study', platforms: ['LinkedIn'], format: 'Post' },
      { day: 'Friday', topic: 'Weekly wins', platforms: ['Email'], format: 'Newsletter' },
    ],
    w2: [],
    w3: [],
    w4: [],
  },
  ready_to_use_copy: [
    {
      day: 'Monday, Week 1',
      platform: 'Email',
      format: 'Newsletter',
      caption: 'Subject: Transform Your Email Strategy\n\nHey there,\n\nWe just finished analyzing 500+ successful email campaigns.\n\nHere\'s what actually works:\n\n1. Stop writing for everyone - write for segments\n2. Personalization isn\'t creepy, it\'s expected\n3. The best subject lines answer a specific problem\n\nInside: the template.',
    },
    {
      day: 'Wednesday, Week 1',
      platform: 'LinkedIn',
      format: 'Post',
      caption: 'We tested AI-powered email personalization on 10k subscribers.\n\nResults:\n- 34% higher open rates\n- 22% higher click-through\n- 18% higher conversions\n\nThe secret? Stop writing for "everyone".',
    },
    {
      day: 'Friday, Week 1',
      platform: 'Email',
      format: 'Newsletter',
      caption: 'Your wins this week:\n\n✓ 156 new subscribers\n✓ 28% open rate (your best)\n✓ One customer mentioned your post changed their strategy\n\nKeep going.',
    },
  ],
  success_metric: 'Email list grows to 2,000 subscribers (1,000 new). Secondary: average open rate stays above 25%.',
}

const { data, error } = await client
  .from('sprints')
  .insert({
    user_id: 'test-user-id',
    title: 'Test Sprint - Email Marketing',
    goal: 'Growth',
    channels: ['Email', 'LinkedIn'],
    intake: { product: 'Email platform', customer: 'Solo marketers', goal: 'Growth', platforms: ['Email', 'LinkedIn'], budget: '1k-5k', tried: 'Content marketing', differentiator: 'AI personalization', extra: null },
    output: mockOutput,
    status: 'complete',
  })
  .select()
  .single()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`Sprint created: /sprint/${data.id}`)
