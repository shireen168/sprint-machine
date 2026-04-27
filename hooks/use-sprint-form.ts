'use client';

import { useState, useEffect } from 'react';
import type { IntakeValues } from '@/lib/sprint-wizard-config';
import { emptyIntake, validateStep } from '@/lib/sprint-wizard-config';

const DRAFT_KEY = 'sprint-machine-draft';

interface UseSprintFormState {
  currentStep: number;
  values: IntakeValues;
  errors: Partial<Record<keyof IntakeValues, string>>;
  isSubmitting: boolean;
}

interface UseSprintFormReturn extends UseSprintFormState {
  goNext: () => boolean; // returns true if advanced
  goBack: () => void;
  setField: (key: keyof IntakeValues, value: any) => void;
  reset: () => void;
  saveDraft: () => void;
  clearDraft: () => void;
}

export function useSprintForm(initialValues?: IntakeValues, initialStep: number = 0): UseSprintFormReturn {
  const [state, setState] = useState<UseSprintFormState>({
    currentStep: initialStep,
    values: initialValues || emptyIntake(),
    errors: {},
    isSubmitting: false,
  });


  // Auto-save draft on value change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          values: state.values,
          currentStep: state.currentStep,
          timestamp: Date.now(),
        })
      );
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [state.values, state.currentStep]);

  const goNext = (): boolean => {
    // Validate current step
    const error = validateStep(state.currentStep, state.values);
    if (error) {
      setState((prev) => ({
        ...prev,
        errors: { [Object.keys(state.values)[state.currentStep]]: error },
      }));
      return false;
    }

    // Clear error and advance
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 8),
      errors: {},
    }));
    return true;
  };

  const goBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
      errors: {},
    }));
  };

  const setField = (key: keyof IntakeValues, value: any) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [key]: value },
      errors: { ...prev.errors, [key]: undefined }, // Clear error on change
    }));
  };

  const reset = () => {
    setState({
      currentStep: 0,
      values: emptyIntake(),
      errors: {},
      isSubmitting: false,
    });
    clearDraft();
  };

  const saveDraft = () => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        values: state.values,
        currentStep: state.currentStep,
        timestamp: Date.now(),
      })
    );
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return {
    ...state,
    goNext,
    goBack,
    setField,
    reset,
    saveDraft,
    clearDraft,
  };
}
