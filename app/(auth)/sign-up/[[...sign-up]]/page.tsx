import { SignUp } from '@clerk/nextjs'

const clerkTheme = {
  elements: {
    card: 'bg-surface border border-[rgba(201,169,110,0.28)] shadow-[0_0_28px_rgba(201,169,110,0.18)]',
    headerTitle: 'text-text-1 font-display',
    headerSubtitle: 'text-text-2',
    socialButtonsBlockButton: 'bg-surface-2 border border-[rgba(255,255,255,0.07)] text-text-1 hover:bg-surface',
    formFieldInput: 'bg-surface-2 border border-[rgba(255,255,255,0.07)] text-text-1',
    formButtonPrimary: 'bg-gold text-background hover:bg-gold-light',
    footerActionLink: 'text-gold hover:text-gold-light',
  },
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp appearance={{ elements: clerkTheme.elements }} />
    </div>
  )
}
