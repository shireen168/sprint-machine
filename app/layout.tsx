import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sprint Machine',
  description: 'Your marketing plan for the next 30 days, ready in 10 minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background text-text-1 font-body antialiased">
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: '#111116',
                border: '1px solid rgba(201,169,110,0.28)',
                color: '#F1F5F9',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
