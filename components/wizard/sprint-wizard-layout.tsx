'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSprintForm } from '@/hooks/use-sprint-form';
import { WIZARD_STEPS } from '@/lib/sprint-wizard-config';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { WizardLayout } from '@/components/wizard/wizard-layout';
import { Step1Product } from '@/components/wizard/steps/step-1-product';
import { Step2Customer } from '@/components/wizard/steps/step-2-customer';
import { Step3Goal } from '@/components/wizard/steps/step-3-goal';
import { Step4Platforms } from '@/components/wizard/steps/step-4-platforms';
import { Step5Budget } from '@/components/wizard/steps/step-5-budget';
import { Step6Tried } from '@/components/wizard/steps/step-6-tried';
import { Step7Differentiator } from '@/components/wizard/steps/step-7-differentiator';
import { Step8Extra } from '@/components/wizard/steps/step-8-extra';
import { StepPreview } from '@/components/wizard/steps/step-preview';
import { GenerationLoading } from '@/components/wizard/generation-loading';
import { Button } from '@/components/ui/button';

interface SprintWizardLayoutProps {
  editMode?: boolean;
  initialValues?: IntakeValues;
  sprintId?: string;
  guestMode?: boolean;
  initialStep?: number;
}

export function SprintWizardLayout({ editMode = false, initialValues, sprintId, guestMode = false, initialStep = 0 }: SprintWizardLayoutProps) {
  const router = useRouter();
  const form = useSprintForm(initialValues, initialStep);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  const handleNext = async () => {
    if (form.currentStep === 8) {
      await handleSubmit();
    } else {
      form.goNext();
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setGenError('');

    try {
      if (guestMode) {
        // Guest mode: generate without saving to DB
        const response = await fetch('/api/generate-sprint-guest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.values),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Generation failed');
        }

        // Store output in sessionStorage and redirect to guest result page
        sessionStorage.setItem('guest_sprint', JSON.stringify({
          intake: form.values,
          output: data.output,
          generatedAt: new Date().toISOString(),
        }));

        form.clearDraft();
        await router.push('/try/result');
      } else if (editMode && sprintId) {
        // Update existing sprint
        const response = await fetch(`/api/sprints/${sprintId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.values),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Update failed');
        }

        form.clearDraft();
        await router.push(`/sprint/${sprintId}`);
      } else {
        // Create new sprint
        const response = await fetch('/api/generate-sprint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.values),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Generation failed');
        }

        form.clearDraft();
        await router.push(`/sprint/${data.sprintId}`);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setGenError(
        error instanceof Error ? error.message : 'Operation failed'
      );
      setIsGenerating(false);
    }
  };

  const stepConfig = WIZARD_STEPS[form.currentStep];
  const currentFieldKey = stepConfig?.id as keyof IntakeValues;
  const currentValue = form.values[currentFieldKey];
  const currentError = form.errors[currentFieldKey];

  const renderStepComponent = () => {
    switch (form.currentStep) {
      case 0:
        return (
          <Step1Product
            value={currentValue as string}
            onChange={(v) => form.setField('product', v)}
            error={currentError}
          />
        );
      case 1:
        return (
          <Step2Customer
            value={currentValue as string}
            onChange={(v) => form.setField('customer', v)}
            error={currentError}
          />
        );
      case 2:
        return (
          <Step3Goal
            value={currentValue as string}
            onChange={(v) => form.setField('goal', v)}
            error={currentError}
          />
        );
      case 3:
        return (
          <Step4Platforms
            value={form.values.platforms}
            onChange={(v) => form.setField('platforms', v)}
            error={currentError}
          />
        );
      case 4:
        return (
          <Step5Budget
            value={currentValue as string}
            onChange={(v) => form.setField('budget', v)}
            error={currentError}
          />
        );
      case 5:
        return (
          <Step6Tried
            value={form.values.tried.split(',').filter(Boolean)}
            details={form.values.tried_details}
            onChange={(v) => form.setField('tried', v.join(','))}
            onDetailsChange={(v) => form.setField('tried_details', v)}
            error={currentError}
          />
        );
      case 6:
        return (
          <Step7Differentiator
            value={currentValue as string}
            onChange={(v) => form.setField('differentiator', v)}
            error={currentError}
          />
        );
      case 7:
        return (
          <Step8Extra
            value={currentValue as string}
            onChange={(v) => form.setField('extra', v)}
            error={currentError}
          />
        );
      case 8:
        return (
          <StepPreview
            values={form.values}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <WizardLayout
        currentStep={form.currentStep}
        onBack={form.goBack}
        onNext={handleNext}
        isLoading={isGenerating}
      >
        {renderStepComponent()}
      </WizardLayout>

      {genError && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setGenError('')} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-2 border border-gold/30 rounded-lg p-8 max-w-md w-full z-50 shadow-xl">
            <h2 className="text-xl font-bold text-text-1 mb-4">
              {genError.includes('Rate limit') ? 'Daily Limit Reached' : 'Error'}
            </h2>
            <p className="text-text-2 mb-6 text-sm leading-relaxed">
              {genError}
            </p>
            <div className="flex gap-3">
              {genError.includes('Rate limit') && (
                <a
                  href="https://github.com/shireen168/sprint-machine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-gold hover:bg-gold-light text-surface-2 font-semibold">
                    Clone Repository
                  </Button>
                </a>
              )}
              <Button
                onClick={() => setGenError('')}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}

      <GenerationLoading isVisible={isGenerating} />
    </>
  );
}
