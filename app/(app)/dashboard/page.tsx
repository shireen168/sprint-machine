import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-1">Your Sprints</h1>
          <p className="mt-1 text-text-2">Each sprint is your complete 30-day marketing plan.</p>
        </div>
        <Button
          render={<Link href="/sprint/new" />}
          className="bg-gold text-background hover:bg-gold-light shadow-glow-rest hover:shadow-glow-hover transition-all"
        >
          New Sprint
        </Button>
      </div>

      <div className="rounded-xl border border-border-gold bg-surface p-12 text-center shadow-glow-rest">
        <p className="font-display text-xl text-text-1">No sprints yet</p>
        <p className="mt-2 text-text-2">Create your first sprint to get your 30-day marketing plan.</p>
        <Button
          render={<Link href="/sprint/new" />}
          className="mt-6 bg-gold text-background hover:bg-gold-light shadow-glow-rest hover:shadow-glow-hover transition-all"
        >
          Create first sprint
        </Button>
      </div>
    </div>
  )
}
