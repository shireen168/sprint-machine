'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import type { CopyDayPrompt } from '@/lib/supabase/types';

interface CopyPromptsSectionProps {
  value: CopyDayPrompt[];
}

const WEEK_LABELS: Record<string, string> = {
  w1: 'Week 1',
  w2: 'Week 2',
  w3: 'Week 3',
  w4: 'Week 4',
};

const WEEK_DAYS: Record<string, string> = {
  w1: 'Days 1-7',
  w2: 'Days 8-14',
  w3: 'Days 15-21',
  w4: 'Days 22-30',
};

export function CopyPromptsSection({ value }: CopyPromptsSectionProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyPrompt = async (promptId: string, promptText: string) => {
    await navigator.clipboard.writeText(promptText);
    setCopied(promptId);
    setTimeout(() => setCopied(null), 2000);
  };

  const promptsByWeek = value.reduce((acc, item) => {
    const week = item.week || 'w1';
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {} as Record<string, CopyDayPrompt[]>);

  return (
    <section id="copy-prompts" className="scroll-mt-20 py-12">
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold text-gold mb-2">Copy Generation Prompts</h2>
        <p className="text-text-2 text-sm">
          Strategic frameworks to generate fresh content daily. Paste these prompts into Claude or ChatGPT to create variations.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(promptsByWeek).map(([weekKey, prompts]) => (
          <div key={weekKey} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-display text-xl font-bold text-gold">{WEEK_LABELS[weekKey] || weekKey}</h3>
              <span className="text-text-2 text-sm">({WEEK_DAYS[weekKey] || ''})</span>
            </div>

            <div className="space-y-4">
              {prompts.map((item, idx) => {
                const promptId = `${weekKey}-${idx}`;
                return (
                  <div
                    key={promptId}
                    className="rounded-lg bg-surface border border-[rgba(201,169,110,0.28)] p-6"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-text-1">{item.day}</span>
                        <span className="inline-block bg-surface-2 px-2 py-1 rounded text-xs text-text-2">
                          {item.platform}
                        </span>
                        <span className="inline-block bg-surface-2 px-2 py-1 rounded text-xs text-text-2">
                          {item.format}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div>
                        <p className="text-text-2 text-xs uppercase tracking-wider mb-1">Angle</p>
                        <p className="text-text-2">{item.angle}</p>
                      </div>

                      <div>
                        <p className="text-text-2 text-xs uppercase tracking-wider mb-1">Hook</p>
                        <p className="text-gold font-semibold">{item.hook}</p>
                      </div>

                      <div>
                        <p className="text-text-2 text-xs uppercase tracking-wider mb-1">Key Message</p>
                        <p className="text-text-1">{item.key_message}</p>
                      </div>

                      <div>
                        <p className="text-text-2 text-xs uppercase tracking-wider mb-1">CTA</p>
                        <p className="text-text-2">{item.cta}</p>
                      </div>
                    </div>

                    <div className="mb-4 bg-surface-2 rounded p-4 border border-[rgba(201,169,110,0.15)]">
                      <p className="text-text-2 text-xs uppercase tracking-wider mb-2">Prompt</p>
                      <p className="text-text-1 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
                        {item.prompt}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleCopyPrompt(promptId, item.prompt)}
                      size="sm"
                      variant="ghost"
                      className="text-text-2 hover:text-gold"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied === promptId ? 'Copied!' : 'Copy Prompt'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
