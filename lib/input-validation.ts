import type { IntakeValues } from './sprint-wizard-config';

const FIELD_LIMITS = {
  product: 100,
  customer: 200,
  goal: 150,
  budget: 50,
  tried: 100,
  tried_details: 500,
  differentiator: 200,
  extra: 1000,
};

const ALLOWED_CHARS = /^[a-zA-Z0-9\s\-_.,!?'&()\n]+$/;

export function validateIntake(intake: any): IntakeValues | null {
  try {
    if (!intake.product || !intake.customer || !intake.goal) {
      throw new Error('Missing required fields');
    }

    const validated: IntakeValues = {
      product: validateField(intake.product, 'product', FIELD_LIMITS.product),
      customer: validateField(intake.customer, 'customer', FIELD_LIMITS.customer),
      goal: validateField(intake.goal, 'goal', FIELD_LIMITS.goal),
      platforms: validatePlatforms(intake.platforms),
      budget: validateField(intake.budget, 'budget', FIELD_LIMITS.budget),
      tried: validateField(intake.tried, 'tried', FIELD_LIMITS.tried),
      tried_details: intake.tried_details
        ? validateField(intake.tried_details, 'tried_details', FIELD_LIMITS.tried_details)
        : '',
      differentiator: validateField(intake.differentiator, 'differentiator', FIELD_LIMITS.differentiator),
      extra: intake.extra
        ? validateField(intake.extra, 'extra', FIELD_LIMITS.extra)
        : '',
    };

    return validated;
  } catch (error) {
    return null;
  }
}

function validateField(value: string, fieldName: string, maxLength: number): string {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} exceeds maximum length`);
  }

  if (!ALLOWED_CHARS.test(trimmed)) {
    throw new Error(`${fieldName} contains disallowed characters`);
  }

  return trimmed;
}

function validatePlatforms(platforms: any): string[] {
  const ALLOWED_PLATFORMS = ['Instagram', 'LinkedIn', 'Email', 'TikTok', 'Twitter', 'YouTube', 'Facebook'];

  if (!Array.isArray(platforms)) {
    throw new Error('platforms must be an array');
  }

  if (platforms.length === 0 || platforms.length > 10) {
    throw new Error('Invalid platform selection');
  }

  return platforms.filter(p => ALLOWED_PLATFORMS.includes(p));
}
