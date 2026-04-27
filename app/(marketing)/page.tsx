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

      <footer className="relative z-10 flex items-center justify-center px-6 py-6 border-t border-[#7C3AED] border-opacity-20 bg-[#0a0a0f]">
        <span className="text-xs text-center text-[#94A3B8]" style={{ fontFamily: "'DM Sans'" }}>
          © {new Date().getFullYear()} Sprint Machine · Built by{' '}
          <Link href="https://github.com/shireen168" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:text-[#E8D5B0] transition-colors">
            Shireen
          </Link>
          · Powered by Claude Code
        </span>
      </footer>
    </>
  )
}
