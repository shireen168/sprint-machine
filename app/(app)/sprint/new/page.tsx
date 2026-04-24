'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewSprintPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateTestSprint = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/dev-create-sprint', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create sprint')
        return
      }

      router.push(data.viewUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating sprint')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-gold mb-4">8-Step Sprint Intake</h1>
        <p className="text-text-2 mb-8">
          Answer 8 quick questions about your business, goals, and marketing channels.
        </p>
        <div className="space-y-6 bg-surface border border-[rgba(201,169,110,0.28)] rounded-lg p-8">
          <div className="space-y-4 text-left">
            <div className="space-y-2">
              <div className="h-2 bg-surface-2 rounded w-1/4"></div>
              <div className="h-4 bg-surface-2 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-surface-2 rounded w-1/3"></div>
              <div className="h-4 bg-surface-2 rounded w-2/3"></div>
            </div>
          </div>

          <p className="text-sm text-text-3">Coming soon: intake form + AI generation</p>

          <div className="border-t border-[rgba(255,255,255,0.07)] pt-6">
            <p className="text-sm text-text-2 mb-4">Want to see the sprint doc layout? Create a test sprint:</p>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button
              onClick={handleCreateTestSprint}
              disabled={loading}
              className="px-6 py-2 rounded-md bg-gold text-background hover:bg-gold-light disabled:opacity-50 transition-all font-medium"
            >
              {loading ? 'Creating...' : 'View Test Sprint'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
