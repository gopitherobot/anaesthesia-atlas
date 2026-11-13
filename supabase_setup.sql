-- Optional: cloud accounts for the public site (Supabase, free tier).
-- 1. Create a Supabase project. 2. Run this in the SQL editor. 3. Put the project URL and anon key in config.js.
create table if not exists public.atlas_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb,
  cards jsonb,
  updated_at timestamptz default now()
);
alter table public.atlas_progress enable row level security;
create policy "own row: read"   on public.atlas_progress for select using (auth.uid() = user_id);
create policy "own row: insert" on public.atlas_progress for insert with check (auth.uid() = user_id);
create policy "own row: update" on public.atlas_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
