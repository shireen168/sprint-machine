'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';

interface ContentCalendarSectionProps {
  value: Record<string, any>;
  onRegenerate?: () => void;
}

export function ContentCalendarSection({ value, onRegenerate }: ContentCalendarSectionProps) {
  const [copied, setCopied] = useState(false);
  const [activeWeek, setActiveWeek] = useState('w1');

  const weeks = ['w1', 'w2', 'w3', 'w4'];

  const handleCopy = async () => {
    const text = JSON.stringify(value, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const weekData = value[activeWeek] || [];

  return (
    <section id="content-calendar" className="scroll-mt-20 py-12 border-t border-[rgba(255,255,255,0.07)]">
      <h2 className="font-display text-3xl font-bold text-white mb-6">Content Calendar</h2>

      <div className="space-y-6">
        <div className="flex gap-2 border-b border-[rgba(255,255,255,0.07)]">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeWeek === week
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-text-2 hover:text-text-1'
              }`}
            >
              {week.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {Array.isArray(weekData) && weekData.length > 0 ? (
            weekData.map((item: any, idx: number) => (
              <div
                key={idx}
                className="rounded-lg bg-surface border border-[rgba(201,169,110,0.28)] p-4"
              >
                <div className="text-sm text-text-2 mb-2">{item.day || `Day ${idx + 1}`}</div>
                <div className="text-text-1 mb-3">{item.topic || item.title}</div>
                <div className="flex gap-2 flex-wrap">
                  {item.platforms && item.platforms.map((p: string) => (
                    <span key={p} className="px-2 py-1 rounded-full bg-surface-2 text-xs text-text-2">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-text-2">No calendar data for this week.</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            className="text-text-2 hover:text-text-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied' : 'Copy'}
          </Button>
          {onRegenerate && (
            <Button
              onClick={onRegenerate}
              size="sm"
              variant="ghost"
              className="text-text-2 hover:text-text-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
