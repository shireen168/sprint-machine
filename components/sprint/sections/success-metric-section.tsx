'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';

interface SuccessMetricSectionProps {
  value: string;
  onRegenerate?: () => void;
}

export function SuccessMetricSection({ value, onRegenerate }: SuccessMetricSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="success-metric" className="scroll-mt-20 py-12 border-t border-[rgba(255,255,255,0.07)]">
      <h2 className="font-display text-3xl font-bold text-white mb-6">30-Day Success Metric</h2>
      <div className="space-y-6">
        <div className="rounded-lg bg-surface border border-[rgba(201,169,110,0.28)] p-6">
          <p className="text-text-1 leading-relaxed whitespace-pre-wrap">{value}</p>
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
