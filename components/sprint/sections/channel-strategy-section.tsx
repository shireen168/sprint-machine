'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { getChannelColor } from '@/lib/channel-colors';

interface ChannelStrategySectionProps {
  value: string | string[];
  onRegenerate?: () => void;
}

export function ChannelStrategySection({ value, onRegenerate }: ChannelStrategySectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = Array.isArray(value) ? value.join('\n') : value;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const items = Array.isArray(value) ? value : value.split('\n').filter(line => line.trim());

  return (
    <section id="channel-strategy" className="scroll-mt-20 py-12 border-t border-[rgba(255,255,255,0.07)]">
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold text-white mb-2">Channel Strategy</h2>
        <p className="text-text-2 text-sm">Which platforms to prioritize and why</p>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg bg-surface border border-[rgba(201,169,110,0.28)] p-6">
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-text-1">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
