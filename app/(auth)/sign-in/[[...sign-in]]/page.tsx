import { SignIn } from '@clerk/nextjs'
import { clerkTheme } from '@/lib/clerk-theme'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignIn appearance={{ elements: clerkTheme.elements }} />
    </div>
  )
}
