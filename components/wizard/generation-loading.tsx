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

    // Advance steps every 2.5 seconds (6 steps * 2.5s = 15s total)
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last step
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Generating your sprint
        </h2>
        <p className="text-white/60 mb-8">
          This takes about 15 seconds
        </p>

        {/* Steps list with animation */}
        <div className="space-y-3 mb-8">
          {GENERATION_STEPS.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                index <= currentStep
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-white/50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  index < currentStep
                    ? 'bg-white/50 border-white/50 text-[#0a0a0f]'
                    : index === currentStep
                      ? 'border-white/50 text-white animate-pulse'
                      : 'border-white/20'
                }`}
              >
                {index < currentStep ? '✓' : index === currentStep ? '◉' : ' '}
              </div>
              <span className="text-sm font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-white/50 to-white/80 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / GENERATION_STEPS.length) * 100}%`,
            }}
          />
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
