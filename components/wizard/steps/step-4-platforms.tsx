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

  const togglePlatform = (platform: string) => {
    if (value.includes(platform)) {
      onChange(value.filter((p) => p !== platform));
    } else {
      onChange([...value, platform]);
    }
  };

  return (
    <div className="space-y-2">
      <fieldset>
        <legend className="text-sm font-medium text-white/80 mb-2 block">
          Select all platforms you use
        </legend>
        <div className="grid grid-cols-2 gap-1">
          {PLATFORM_OPTIONS.map((option) => (
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
                onChange={() => togglePlatform(option.value)}
                className="w-4 h-4 accent-white"
              />
              <span className="text-white text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="text-white/60 text-sm bg-white/5 border border-white/10 rounded-lg px-4 py-3">
        <p className="font-medium mb-1">Selected: {value.length}</p>
        {value.length === 0 && <p className="text-white/40">Pick at least one platform</p>}
      </div>
    </div>
  );
}
