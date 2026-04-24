'use client';

import { ReactNode } from 'react';
import { useActiveSection } from '@/hooks/use-active-section';
import { SprintSidebar } from './sprint-sidebar';

interface SprintDocLayoutProps {
  children: ReactNode;
}

export function SprintDocLayout({ children }: SprintDocLayoutProps) {
  const activeId = useActiveSection();

  return (
    <div className="flex gap-0">
      <SprintSidebar activeId={activeId} />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
