'use client';

import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';

const BUDGET_OPTIONS = [
  { label: '$0 - $500', value: '0-500' },
  { label: '$500 - $2,000', value: '500-2000' },
  { label: '$2,000 - $5,000', value: '2000-5000' },
  { label: '$5,000+', value: '5000-plus' },
];

interface Step5BudgetProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Step5Budget({ value, onChange, error }: Step5BudgetProps) {
  const stepConfig = WIZARD_STEPS[4];

  return (
    <div className="space-y-2">
      <fieldset>
        <legend className="text-sm font-medium text-white/80 mb-2 block">
          Select your monthly marketing budget
        </legend>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all"
              style={{
                borderColor:
                  value === option.value
                    ? stepConfig.color
                    : 'rgba(255, 255, 255, 0.1)',
                backgroundColor:
                  value === option.value
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <input
                type="radio"
                name="budget"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 accent-white"
              />
              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="text-white/60 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2">
        <p className="font-medium mb-0">Helps us recommend strategies that fit your budget</p>
      </div>
    </div>
  );
}
