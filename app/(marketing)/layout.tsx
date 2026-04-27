import { MarketingHeader } from '@/components/marketing/marketing-header'
import { LandingBackground } from '@/components/marketing/landing/landing-background'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative">
      <LandingBackground />
      <MarketingHeader />
      <div className="pt-16 relative z-10">{children}</div>
    </div>
  )
}
