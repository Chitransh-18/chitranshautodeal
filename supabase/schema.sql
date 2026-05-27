-- Chitransh Auto Deal Supabase schema
-- Run this in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  model text not null,
  year integer not null check (year >= 1980 and year <= extract(year from now())::integer + 1),
  price integer not null check (price >= 0),
  odometer integer not null check (odometer >= 0),
  fuel_type text not null check (fuel_type in ('Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid')),
  transmission text not null check (transmission in ('Manual', 'Automatic')),
  insurance_active boolean not null default false,
  owner_type text not null,
  registration_number text not null,
  description text not null,
  features text[] not null default '{}',
  status text not null default 'available' check (status in ('available', 'sold')),
  created_at timestamptz not null default now()
);

create table if not exists public.car_images (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null references public.cars(id) on delete cascade,
  image_url text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists cars_status_created_at_idx on public.cars (status, created_at desc);
create index if not exists car_images_car_id_idx on public.car_images (car_id, is_primary desc, created_at asc);

alter table public.cars enable row level security;
alter table public.car_images enable row level security;

-- Public website can read listings and images.
create policy "Public can read cars"
on public.cars for select
using (true);

create policy "Public can read car images"
on public.car_images for select
using (true);

-- Authenticated admins can manage data. Keep Supabase Auth signups invite-only
-- or restrict admin users from the Supabase dashboard.
create policy "Authenticated users can manage cars"
on public.cars for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage car images"
on public.car_images for all
to authenticated
using (true)
with check (true);

-- Storage bucket and policies for car image uploads.
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do update set public = true;

create policy "Public can read car image files"
on storage.objects for select
using (bucket_id = 'car-images');

create policy "Authenticated users can upload car image files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'car-images');

create policy "Authenticated users can update car image files"
on storage.objects for update
to authenticated
using (bucket_id = 'car-images')
with check (bucket_id = 'car-images');

create policy "Authenticated users can delete car image files"
on storage.objects for delete
to authenticated
using (bucket_id = 'car-images');
