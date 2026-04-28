import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { HeroSection, FeaturesSection, SocialProofSection, FAQSection, FinalCTASection } from '@/components/marketing/landing'

export default async function LandingPage() {
  const { userId } = await auth()
  if (userId) redirect('/dashboard')

  return (
    <>
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <footer
        className="relative z-10 flex items-center justify-center px-6 py-6"
        style={{ borderTop: '1px solid rgba(0,200,255,0.12)', background: '#050A0E' }}
      >
        <span className="text-sm text-center" style={{ fontFamily: "'IBM Plex Sans'", color: '#7ABFDF' }}>
          © {new Date().getFullYear()} Sprint Machine · Built by{' '}
          <Link href="https://github.com/shireen168" target="_blank" rel="noopener noreferrer"
            style={{ color: '#00C8FF' }}
          >
            Shireen
          </Link>
          {' '}· Powered by Claude Code
        </span>
      </footer>
    </>
  )
}
