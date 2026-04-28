'use client';

import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';

const PLATFORM_OPTIONS = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Twitter/X', value: 'twitter' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Email list', value: 'email' },
  { label: 'Bluesky', value: 'bluesky' },
];

interface Step4PlatformsProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function Step4Platforms({ value, onChange, error }: Step4PlatformsProps) {
  const stepConfig = WIZARD_STEPS[3];

  const toggle = (platform: string) => {
    onChange(value.includes(platform) ? value.filter((p) => p !== platform) : [...value, platform]);
  };

  return (
    <div className="space-y-3">
      <fieldset>
        <legend
          className="block font-semibold mb-3"
          style={{ color: '#7ABFDF', fontFamily: "'Exo 2'", fontSize: '16px' }}
        >
          Select all platforms you use
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORM_OPTIONS.map((option) => {
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
        Selected: {value.length}{value.length === 0 ? ' - pick at least one' : ''}
      </div>
    </div>
  );
}
