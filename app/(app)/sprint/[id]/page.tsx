import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '@/lib/supabase/server'
import type { DbSprint } from '@/lib/supabase/types'
import { SprintDocLayout } from '@/components/sprint/sprint-doc-layout'
import { OfferSection } from '@/components/sprint/sections/offer-section'
import { CampaignThemeSection } from '@/components/sprint/sections/campaign-theme-section'
import { ChannelStrategySection } from '@/components/sprint/sections/channel-strategy-section'
import { ContentCalendarSection } from '@/components/sprint/sections/content-calendar-section'
import { ReadyToUseCopySection } from '@/components/sprint/sections/ready-to-use-copy-section'
import { SuccessMetricSection } from '@/components/sprint/sections/success-metric-section'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SprintPage({ params }: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const client = createServiceClient()
  const { id } = await params

  const { data, error } = await client
    .from('sprints')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    redirect('/dashboard')
  }

  const sprint = data as DbSprint
  const output = (sprint.output as Record<string, any>) || {}

  if (sprint.status === 'generating') {
    return (
      <SprintDocLayout sprintId={id}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
            <p className="text-text-2">Generating your sprint...</p>
          </div>
        </div>
      </SprintDocLayout>
    )
  }

  if (sprint.status === 'failed') {
    return (
      <SprintDocLayout sprintId={id}>
        <div className="rounded-lg bg-red-900/20 border border-red-800/50 p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Generation Failed</h2>
          <p className="text-red-300">Something went wrong generating your sprint. Please try again.</p>
        </div>
      </SprintDocLayout>
    )
  }

  if (!output || Object.keys(output).length === 0) {
    return (
      <SprintDocLayout sprintId={id}>
        <div className="rounded-lg bg-yellow-900/20 border border-yellow-800/50 p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-2">Sprint Still Processing</h2>
          <p className="text-yellow-300">Your sprint output is not yet available. Please refresh the page or try again in a moment.</p>
        </div>
      </SprintDocLayout>
    )
  }

  return (
    <SprintDocLayout sprintId={id}>
      <OfferSection value={output.offer || ''} />
      <CampaignThemeSection value={output.campaign_theme || ''} />
      <ChannelStrategySection value={output.channel_strategy || ''} />
      <ContentCalendarSection value={output.content_calendar || {}} />
      <ReadyToUseCopySection value={output.ready_to_use_copy || []} />
      <SuccessMetricSection value={output.success_metric || ''} />
    </SprintDocLayout>
  )
}
