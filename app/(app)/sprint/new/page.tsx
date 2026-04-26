'use client';

import { useState } from 'react';
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

export default function NewSprintPage() {
  const router = useRouter();
  const form = useSprintForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  const handleNext = async () => {
    console.log('handleNext called, currentStep:', form.currentStep);
    if (form.currentStep === 8) {
      // Preview step: submit
      console.log('Submitting form...');
      await handleSubmit();
    } else {
      // Regular next
      console.log('Advancing to next step');
      form.goNext();
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called with values:', form.values);
    setIsGenerating(true);
    setGenError('');

    try {
      console.log('Calling /api/generate-sprint...');
      const response = await fetch('/api/generate-sprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.values),
      });

      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      // Success: redirect to sprint doc
      console.log('Success! Redirecting to sprint:', data.sprintId);
      form.clearDraft();
      router.push(`/sprint/${data.sprintId}`);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setGenError(
        error instanceof Error ? error.message : 'Generation failed'
      );
      setIsGenerating(false);
    }
  };

  // Get current step config and value
  const stepConfig = WIZARD_STEPS[form.currentStep];
  const currentFieldKey = stepConfig?.id as keyof IntakeValues;
  const currentValue = form.values[currentFieldKey];
  const currentError = form.errors[currentFieldKey];

  // Render step component
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
        <div className="fixed bottom-6 left-6 right-6 max-w-md bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-200 text-sm">
          <p className="font-medium mb-2">{genError}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setGenError('')}
            className="text-xs"
          >
            Try again
          </Button>
        </div>
      )}

      <GenerationLoading isVisible={isGenerating} />
    </>
  );
}
