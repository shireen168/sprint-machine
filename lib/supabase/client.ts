'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useSession } from '@clerk/nextjs'
import type { Database } from './types'

export function useSupabaseClient() {
  const { session } = useSession()

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = await session?.getToken()
          const headers = new Headers(options?.headers)
          if (token) headers.set('Authorization', `Bearer ${token}`)
          return fetch(url, { ...options, headers })
        },
      },
    }
  )
}
