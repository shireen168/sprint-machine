import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function LandingPage() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">Sprint Machine</h1>
      <p className="max-w-md text-muted-foreground">
        Your 30-day AI marketing co-pilot. Plan, generate, and review sprints - faster.
      </p>
      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get started
        </Link>
        <Link
          href="/sign-in"
          className="rounded-md border px-6 py-2 text-sm font-medium hover:bg-accent"
        >
          Sign in
        </Link>
      </div>
    </main>
  )
}
