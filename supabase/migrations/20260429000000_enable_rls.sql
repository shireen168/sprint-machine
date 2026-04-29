-- Enable RLS on server-only tables
-- With RLS enabled and no policies, anon/authenticated roles are denied by default.
-- The service role key (used in all server routes) bypasses RLS entirely.

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_log ENABLE ROW LEVEL SECURITY;
