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

export function WizardLayout({ currentStep, onBack, onNext, isLoading = false, children }: WizardLayoutProps) {
  const step = currentStep === 8
    ? { ...WIZARD_STEPS[7], label: 'Review Your Answers', description: 'Confirm your details before generating your sprint', step: 9 }
    : WIZARD_STEPS[currentStep];
  if (!step) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 8;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#050A0E', color: '#EEF6FF' }}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div
        className="w-full px-6 py-4 border-b"
        style={{ borderBottomColor: step.color + '40', background: '#091420' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold tracking-widest" style={{ color: '#7ABFDF', fontFamily: "'Exo 2'" }}>
              STEP {currentStep === 8 ? 9 : step.step} OF 9
            </span>
            <span className="text-sm" style={{ color: '#4A7C9A', fontFamily: "'IBM Plex Sans'" }}>
              Sprint Machine
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(0,200,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 9) * 100}%`, backgroundColor: step.color }}
            />
          </div>

          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: step.color, fontFamily: "'Exo 2'", letterSpacing: '-0.01em' }}
          >
            {step.label}
          </h2>
          <p className="text-base" style={{ color: '#7ABFDF', fontFamily: "'IBM Plex Sans'" }}>
            {step.description}
          </p>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto w-full">
          {children}
        </div>
      </div>

      {/* Navigation footer */}
      <div className="px-6 py-4 border-t" style={{ borderTopColor: 'rgba(0,200,255,0.12)', background: '#091420' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <button
            onClick={onBack}
            disabled={isFirstStep || isLoading}
            className="px-6 py-2.5 rounded-lg text-base font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              border: '1.5px solid rgba(0,200,255,0.3)',
              color: '#7ABFDF',
              background: 'transparent',
              fontFamily: "'Exo 2'",
            }}
            onMouseEnter={(e) => { if (!isFirstStep && !isLoading) { e.currentTarget.style.background = 'rgba(0,200,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,200,255,0.6)'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,200,255,0.3)'; }}
          >
            Back
          </button>

          <button
            onClick={onNext}
            disabled={isLoading}
            className="px-8 py-2.5 rounded-lg text-base font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: step.color,
              color: '#050A0E',
              fontFamily: "'Exo 2'",
              boxShadow: `0 0 20px ${step.color}40`,
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.boxShadow = `0 0 40px ${step.color}70`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${step.color}40`; }}
          >
            {isLastStep ? 'Generate Sprint' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
