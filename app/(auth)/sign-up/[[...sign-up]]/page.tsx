import { SignUp } from '@clerk/nextjs'
import { clerkTheme } from '@/lib/clerk-theme'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp appearance={{ elements: clerkTheme.elements }} />
    </div>
  )
}
