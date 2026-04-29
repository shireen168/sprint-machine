# Security Fixes & Remediation

## 1. Unbounded Guest API Endpoint - Rate Limiting

**Before (Vulnerable):**
```typescript
// app/api/generate-sprint-guest/route.ts
export async function POST(request: NextRequest) {
  try {
    const intake = (await request.json()) as IntakeValues;
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: USER_PROMPT_TEMPLATE(intake) }],
    });
    // ... no rate limiting, attacker can call unlimited times
  }
}
```

**After (Secure):**
```typescript
// app/api/generate-sprint-guest/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '1 h'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit: 1 request per hour per IP
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in 1 hour.' },
        { 
          status: 429,
          headers: {
            'Retry-After': String(reset),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
          },
        }
      );
    }

    const intake = (await request.json()) as IntakeValues;
    // ... continue with generation
  } catch (error) {
    console.error('[generate-sprint-guest] Error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
```

**Why This Works:**
- IP-based rate limiting prevents single attacker from exhausting budget
- Sliding window: attacker must wait 1 hour between requests
- 429 status code signals to client to back off
- Retry-After header tells client when to retry

---

## 2. Authenticated Endpoint Rate Limiting

**Before (Vulnerable):**
```typescript
// app/api/generate-sprint/route.ts
export async function POST(request: NextRequest) {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // No rate limit - user can call repeatedly
  const response = await client.messages.create({
    // ...
  });
}
```

**After (Secure):**
```typescript
// app/api/generate-sprint/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Free tier: 2 generations/day
const freeTierLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '1 d'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit per user
    const { success, reset, remaining } = await freeTierLimit.limit(`user:${userId}`);

    if (!success) {
      return NextResponse.json(
        { error: `Rate limit exceeded. You have ${remaining} generations remaining today. Resets at ${new Date(reset).toLocaleTimeString()}` },
        { status: 429 }
      );
    }

    // Continue with generation...
    const intake = (await request.json()) as IntakeValues;
    if (!intake.product || !intake.customer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient() as any;
    const userEmail = (sessionClaims?.email as string) || 'unknown@example.com';
    
    // ... rest of endpoint
  } catch (error) {
    // Error handling...
  }
}
```

**Why This Works:**
- Per-user rate limiting prevents abuse by authenticated users
- Free tier gets 2 generations/day (reasonable limit)
- User gets clear message about remaining quota
- 429 status signals client to stop retrying

---

## 3. Input Validation - Server-Side

**Before (Vulnerable):**
```typescript
// lib/sprint-prompt.ts - directly interpolating user input
export const USER_PROMPT_TEMPLATE = (intake: IntakeValues) => `
Generate a 30-day marketing sprint plan for:

Product: ${intake.product}
Target Customer: ${intake.customer}
Primary Goal: ${intake.goal}
Platforms: ${intake.platforms.join(', ')}
Monthly Budget: ${intake.budget}
Previous Attempts: ${intake.tried}
${intake.tried_details ? `Details: ${intake.tried_details}` : ''}
Differentiator: ${intake.differentiator}
${intake.extra ? `Additional Context: ${intake.extra}` : ''}
`;
```

**After (Secure):**
```typescript
// lib/input-validation.ts - new file
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

const ALLOWED_CHARS = /^[a-zA-Z0-9\s\-_.,!?'&()]+$/;

export function validateIntake(intake: any): IntakeValues | null {
  try {
    // Type check
    if (!intake.product || !intake.customer || !intake.goal) {
      throw new Error('Missing required fields');
    }

    // Validate each field
    const validated: IntakeValues = {
      product: validateField(intake.product, 'product', FIELD_LIMITS.product),
      customer: validateField(intake.customer, 'customer', FIELD_LIMITS.customer),
      goal: validateField(intake.goal, 'goal', FIELD_LIMITS.goal),
      platforms: validatePlatforms(intake.platforms),
      budget: validateField(intake.budget, 'budget', FIELD_LIMITS.budget),
      tried: validateField(intake.tried, 'tried', FIELD_LIMITS.tried),
      tried_details: intake.tried_details 
        ? validateField(intake.tried_details, 'tried_details', FIELD_LIMITS.tried_details)
        : undefined,
      differentiator: validateField(intake.differentiator, 'differentiator', FIELD_LIMITS.differentiator),
      extra: intake.extra 
        ? validateField(intake.extra, 'extra', FIELD_LIMITS.extra)
        : undefined,
    };

    return validated;
  } catch (error) {
    console.error('Validation error:', error);
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
    throw new Error(`${fieldName} exceeds maximum length of ${maxLength}`);
  }

  // Allow common characters but reject injection patterns
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

  if (platforms.length === 0) {
    throw new Error('At least one platform must be selected');
  }

  if (platforms.length > 10) {
    throw new Error('Maximum 10 platforms allowed');
  }

  return platforms.filter(p => ALLOWED_PLATFORMS.includes(p));
}

// lib/sprint-prompt.ts - updated with validation
export const USER_PROMPT_TEMPLATE = (intake: IntakeValues) => `
Generate a 30-day marketing sprint plan for:

