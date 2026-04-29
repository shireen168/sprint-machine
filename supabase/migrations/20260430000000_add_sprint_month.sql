-- Add sprint_month column to track which month the sprint_count belongs to
-- Format: 'YYYY-MM' (e.g., '2026-04')
-- Enables calendar-month-based counter resets in API logic

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS sprint_month text;

-- Set existing users to current month so counts don't reset immediately
UPDATE public.users
SET sprint_month = to_char(now(), 'YYYY-MM')
WHERE sprint_month IS NULL AND sprint_count_this_month > 0;
