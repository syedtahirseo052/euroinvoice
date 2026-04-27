-- ============================================================
-- EuroInvoice — Supabase Schema
-- Paste this entire file into Supabase → SQL Editor → Run
-- ============================================================

-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  plan text not null default 'free', -- 'free' or 'pro'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Invoices table
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  invoice_number text not null,
  status text not null default 'draft', -- 'draft', 'sent', 'paid', 'overdue'
  issued_date date not null,
  due_date date not null,
  currency text not null default 'EUR',
  language text not null default 'en',
  -- Seller info stored as JSON
  from_data jsonb not null default '{}'::jsonb,
  -- Client info stored as JSON
  to_data jsonb not null default '{}'::jsonb,
  -- Line items stored as JSON array
  line_items jsonb not null default '[]'::jsonb,
  -- Calculated totals
  subtotal numeric(12, 2) not null default 0,
  vat_amount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  -- Recurring invoice support (Pro feature)
  is_recurring boolean default false,
  recurring_interval text, -- 'monthly', 'quarterly', 'yearly'
  next_send_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table (tracks Stripe subscriptions)
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text not null default 'free',      -- 'free', 'pro'
  interval text,                           -- 'month', 'year'
  status text not null default 'inactive', -- 'active', 'inactive', 'canceled', 'past_due'
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security — users can only see their own data
alter table public.profiles enable row level security;
alter table public.invoices enable row level security;
alter table public.subscriptions enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can view own invoices"
  on public.invoices for select using (auth.uid() = user_id);

create policy "Users can insert own invoices"
  on public.invoices for insert with check (auth.uid() = user_id);

create policy "Users can update own invoices"
  on public.invoices for update using (auth.uid() = user_id);

create policy "Users can delete own invoices"
  on public.invoices for delete using (auth.uid() = user_id);

create policy "Users can view own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);
