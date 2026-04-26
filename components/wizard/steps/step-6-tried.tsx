'use client';

import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';

const TRIED_OPTIONS = [
  { label: 'Paid ads', value: 'paid_ads' },
  { label: 'Influencer partnerships', value: 'influencers' },
  { label: 'Content marketing', value: 'content' },
  { label: 'Email campaigns', value: 'email' },
  { label: 'SEO', value: 'seo' },
  { label: 'Nothing yet', value: 'nothing' },
];

interface Step6TriedProps {
  value: string[];
  details: string;
  onChange: (value: string[]) => void;
  onDetailsChange: (details: string) => void;
  error?: string;
}

export function Step6Tried({
  value,
  details,
  onChange,
  onDetailsChange,
  error,
}: Step6TriedProps) {
  const stepConfig = WIZARD_STEPS[5];
  const maxDetailsLength = 150;

  const toggleTried = (strategy: string) => {
    if (value.includes(strategy)) {
      onChange(value.filter((s) => s !== strategy));
    } else {
      onChange([...value, strategy]);
    }
  };

  return (
    <div className="space-y-2">
      <fieldset>
        <legend className="text-sm font-medium text-white/80 mb-2 block">
          What strategies have you tried?
        </legend>
        <div className="grid grid-cols-2 gap-1">
          {TRIED_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all"
              style={{
                borderColor: value.includes(option.value)
                  ? stepConfig.color
                  : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: value.includes(option.value)
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleTried(option.value)}
                className="w-4 h-4 accent-white"
              />
              <span className="text-white text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          What were the results? (Optional)
        </label>
        <textarea
          value={details}
          onChange={(e) => onDetailsChange(e.target.value.slice(0, maxDetailsLength))}
          placeholder="E.g., Paid ads worked well but expensive, content marketing didn't gain traction"
          maxLength={maxDetailsLength}
          className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none"
          rows={1}
        />
        <div className="text-xs text-white/50 mt-2 text-right">
          {details.length} / {maxDetailsLength}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
