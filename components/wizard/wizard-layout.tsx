'use client';

import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';
import { Button } from '@/components/ui/button';

interface WizardLayoutProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function WizardLayout({
  currentStep,
  onBack,
  onNext,
  isLoading = false,
  children,
}: WizardLayoutProps) {
  const step = WIZARD_STEPS[currentStep];
  if (!step) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 7;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col" onKeyDown={handleKeyDown}>
      {/* Header with jewel-tone accent */}
      <div
        className="w-full px-6 py-2 border-b border-white/10"
        style={{ borderBottomColor: step.color + '30' }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="text-sm text-white/50 mb-1">
            Step {step.step} of 8
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / 8) * 100}%`,
                backgroundColor: step.color,
              }}
            />
          </div>

          {/* Step label with color accent */}
          <h2
            className="text-xl font-bold mb-0"
            style={{ color: step.color }}
          >
            {step.label}
          </h2>
          <p className="text-white/60 text-xs mt-1">
            {step.description}
          </p>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-6 py-3">
        <div className="max-w-2xl mx-auto w-full">
          {children}
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-white/10 px-6 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isFirstStep || isLoading}
            className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-transform"
          >
            Back
          </Button>

          <Button
            onClick={onNext}
            disabled={isLoading}
            className="transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: step.color,
              color: '#000',
            }}
          >
            {isLastStep ? 'Generate Sprint' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
