-- CREATIFY STUDIOS CMS
-- Run this entire file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid()) $$;

grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  eyebrow text default 'Creative Design Studio',
  hero_line_1 text default 'CRAFTING',
  hero_line_2 text default 'DIGITAL ICONS',
  hero_description text,
  intro_title text,
  intro_body text,
  about_title text,
  about_body text,
  email text,
  phone text,
  location text,
  instagram text,
  linkedin text,
  behance text,
  primary_cta_label text,
  primary_cta_url text,
  secondary_cta_label text,
  secondary_cta_url text,
  footer_blurb text,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  category text not null, year text, client_name text, services text, excerpt text, description text,
  image_url text, featured boolean not null default false, published boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), title text not null, icon text, description text,
  published boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(), name text not null, logo_url text, website_url text,
  published boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(), quote text not null, client_name text not null, client_role text,
  published boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null,
  published boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(), value text not null, label text not null,
  published boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, company text,
  service text, budget text, timeline text, message text not null, status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.stats enable row level security;
alter table public.inquiries enable row level security;

-- Public read policies
create policy "Public reads settings" on public.site_settings for select using (true);
create policy "Public reads published projects" on public.projects for select using (published = true or public.is_admin());
create policy "Public reads published services" on public.services for select using (published = true or public.is_admin());
create policy "Public reads published clients" on public.clients for select using (published = true or public.is_admin());
create policy "Public reads published testimonials" on public.testimonials for select using (published = true or public.is_admin());
create policy "Public reads published faqs" on public.faqs for select using (published = true or public.is_admin());
create policy "Public reads published stats" on public.stats for select using (published = true or public.is_admin());
create policy "Anyone creates enquiries" on public.inquiries for insert with check (true);

-- Admin policies
create policy "Admins manage admin list" on public.admin_users for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage clients" on public.clients for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage faqs" on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage stats" on public.stats for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage enquiries" on public.inquiries for select using (public.is_admin());
create policy "Admins update enquiries" on public.inquiries for update using (public.is_admin()) with check (public.is_admin());

-- Public media bucket
insert into storage.buckets (id,name,public) values ('creatify-media','creatify-media',true)
on conflict (id) do update set public = true;
create policy "Public media access" on storage.objects for select using (bucket_id='creatify-media');
create policy "Admins upload media" on storage.objects for insert to authenticated with check (bucket_id='creatify-media' and public.is_admin());
create policy "Admins update media" on storage.objects for update to authenticated using (bucket_id='creatify-media' and public.is_admin());
create policy "Admins delete media" on storage.objects for delete to authenticated using (bucket_id='creatify-media' and public.is_admin());

-- Starter content
insert into public.site_settings (hero_description,intro_title,intro_body,about_title,about_body,email,location,instagram,linkedin,behance,primary_cta_label,primary_cta_url,secondary_cta_label,secondary_cta_url,footer_blurb)
select 'Creatify is a South African creative studio shaping memorable brands, digital experiences and visual systems for ambitious businesses.','DESIGN THAT SPEAKS VOLUMES','We are a collective of passionate designers, strategists and creators dedicated to crafting exceptional brand experiences. From startups to enterprises, we partner with visionary clients to create designs that captivate, communicate and convert.','WHERE CREATIVITY MEETS STRATEGY','Our studio is a hub of innovation where designers, strategists and technologists come together to create extraordinary work. Every project connects bold creativity with clear business objectives.','hello@creatifystudios.co.za','Based in South Africa. Available worldwide.','#','#','#','Start a Project','contact.html','View Projects','work.html','Elevating brands through strategic thinking, expressive design and digital excellence.'
where not exists (select 1 from public.site_settings);

