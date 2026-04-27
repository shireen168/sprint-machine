'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CampaignThemeSection } from '@/components/sprint/sections/campaign-theme-section';
import { ChannelStrategySection } from '@/components/sprint/sections/channel-strategy-section';
import { ContentCalendarSection } from '@/components/sprint/sections/content-calendar-section';
import { CopyPromptsSection } from '@/components/sprint/sections/copy-prompts-section';

interface GuestSprint {
  intake: Record<string, any>;
  output: Record<string, any>;
  generatedAt: string;
}

export default function TryResultPage() {
  const router = useRouter();
  const [sprint, setSprint] = useState<GuestSprint | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('guest_sprint');
    if (!stored) {
      // Session expired, redirect back to try
      router.push('/try');
      return;
    }
    setSprint(JSON.parse(stored));
  }, [router]);

  if (!sprint) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  const { intake, output } = sprint;

  const handleSignInToSave = () => {
    // Set a cookie with the sprint data for post-auth retrieval
    const expiresIn = 30 * 60 * 1000; // 30 minutes
    const expires = new Date(Date.now() + expiresIn).toUTCString();
    document.cookie = `guest_sprint=${encodeURIComponent(JSON.stringify(sprint))}; expires=${expires}; path=/`;
    router.push('/sign-in?redirect=/try/save');
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Save banner */}
      <div className="mb-8 rounded-lg bg-gold/10 border border-gold/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gold mb-1">Ready to save this sprint?</h2>
            <p className="text-white/70">Sign in to your account to save and access your generated sprints anytime.</p>
          </div>
          <button
            onClick={handleSignInToSave}
            className="ml-4 whitespace-nowrap px-6 py-2 rounded-md bg-gold text-background font-medium hover:bg-gold/90 transition-colors"
          >
            Sign in to save
          </button>
        </div>
      </div>

      {/* Sprint sections (read-only) */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Generated Sprint</h1>
          <p className="text-white/60">Product: {intake.product} | Goal: {intake.goal}</p>
        </div>

        <CampaignThemeSection value={output.campaign_theme || ''} />
        <ChannelStrategySection value={output.channel_strategy || ''} />
        <ContentCalendarSection value={output.content_calendar || {}} />
        <CopyPromptsSection value={output.copy_prompts || {}} />

        {/* Footer with try again link */}
        <div className="pt-8 border-t border-white/10 flex gap-4">
          <Link
            href="/try"
            className="px-6 py-2 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Generate another sprint
          </Link>
        </div>
      </div>
    </main>
  );
}
