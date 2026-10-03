-- YN Studios database + admin access
-- 1) Run this in Supabase SQL Editor.
-- 2) Create your admin user in Supabase Authentication > Users.
-- 3) Copy that user's UUID into public.admin_users below using the insert example.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null,
  year integer not null default extract(year from now()), image_url text not null,
  description text, featured boolean not null default false, sort_order integer not null default 0,
  video_url text,
  link_url text,
  created_at timestamptz not null default now()
);

-- Existing databases: adds the optional hover-preview video column.
alter table public.projects add column if not exists video_url text;
alter table public.projects add column if not exists link_url text;

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(), name text not null, role text not null,
  image_url text not null, bio text, sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key default 'default', content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  project_type text, message text not null, created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid()); $$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.projects enable row level security;
alter table public.members enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;
alter table public.contact_submissions enable row level security;

drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects" on public.projects for select using (true);
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can view members" on public.members;
create policy "Public can view members" on public.members for select using (true);
drop policy if exists "Admins manage members" on public.members;
create policy "Admins manage members" on public.members for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can view site settings" on public.site_settings;
create policy "Public can view site settings" on public.site_settings for select using (true);
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can see own admin row" on public.admin_users;
create policy "Users can see own admin row" on public.admin_users for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public can submit contact forms" on public.contact_submissions;
create policy "Public can submit contact forms" on public.contact_submissions for insert with check (true);
drop policy if exists "Admins manage contacts" on public.contact_submissions;
create policy "Admins manage contacts" on public.contact_submissions for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('yn-assets', 'yn-assets', true) on conflict (id) do update set public = true;

drop policy if exists "Public can view YN assets" on storage.objects;
create policy "Public can view YN assets" on storage.objects for select using (bucket_id = 'yn-assets');
drop policy if exists "Admins upload YN assets" on storage.objects;
create policy "Admins upload YN assets" on storage.objects for insert to authenticated with check (bucket_id = 'yn-assets' and public.is_admin());
drop policy if exists "Admins update YN assets" on storage.objects;
create policy "Admins update YN assets" on storage.objects for update to authenticated using (bucket_id = 'yn-assets' and public.is_admin()) with check (bucket_id = 'yn-assets' and public.is_admin());
drop policy if exists "Admins delete YN assets" on storage.objects;
create policy "Admins delete YN assets" on storage.objects for delete to authenticated using (bucket_id = 'yn-assets' and public.is_admin());

-- Site copy. Anything not set here falls back to lib/default-settings.ts.
insert into public.site_settings (id, content)
values ('default', jsonb_build_object(
  'hero_title','Ideas
Captured
Brands
Built',
  'hero_intro','Photography. Reels. Meta Ads.
Websites. And more.',
  'about_heading','Creative minds.
Real outcomes.',
  'members_heading','The people
behind YN',
  'contact_heading','Let''s create
together',
  'email','hello@ynstudios.in','phone','+91 98765 43210','location','India','instagram','@yn.studios'
)) on conflict (id) do nothing;

insert into public.projects (title,category,year,image_url,description,featured,sort_order) values
('Automotive Campaign','Photography',2026,'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85','Campaign photography and short-form content.',true,1),
('Restaurant Stories','Reels',2026,'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=85','Food, atmosphere and social-first content.',true,2),
('Resort Promotion','Photography',2026,'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85','Visual identity and campaign assets for hospitality.',true,3),
('Brand Film','Reels',2026,'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85','A short visual story built for digital.',false,4),
('Digital Presence','Websites',2026,'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=85','Strategy, design and development.',false,5)
on conflict do nothing;

insert into public.members (name,role,image_url,bio,sort_order) values
('Yash Patil','Founder & Strategist','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85','Strategy, client direction and growth.',1),
('Aditya','Videographer & Editor','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85','Production, editing and visual storytelling.',2),
('Rohan','Web Developer','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85','Web experiences and technical direction.',3),
('Sahil','Content Creator','https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=85','Content, photography and creative execution.',4)
on conflict do nothing;

-- AFTER creating your Supabase Auth user, run this with their UUID:
-- insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