Product: ${intake.product}
Target Customer: ${intake.customer}
Primary Goal: ${intake.goal}
Platforms: ${intake.platforms.join(', ')}
Monthly Budget: ${intake.budget}
Previous Attempts: ${intake.tried}
${intake.tried_details ? `Details: ${intake.tried_details}` : ''}
Differentiator: ${intake.differentiator}
${intake.extra ? `Additional Context: ${intake.extra}` : ''}

CRITICAL: Return ONLY valid JSON. No markdown. No code blocks. No explanations. Just the JSON object.
`;

// app/api/generate-sprint/route.ts - use validation
import { validateIntake } from '@/lib/input-validation';

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit check (from Fix #2)
    const { success } = await freeTierLimit.limit(`user:${userId}`);
    if (!success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // VALIDATE INPUT
    const rawIntake = (await request.json()) as IntakeValues;
    const intake = validateIntake(rawIntake);
    
    if (!intake) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // ... continue with validated intake
  }
}
```

**Why This Works:**
- Server-side validation can't be bypassed by direct API calls
- Field length limits prevent resource exhaustion
- Character whitelisting prevents injection patterns
- Platform whitelist prevents unexpected values

---

## 4. Remove Sensitive Logging

**Before (Vulnerable):**
```typescript
// app/api/generate-sprint/route.ts
console.log('[generate-sprint] Init: ANTHROPIC_API_KEY present:', !!process.env.ANTHROPIC_API_KEY);

export async function POST(request: NextRequest) {
  const { userId, sessionClaims } = await auth();
  console.log('[generate-sprint] Auth result:', { userId, email: sessionClaims?.email });
  
  const intake = (await request.json()) as IntakeValues;
  const userEmail = (sessionClaims?.email as string) || 'unknown@example.com';
  console.log('[generate-sprint] Upserting user:', { userId, userEmail });
  
  const { data: sprint, error: insertError } = await supabase
    .from('sprints')
    .insert({ /* ... */ })
    .select()
    .single();
  console.log('[generate-sprint] Sprint created:', sprint.id);
}
```

**After (Secure):**
```typescript
// lib/logger.ts - new file
function isDev() {
  return process.env.NODE_ENV === 'development';
}

export const logger = {
  debug: (...args: any[]) => {
    if (isDev()) console.debug('[debug]', ...args);
  },
  info: (...args: any[]) => {
    console.log('[info]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[error]', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('[warn]', ...args);
  },
};

// app/api/generate-sprint/route.ts - using logger
import { logger } from '@/lib/logger';

logger.debug('[init] Anthropic API configured');

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    logger.debug('[auth]', 'userId present:', !!userId);
    
    if (!userId) {
      logger.warn('[auth] Unauthorized request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const intake = (await request.json()) as IntakeValues;
    logger.debug('[intake] Validated intake received');
    
    const supabase = createServiceClient() as any;
    logger.debug('[db] Creating user record');
    
    const { data: sprint, error: insertError } = await supabase
      .from('sprints')
      .insert({ /* ... */ })
      .select()
      .single();

    if (insertError) {
      logger.error('[db] Insert failed:', insertError.message);
      return NextResponse.json({ error: 'Failed to create sprint' }, { status: 500 });
    }

    logger.info('[success] Sprint generation started');
    return NextResponse.json({ sprintId: sprint.id });
  } catch (error) {
    logger.error('[error] Request failed:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Why This Works:**
- Secrets/PII only logged in development (`isDev()` check)
- Production logs contain no user emails, IDs, or API key hints
- Error messages are safe for production (no stack traces to users)
- Logs are valuable for debugging without exposing secrets

---

## 5. Gate Dev-Only Endpoint

**Before (Vulnerable):**
```typescript
// app/api/dev-create-sprint/route.ts
export async function POST(request: Request) {
  const { userId, sessionClaims } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Dev-only endpoint, no gate - accessible in production
  const client = createServiceClient()
  // ... creates mock sprint ...
}
```

**After (Secure):**
```typescript
// app/api/dev-create-sprint/route.ts
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return Response.json(
      { error: 'This endpoint is only available in development' },
      { status: 404 }
    );
  }

  const { userId, sessionClaims } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const client = createServiceClient()
  // ... creates mock sprint ...
}
```

**Why This Works:**
- Endpoint returns 404 in production (not found)
- Dev-only logic can't be triggered by users
- Test code doesn't leak into production

---

## 6. Cost Monitoring & Alerting

**Before (Vulnerable):**
```typescript
// No cost tracking - silent budget drain
```

**After (Secure):**
```typescript
// lib/cost-monitor.ts - new file
import { createServiceClient } from './supabase/server';

