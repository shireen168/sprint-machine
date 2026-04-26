import { MarketingHeader } from '@/components/marketing/marketing-header';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <div className="pt-16">{children}</div>
    </div>
  );
}
