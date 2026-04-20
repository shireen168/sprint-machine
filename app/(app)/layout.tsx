import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AppNav } from '@/components/nav/app-nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
