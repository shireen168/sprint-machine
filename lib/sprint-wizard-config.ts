// Intake form structure
export type IntakeValues = {
  product: string;
  customer: string;
  goal: string;
  platforms: string[];
  budget: string;
  tried: string;
  tried_details: string;
  differentiator: string;
  extra: string;
};

// Jewel-tone colors per step (index matches step 0-7)
export const JEWEL_COLORS = [
  '#10B981', // Step 1: Emerald - Product
  '#3B82F6', // Step 2: Sapphire - Customer
  '#8B5CF6', // Step 3: Amethyst - Goal
  '#EF4444', // Step 4: Ruby - Platforms
  '#F59E0B', // Step 5: Amber - Budget
  '#14B8A6', // Step 6: Teal - What tried
  '#6366F1', // Step 7: Indigo - Differentiator
  '#F43F5E', // Step 8: Rose - Extra
];

// Step configurations
export interface WizardStep {
  id: keyof IntakeValues;
  step: number; // 1-8
  label: string;
  description: string;
  type: 'text' | 'radio' | 'checkbox';
  color: string;
  required: boolean;
  maxLength?: number;
  options?: Array<{ label: string; value: string }>;
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'product',
    step: 1,
    label: 'What is your product or service?',
    description: 'Be specific and concise.',
    type: 'text',
    color: JEWEL_COLORS[0],
    required: true,
    maxLength: 200,
  },
  {
    id: 'customer',
    step: 2,
    label: 'Who is your ideal customer?',
    description: 'Describe their key characteristics.',
    type: 'text',
    color: JEWEL_COLORS[1],
    required: true,
    maxLength: 200,
  },
  {
    id: 'goal',
    step: 3,
    label: 'What is your #1 goal for the next 30 days?',
    description: 'Pick one primary goal.',
    type: 'radio',
    color: JEWEL_COLORS[2],
    required: true,
    options: [
      { label: 'Get first paying customers', value: 'first_customers' },
      { label: 'Build brand awareness', value: 'awareness' },
      { label: 'Increase email list', value: 'email_list' },
      { label: 'Launch a new product', value: 'product_launch' },
    ],
  },
  {
    id: 'platforms',
    step: 4,
    label: 'Which platforms are you on?',
    description: 'Select all that apply.',
    type: 'checkbox',
    color: JEWEL_COLORS[3],
    required: true,
    options: [
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'TikTok', value: 'tiktok' },
      { label: 'Twitter/X', value: 'twitter' },
      { label: 'Facebook', value: 'facebook' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Email list', value: 'email' },
      { label: 'Bluesky', value: 'bluesky' },
    ],
  },
  {
    id: 'budget',
    step: 5,
    label: 'What is your monthly marketing budget?',
    description: 'Estimate your spend.',
    type: 'radio',
    color: JEWEL_COLORS[4],
    required: true,
    options: [
      { label: '$0 - $500', value: '0-500' },
      { label: '$500 - $2,000', value: '500-2000' },
      { label: '$2,000 - $5,000', value: '2000-5000' },
      { label: '$5,000+', value: '5000-plus' },
    ],
  },
  {
    id: 'tried',
    step: 6,
    label: 'What have you tried before?',
    description: 'Select all that apply.',
    type: 'checkbox',
    color: JEWEL_COLORS[5],
    required: true,
    options: [
      { label: 'Paid ads', value: 'paid_ads' },
      { label: 'Influencer partnerships', value: 'influencers' },
      { label: 'Content marketing', value: 'content' },
      { label: 'Email campaigns', value: 'email' },
      { label: 'SEO', value: 'seo' },
      { label: 'Nothing yet', value: 'nothing' },
    ],
  },
  {
    id: 'differentiator',
    step: 7,
    label: 'What sets you apart from competitors?',
    description: 'Your unique value.',
    type: 'text',
    color: JEWEL_COLORS[6],
    required: true,
    maxLength: 200,
  },
  {
    id: 'extra',
    step: 8,
    label: 'Anything else we should know?',
    description: 'Final thoughts (optional).',
    type: 'text',
    color: JEWEL_COLORS[7],
    required: false,
    maxLength: 200,
  },
];

// Validation
export function validateStep(stepIndex: number, values: Partial<IntakeValues>): string | null {
  const step = WIZARD_STEPS[stepIndex];
  if (!step) return 'Invalid step';

  const value = values[step.id];

  // Required field check
  if (step.required) {
    if (step.type === 'checkbox') {
      // Handle comma-separated string (for tried field) or array
      let hasSelection = false;
      if (typeof value === 'string') {
        hasSelection = value.trim().length > 0;
      } else if (Array.isArray(value)) {
        hasSelection = value.length > 0;
      }
      if (!hasSelection) {
        return `Please select at least one option for ${step.label.toLowerCase()}`;
      }
    }
    if ((step.type === 'text' || step.type === 'radio') && !value) {
      return `Please fill in ${step.label.toLowerCase()}`;
    }
  }

  // Text field length check
  if (step.type === 'text' && typeof value === 'string' && step.maxLength) {
    if (value.length > step.maxLength) {
      return `Maximum ${step.maxLength} characters`;
    }
  }

  return null;
}

// Default empty intake
export function emptyIntake(): IntakeValues {
  return {
    product: '',
    customer: '',
    goal: '',
    platforms: [],
    budget: '',
    tried: '',
    tried_details: '',
    differentiator: '',
    extra: '',
  };
}