export async function trackApiCall(userId: string, costInDollars: number, endpoint: string) {
  const supabase = createServiceClient();
  
  try {
    // Track cost in database
    const { error } = await supabase
      .from('api_costs')
      .insert({
        user_id: userId,
        endpoint,
        cost_dollars: costInDollars,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to track cost:', error);
      return;
    }

    // Check if approaching budget limit
    const { data: costData } = await supabase
      .from('api_costs')
      .select('cost_dollars')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()); // Last 30 days

    const totalCost = (costData || []).reduce((sum, row) => sum + row.cost_dollars, 0);
    const budgetLimit = 5.0; // $5/month
    const threshold = budgetLimit * 0.8; // Alert at 80%

    if (totalCost > threshold) {
      console.warn(`[COST_ALERT] Budget 80% consumed: $${totalCost.toFixed(2)} of $${budgetLimit}`);
      // Could send email alert here
    }
  } catch (err) {
    console.error('Cost tracking error:', err);
  }
}

// app/api/generate-sprint/route.ts - use cost monitoring
import { trackApiCall } from '@/lib/cost-monitor';

export async function POST(request: NextRequest) {
  try {
    // ... auth, rate limit, validation ...
    
    const response = await client.messages.create({
      // ... api call ...
    });

    // Estimate cost: Haiku @ $0.80/1M input, $2.40/1M output
    // Rough: 4k response ≈ $0.003, using $0.01 as safe estimate
    const estimatedCost = 0.01;
    await trackApiCall(userId, estimatedCost, '/api/generate-sprint');

    // ... continue ...
  }
}
```

**Why This Works:**
- Every API call is tracked with its cost
- Total cost is calculated monthly
- Alerts fire at 80% of budget (gives warning before depletion)
- Data persists for auditing

---

## Deployment Checklist

- [x] Install/configure Upstash Redis for rate limiting
- [x] Add rate limiting middleware to all API routes (guest: 1/hour, auth: 2/day)
- [x] Add input validation to all intake fields (validateIntake + partialUpdate schema)
- [x] Remove all sensitive logging (keys, emails, IDs) - logger utility in place
- [x] Gate `/api/dev-create-sprint` with `NODE_ENV` check
- [x] Enable Supabase RLS on users, sprints, api_usage_log tables
- [x] Fix PATCH race condition - user_id constraint added to final update
- [x] Delete unprotected `/api/test` endpoint
- [x] Fix PDF print CSS conflicts - globals.css cleaned, sprint-print-styles.ts owns all print CSS
- [ ] Deploy cost monitoring table to Supabase
- [ ] Set up cost alerts (80% threshold)
- [ ] Test rate limiting in staging via Upstash Redis config
- [ ] Test input validation with injection payloads
- [ ] Verify logs don't contain secrets in production
- [ ] Plan paid tier implementation before scaling
- [ ] Run full audit again post-deployment (2026-04-29)

---

## Verification Commands

```bash
# Test rate limiting (should fail after 1 request)
for i in {1..3}; do 
  curl -X POST http://localhost:3000/api/generate-sprint-guest \
    -H "Content-Type: application/json" \
    -d '{"product":"test","customer":"test","goal":"test","platforms":["test"],"budget":"test","tried":"test","differentiator":"test"}'
  echo "Request $i completed"
done

# Test input validation (should reject special chars)
curl -X POST http://localhost:3000/api/generate-sprint \
  -H "Content-Type: application/json" \
  -d '{"product":"test\"; DROP TABLE sprints;--","customer":"test","goal":"test","platforms":["test"],"budget":"test","tried":"test","differentiator":"test"}'

# Grep for secrets in logs
grep -r "ANTHROPIC_API_KEY\|sessionClaims\|userEmail" app/ lib/
```
