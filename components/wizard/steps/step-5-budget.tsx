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
    <div className="space-y-3">
      <fieldset>
        <legend
          className="block font-semibold mb-3"
          style={{ color: '#7ABFDF', fontFamily: "'Exo 2'", fontSize: '16px' }}
        >
          Select your monthly marketing budget
        </legend>
        <div className="space-y-2.5">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = value === option.value;
            return (
              <label
                key={option.value}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all"
                style={{
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderColor: isSelected ? stepConfig.color : 'rgba(0,200,255,0.15)',
                  background: isSelected ? `${stepConfig.color}12` : '#091420',
                  boxShadow: isSelected ? `0 0 16px ${stepConfig.color}25` : 'none',
                }}
              >
                <input
                  type="radio"
                  name="budget"
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-4 h-4 shrink-0"
                  style={{ accentColor: stepConfig.color }}
                />
                <span
                  className="text-base font-medium"
                  style={{
                    fontFamily: "'IBM Plex Sans'",
                    fontSize: '17px',
                    color: isSelected ? '#EEF6FF' : '#7ABFDF',
                  }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', fontFamily: "'IBM Plex Sans'", fontSize: '16px' }}
        >
          {error}
        </div>
      )}

      <div
        className="rounded-xl px-4 py-3"
        style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.12)', color: '#7ABFDF', fontFamily: "'IBM Plex Sans'", fontSize: '14px' }}
      >
        Helps us recommend strategies that fit your budget.
      </div>
    </div>
  );
}
