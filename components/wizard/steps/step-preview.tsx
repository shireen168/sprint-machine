'use client';

import type { IntakeValues } from '@/lib/sprint-wizard-config';

interface StepPreviewProps {
  values: IntakeValues;
}

const capitalize = (str: string) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export function StepPreview({ values }: StepPreviewProps) {
  const formatPlatforms = (platforms: string[]) => {
    if (!platforms || platforms.length === 0) return '(None selected)';
    return platforms.map(p => capitalize(p)).join(', ');
  };

  const formatTried = (tried: string) => {
    if (!tried) return '(None)';
    return tried.split(',').map(i => i.trim()).filter(Boolean).map(capitalize).join(', ');
  };

  const formatBudget = (budget: string) => {
    if (!budget) return '(Not specified)';
    const n = budget.toLowerCase();
    if (n.includes('$') || n.includes('rm')) return budget;
    return capitalize(budget);
  };

  const sections = [
    { label: 'Product / Service', value: capitalize(values.product) },
    { label: 'Target Customer', value: capitalize(values.customer) },
    { label: 'Primary Goal', value: capitalize(values.goal) },
    { label: 'Platforms', value: formatPlatforms(values.platforms || []) },
    { label: 'Monthly Budget', value: formatBudget(values.budget) },
    { label: "What You've Tried", value: formatTried(values.tried) },
    { label: 'Differentiator', value: capitalize(values.differentiator) },
    { label: 'Additional Context', value: values.extra ? capitalize(values.extra) : '(None)' },
  ];

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl px-4 py-3 text-base"
        style={{
          background: 'rgba(0,200,255,0.05)',
          border: '1px solid rgba(0,200,255,0.15)',
          color: '#7ABFDF',
          fontFamily: "'IBM Plex Sans'",
        }}
      >
        Review your answers before we generate your 30-day sprint.
      </div>

      <div className="space-y-2.5">
        {sections.map((section) => (
          <div
            key={section.label}
            className="rounded-xl px-4 py-3.5"
            style={{ background: '#091420', border: '1px solid rgba(0,200,255,0.12)' }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-1.5"
              style={{ color: '#00C8FF', fontFamily: "'Exo 2'" }}
            >
              {section.label}
            </div>
            <div
              className="text-base line-clamp-2"
              style={{ color: '#EEF6FF', fontFamily: "'IBM Plex Sans'" }}
            >
              {section.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl px-4 py-4"
        style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.3)' }}
      >
        <p className="font-bold text-base mb-1" style={{ color: '#00C8FF', fontFamily: "'Exo 2'" }}>
          Ready to generate?
        </p>
        <p className="text-base" style={{ color: '#7ABFDF', fontFamily: "'IBM Plex Sans'" }}>
          We'll create a complete 30-day marketing sprint with platform-specific content, calendar, and success metrics.
        </p>
      </div>
    </div>
  );
}
