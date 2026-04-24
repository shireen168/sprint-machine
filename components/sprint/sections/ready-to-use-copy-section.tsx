'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface CopyBlock {
  day: string;
  platform: string;
  format: string;
  caption: string;
}

interface ReadyToUseCopySectionProps {
  value: CopyBlock[];
  onRegenerate?: () => void;
}

export function ReadyToUseCopySection({ value, onRegenerate }: ReadyToUseCopySectionProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx.toString());
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleExpand = (idx: number) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx);
    } else {
      newExpanded.add(idx);
    }
    setExpanded(newExpanded);
  };

  const handleCopyAll = async () => {
    const allText = value.map((b) => `${b.day} - ${b.platform} (${b.format})\n${b.caption}`).join('\n\n');
    await navigator.clipboard.writeText(allText);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="ready-to-use-copy" className="scroll-mt-20 py-12 border-t border-[rgba(255,255,255,0.07)]">
      <h2 className="font-display text-3xl font-bold text-white mb-6">Ready-to-Use Copy</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          {Array.isArray(value) && value.length > 0 ? (
            value.map((block, idx) => {
              const isExpanded = expanded.has(idx);
              const isCopied = copied === idx.toString();
              const isLong = block.caption.length > 150;

              return (
                <div
                  key={idx}
                  className="rounded-lg bg-surface border border-[rgba(201,169,110,0.28)] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gold font-medium mb-1">{block.day}</div>
                      <div className="flex gap-2 flex-wrap mb-3">
                        <span className="px-2 py-1 rounded-full bg-surface-2 text-xs text-text-2">
                          {block.platform}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-surface-2 text-xs text-text-2">
                          {block.format}
                        </span>
                      </div>
                      <p className={`text-text-1 text-sm ${isExpanded || !isLong ? '' : 'line-clamp-3'}`}>
                        {block.caption}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleCopy(block.caption, idx)}
                      size="sm"
                      variant="ghost"
                      className="text-text-2 hover:text-text-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="text-text-2 hover:text-text-1 inline-flex items-center gap-1 text-xs"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Read full caption
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-text-2">No copy available yet.</p>
          )}
        </div>

        <div className="flex gap-3 border-t border-[rgba(255,255,255,0.07)] pt-6">
          <Button
            onClick={handleCopyAll}
            size="sm"
            variant="ghost"
            className="text-text-2 hover:text-text-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied === 'all' ? 'Copied all' : 'Copy all'}
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
