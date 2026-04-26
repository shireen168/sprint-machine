'use client';

import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { Button } from '@/components/ui/button';

interface StepPreviewProps {
  values: IntakeValues;
}

const capitalize = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function StepPreview({ values }: StepPreviewProps) {
  const formatPlatforms = (platforms: string[]) => {
    if (!platforms || platforms.length === 0) return '(None selected)';
    return platforms.map(p => capitalize(p)).join(', ');
  };

  const formatTried = (tried: string) => {
    if (!tried) return '(None)';
    const items = tried.split(',').map(item => item.trim()).filter(Boolean);
    return items.map(item => capitalize(item)).join(', ');
  };

  const formatBudget = (budget: string) => {
    if (!budget) return '(Not specified)';
    const normalized = budget.toLowerCase();
    if (normalized.includes('$') || normalized.includes('rm')) return budget;
    return capitalize(budget);
  };

  const sections = [
    { label: 'Product / Service', value: capitalize(values.product), step: 0 },
    { label: 'Target Customer', value: capitalize(values.customer), step: 1 },
    { label: 'Primary Goal', value: capitalize(values.goal), step: 2 },
    { label: 'Platforms', value: formatPlatforms(values.platforms || []), step: 3 },
    { label: 'Monthly Budget', value: formatBudget(values.budget), step: 4 },
    { label: 'What You\'ve Tried', value: formatTried(values.tried), step: 5 },
    { label: 'Differentiator', value: capitalize(values.differentiator), step: 6 },
    { label: 'Additional Context', value: values.extra ? capitalize(values.extra) : '(None)', step: 7 },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-2 text-sm">
        <p>Review your answers before we generate your 30-day sprint. Click any section to edit.</p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.label}
            className="bg-white/3 border border-white/10 rounded-lg px-4 py-3"
          >
            <div className="text-xs font-semibold text-text-2 uppercase tracking-wide mb-2">
              {section.label}
            </div>
            <div className="text-text-1 line-clamp-2 text-sm">
              {section.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg px-4 py-3 space-y-2" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}>
        <p className="font-medium" style={{ color: '#C9A84C' }}>Ready to generate?</p>
        <p className="text-text-2 text-xs">We'll create a complete 30-day marketing sprint with platform-specific content, calendar, and success metrics.</p>
      </div>
    </div>
  );
}
