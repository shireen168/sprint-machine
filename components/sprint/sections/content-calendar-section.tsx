'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { getChannelColor } from '@/lib/channel-colors';

interface ContentCalendarSectionProps {
  value: Record<string, any>;
  onRegenerate?: () => void;
}

export function ContentCalendarSection({ value, onRegenerate }: ContentCalendarSectionProps) {
  const [copied, setCopied] = useState(false);
  const weeks = ['w1', 'w2', 'w3', 'w4'];

  const handleCopy = async () => {
    const text = JSON.stringify(value, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="content-calendar" className="scroll-mt-20 py-12 border-t border-[rgba(255,255,255,0.07)]">
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold text-white mb-2">Content Calendar</h2>
        <p className="text-text-2 text-sm">4-week posting schedule across all platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {weeks.map((week) => {
          const weekData = value[week] || [];
          const weekNum = week === 'w1' ? 'W1' : week === 'w2' ? 'W2' : week === 'w3' ? 'W3' : 'W4';

          return (
            <div
              key={week}
              className="rounded-lg border border-[rgba(201,169,110,0.2)] bg-[rgba(15,23,42,0.6)] overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-[rgba(201,169,110,0.2)] bg-[rgba(201,169,110,0.08)]">
                <div className="text-xs font-bold text-gold">{weekNum}</div>
              </div>

              <div className="p-0 max-h-96 overflow-y-auto">
                {Array.isArray(weekData) && weekData.length > 0 ? (
                  <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                    {weekData.map((item: any, idx: number) => (
                      <div key={idx} className="px-3 py-2 hover:bg-[rgba(201,169,110,0.08)] transition-colors">
                        <div className="text-xs text-text-2 mb-1">{item.day || `Day ${idx + 1}`}</div>
                        <div className="text-xs text-text-1 mb-2 line-clamp-2">{item.topic || item.title}</div>
                        <div className="flex gap-1 flex-wrap">
                          {item.platforms && item.platforms.map((p: string) => {
                            const colors = getChannelColor(p);
                            return (
                              <span
                                key={p}
                                className={`px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} text-xs font-medium`}
                              >
                                {p}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-3 text-xs text-text-2">No posts</div>
                )}
              </div>
            </div>
          );
        })}
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
    </section>
  );
}