insert into public.projects (slug,title,category,year,client_name,services,excerpt,description,image_url,featured,published,sort_order) values
('lumin-dental','Lumin Dental','Brand Identity & Graphics','2026','Lumin Dental','Brand identity, campaign design, digital graphics','Brand reveal concepts and promotional materials tailored for a modern dental clinic.','A warm, contemporary visual language developed to help Lumin Dental communicate clinical confidence without losing its human touch.','assets/projects/lumin.svg',true,true,1),
('laomai-dental','Laomai Dental','Print & Digital Layout','2026','Laomai Dental','Print design, social media, clinic graphics','Custom flyers, posters and clinic branding created to elevate the patient experience.','A practical and polished campaign system designed for consistent use across social posts, print and in-clinic communication.','assets/projects/laomai.svg',true,true,2),
('creatify-collective','Creatify Collective','Web Design','2026','Creatify Studios','Web design, UI/UX, development','The flagship digital home for our creative collective, featuring seamless motion and UX.','A flexible portfolio platform balancing confident typography, playful studio personality and a powerful content management system.','assets/projects/creatify.svg',true,true,3),
('imperial-ac','Imperial AC','Sports Branding','2026','Imperial Athletic Club','Brand identity, sports graphics, web design','A complete visual system giving an ambitious community football club a professional edge.','From matchday graphics and player profiles to kit concepts and a live website, the identity positions Imperial AC for its next stage of growth.','assets/projects/imperial.svg',true,true,4)
on conflict (slug) do nothing;

insert into public.services (title,icon,description,sort_order) values
('Brand Identity','✦','Strategic brand development including logo design, visual systems, positioning and comprehensive brand guidelines.',1),
('Web Design','▣','Responsive websites that combine compelling aesthetics, clear structure and exceptional user experience.',2),
('UI/UX Design','⌘','User-centred interface design creating intuitive, engaging digital experiences across platforms.',3),
('Digital Marketing','↗','Campaign systems and creative assets that capture attention and drive engagement across digital channels.',4),
('Motion Design','▶','Expressive animated content, title systems and social media motion that give brands energy and personality.',5),
('Print & Packaging','◇','Editorial, packaging and physical brand applications designed to feel considered in every detail.',6);

insert into public.clients (name,website_url,sort_order) values
('Lumin Dental','#',1),('Laomai Dental','#',2),('Imperial AC','#',3),('HeadsUp','#',4),('Melora','#',5),('MiMi','#',6),('Significance','#',7),('Africa Change Lab','#',8);
insert into public.testimonials (quote,client_name,client_role,sort_order) values
('Our beauty brand needed a fresh, elegant look. Creatify elevated our entire visual identity to match the quality of our products.','Melora','Beauty Brand',1),
('Working with Creatify was a dream. They designed a beautiful, soft and modern brand aesthetic that our mommy demographic absolutely loves.','MiMi','Baby & Mommy Clothing',2),
('The attention to detail Creatify brought to our jewellery brand was unmatched. Everything looks premium, luxurious and highly professional.','Significance','Jewellery',3),
('Creatify gave our Sunday league squad a professional edge. The graphics and branding make us look like a top-tier team on and off the pitch.','Imperial AC','Community Football Club',4),
('Creatify perfectly captured our mission to provide safe hubs for students in South Africa. The design is approachable, friendly and exactly what we needed.','HeadsUp','Student Safety Hub',5);
insert into public.faqs (question,answer,sort_order) values
('What services does Creatify offer?','We specialise in brand identity, website design, UI/UX, digital campaigns, print communication, packaging, motion design and creative direction.',1),
('How long does a typical project take?','Timelines depend on scope. Smaller design projects may take several working days, while full identities and websites usually take between four and twelve weeks.',2),
('What is your design process?','Our process generally includes discovery, research, creative direction, design development, refinement and final delivery. Each stage is adapted to the project.',3),
('Do you work with clients internationally?','Yes. Creatify is based in South Africa and works remotely with clients locally and internationally.',4),
('What are your pricing structures?','Projects are quoted according to scope, complexity, timing and deliverables. After a discovery conversation, we provide a clear proposal before work begins.',5);
insert into public.stats (value,label,sort_order) values ('150+','Projects Delivered',1),('5+','Years Combined Experience',2),('30+','Brands Supported',3),('8+','Design Fields Covered',4);

-- LAST STEP AFTER CREATING YOUR USER IN AUTHENTICATION:
-- insert into public.admin_users (user_id) values ('PASTE-YOUR-AUTH-USER-UUID-HERE');
