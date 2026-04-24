import Link from 'next/link'

export default function DashboardPage() {
  const buttonClass = 'inline-block px-6 py-2 rounded-md bg-gold text-background hover:bg-gold-light shadow-glow-rest hover:shadow-glow-hover transition-all font-medium'

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-1">Your Sprints</h1>
          <p className="mt-1 text-text-2">Each sprint is your complete 30-day marketing plan.</p>
        </div>
        <Link href="/sprint/new" className={buttonClass}>
          New Sprint
        </Link>
      </div>

      <div className="rounded-xl border border-border-gold bg-surface p-12 text-center shadow-glow-rest">
        <p className="font-display text-xl text-text-1">No sprints yet</p>
        <p className="mt-2 text-text-2">Create your first sprint to get your 30-day marketing plan.</p>
        <Link href="/sprint/new" className={`mt-6 ${buttonClass}`}>
          Create first sprint
        </Link>
      </div>
    </div>
  )
}
