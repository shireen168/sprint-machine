'use client';

import { useEffect, useState } from 'react';

const GENERATION_STEPS = [
  'Analyzing your offer',
  'Developing campaign theme',
  'Planning channels',
  'Creating content calendar',
  'Crafting copy',
  'Setting success metrics',
];

interface GenerationLoadingProps {
  isVisible: boolean;
}

export function GenerationLoading({ isVisible }: GenerationLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < GENERATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  const progress = ((currentStep + 1) / GENERATION_STEPS.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#050A0E' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-md mx-auto px-6 text-center relative z-10">
        {/* Animated cyan ring */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'rgba(0,200,255,0.15)',
              borderTopColor: '#00C8FF',
            }}
          />
        </div>

        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Exo 2'", color: '#EEF6FF' }}>
          Generating your sprint
        </h2>
        <p className="text-base mb-8" style={{ fontFamily: "'IBM Plex Sans'", color: '#7ABFDF' }}>
          This takes about 15 seconds
        </p>

        {/* Progress steps */}
        <div className="space-y-2.5 mb-8 text-left">
          {GENERATION_STEPS.map((label, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500"
                style={{
                  background: isActive ? 'rgba(0,200,255,0.1)' : isDone ? 'rgba(0,200,255,0.05)' : 'rgba(0,200,255,0.03)',
                  border: `1px solid ${isActive ? 'rgba(0,200,255,0.4)' : isDone ? 'rgba(0,200,255,0.2)' : 'rgba(0,200,255,0.08)'}`,
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                  style={{
                    background: isDone ? '#00C8FF' : isActive ? 'rgba(0,200,255,0.2)' : 'transparent',
                    border: `1.5px solid ${isDone ? '#00C8FF' : isActive ? '#00C8FF' : 'rgba(0,200,255,0.2)'}`,
                    color: isDone ? '#050A0E' : '#00C8FF',
                  }}
                >
                  {isDone ? '✓' : isActive ? '◉' : ' '}
                </div>
                <span
                  className="text-base font-medium"
                  style={{
                    fontFamily: "'IBM Plex Sans'",
                    color: isActive ? '#EEF6FF' : isDone ? '#7ABFDF' : '#4A7C9A',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,200,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(to right, #00C8FF, #38FFD8)' }}
          />
        </div>
      </div>
    </div>
  );
}
