'use client';

import Link from 'next/link';

export function MarketingHeader() {
  return (
    <header className="fixed top-0 w-full border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-sm z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white hover:text-gold transition-colors">
          Sprint Machine
        </Link>
        <Link
          href="/sign-in"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
