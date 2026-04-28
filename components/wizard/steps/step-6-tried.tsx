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

const inputStyle = {
  background: '#091420',
  border: '1px solid rgba(0,200,255,0.18)',
  borderRadius: '12px',
  color: '#EEF6FF',
  fontFamily: "'IBM Plex Sans'",
  fontSize: '18px',
  lineHeight: '1.6',
  padding: '12px 16px',
  width: '100%',
  resize: 'none' as const,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

interface Step6TriedProps {
  value: string[];
  details: string;
  onChange: (value: string[]) => void;
  onDetailsChange: (details: string) => void;
  error?: string;
}

export function Step6Tried({ value, details, onChange, onDetailsChange, error }: Step6TriedProps) {
  const stepConfig = WIZARD_STEPS[5];
  const maxDetailsLength = 150;

  const toggle = (strategy: string) => {
    onChange(value.includes(strategy) ? value.filter((s) => s !== strategy) : [...value, strategy]);
  };

  return (
    <div className="space-y-4">
      <fieldset>
        <legend
          className="block font-semibold mb-3"
          style={{ color: '#7ABFDF', fontFamily: "'Exo 2'", fontSize: '16px' }}
        >
          What strategies have you tried?
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {TRIED_OPTIONS.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <label
                key={option.value}
                className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all"
                style={{
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderColor: isSelected ? stepConfig.color : 'rgba(0,200,255,0.15)',
                  background: isSelected ? `${stepConfig.color}12` : '#091420',
                  boxShadow: isSelected ? `0 0 12px ${stepConfig.color}20` : 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(option.value)}
                  className="w-4 h-4 shrink-0"
                  style={{ accentColor: stepConfig.color }}
                />
                <span
                  className="text-base"
                  style={{
                    fontFamily: "'IBM Plex Sans'",
                    fontSize: '16px',
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

      <div>
        <label
          className="block font-semibold mb-2"
          style={{ color: '#7ABFDF', fontFamily: "'Exo 2'", fontSize: '16px' }}
        >
          What were the results? <span style={{ color: '#4A7C9A', fontWeight: 400 }}>(Optional)</span>
        </label>
        <textarea
          value={details}
          onChange={(e) => onDetailsChange(e.target.value.slice(0, maxDetailsLength))}
          placeholder="E.g., Paid ads worked well but were expensive, content didn't gain traction"
          maxLength={maxDetailsLength}
          rows={3}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,200,255,0.55)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,255,0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,200,255,0.18)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <div className="text-right mt-1" style={{ color: '#4A7C9A', fontFamily: "'IBM Plex Sans'", fontSize: '14px' }}>
          {details.length} / {maxDetailsLength}
        </div>
      </div>

      {error && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', fontFamily: "'IBM Plex Sans'", fontSize: '16px' }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
