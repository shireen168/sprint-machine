import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function LandingPage() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="space-y-4 max-w-lg">
        <h1 className="text-5xl font-bold">Sprint Machine</h1>
        <p className="text-lg text-white/70">
          Your AI marketing co-pilot. Generate complete 30-day marketing sprints in minutes.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/try"
          className="rounded-md bg-gold text-background px-6 py-3 text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          Try it free (no sign-up)
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md border border-white/20 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Create account
        </Link>
      </div>
    </main>
  )
}
