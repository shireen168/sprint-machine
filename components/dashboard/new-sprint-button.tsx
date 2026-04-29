'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NewSprintButtonProps {
  sprintsUsed: number;
  limit: number;
  nextResetDate: string;
}

export function NewSprintButton({ sprintsUsed, limit, nextResetDate }: NewSprintButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const isAtLimit = sprintsUsed >= limit;

  return (
    <>
      <div className="flex items-center gap-4">
        {isAtLimit ? (
          <button
            onClick={() => setShowModal(true)}
            disabled
            className="inline-block px-6 py-2 rounded-md bg-gray-400 text-gray-600 cursor-not-allowed opacity-60 font-medium"
          >
            New Sprint
          </button>
        ) : (
          <Link href="/sprint/new" className="inline-block">
            <Button className="px-6 py-2 rounded-md bg-gold text-background hover:bg-gold-light shadow-glow-rest hover:shadow-glow-hover transition-all font-medium">
              New Sprint
            </Button>
          </Link>
        )}

        <span className="text-sm font-medium text-text-2">
          {sprintsUsed}/{limit} cycles used
        </span>
      </div>

      {isAtLimit && showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                          bg-surface-2 border border-gold/30 rounded-lg p-8 max-w-md w-full z-50 shadow-xl">
            <h2 className="text-xl font-bold text-text-1 mb-2">
              Monthly Limit Reached
            </h2>
            <p className="text-text-2 mb-6 text-sm leading-relaxed">
              You've used {limit}/{limit} sprints this month. Resets on {nextResetDate}.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/shireen168/sprint-machine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-gold hover:bg-gold-light text-surface-2 font-semibold">
                  Clone on GitHub
                </Button>
              </a>
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
