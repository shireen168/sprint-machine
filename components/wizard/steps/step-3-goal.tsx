'use client';

import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';

const GOAL_OPTIONS = [
  { label: 'Get first paying customers', value: 'first_customers' },
  { label: 'Build brand awareness', value: 'awareness' },
  { label: 'Increase email list', value: 'email_list' },
  { label: 'Launch a new product', value: 'product_launch' },
];

interface Step3GoalProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Step3Goal({ value, onChange, error }: Step3GoalProps) {
  const stepConfig = WIZARD_STEPS[2];

  return (
    <div className="space-y-2">
      <fieldset>
        <legend className="text-sm font-medium text-white/80 mb-2 block">
          Select your primary goal
        </legend>
        <div className="space-y-2">
          {GOAL_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                value === option.value
                  ? `border-[${stepConfig.color}] bg-white/10`
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
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
                name="goal"
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
    </div>
  );
}
