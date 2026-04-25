-- supabase/migrations/20260420000000_initial_schema.sql

create type user_tier as enum ('free', 'pro');
create type sprint_status as enum ('generating', 'complete', 'failed');

create table public.users (
  id text primary key,
  email text not null,
  tier user_tier not null default 'free',
  stripe_customer_id text,
  sprint_count_this_month integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.sprints (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.users(id) on delete cascade,
  title text not null,
  goal text,
  channels text[] not null default '{}',
  intake jsonb not null default '{}',
  output jsonb,
  status sprint_status not null default 'generating',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sprint_reviews (
  id uuid primary key default gen_random_uuid(),
  sprint_id uuid not null references public.sprints(id) on delete cascade,
  user_id text not null references public.users(id) on delete cascade,
  results_input text not null,
  diagnosis jsonb,
  next_sprint_id uuid references public.sprints(id),
  created_at timestamptz not null default now()
);

create table public.api_usage_log (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  operation text not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cached_tokens integer not null default 0,
  cost_usd numeric(8,6) not null default 0,
  created_at timestamptz not null default now()
);

create index sprints_user_id_idx on public.sprints(user_id);
create index sprints_created_at_idx on public.sprints(created_at desc);
create index api_usage_log_user_id_idx on public.api_usage_log(user_id);
create index api_usage_log_created_at_idx on public.api_usage_log(created_at desc);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sprints_updated_at
  before update on public.sprints
  for each row execute function update_updated_at();

-- Only enable RLS on client-facing tables; backend tables are server-only
alter table public.sprint_reviews enable row level security;

create policy "sprint_reviews: own rows" on public.sprint_reviews
  for all using (user_id = auth.jwt()->>'sub');
