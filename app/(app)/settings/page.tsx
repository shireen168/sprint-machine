import { auth } from '@clerk/nextjs/server'

export default async function SettingsPage() {
  const { userId } = await auth()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-text-1 mb-8">Settings</h1>
      <div className="rounded-xl border border-border-gold bg-surface p-6 shadow-glow-rest">
        <h2 className="font-display text-xl text-text-1 mb-2">Account</h2>
        <p className="text-text-2 text-sm">User ID: {userId}</p>
        <p className="text-text-3 text-sm mt-1">Subscription management added in Plan 4.</p>
      </div>
    </div>
  )
}
