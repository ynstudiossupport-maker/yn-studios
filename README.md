# YN Studios

Dark, cinematic portfolio site for YN Studios, built with Next.js 16, React 19 and Supabase.

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run `npm run dev`

## Supabase setup

Run `supabase.sql` in the Supabase SQL Editor.

Then:
1. Supabase Dashboard → Authentication → Users → Add user.
2. Copy the new user's UUID.
3. In SQL Editor run:
   `insert into public.admin_users (user_id) values ('YOUR-UUID');`
4. The admin panel is available at `/admin`.

The `yn-assets` public Storage bucket is created by `supabase.sql`. Admins can upload project, member, hero and about images from `/admin`.

## Admin capabilities

Everything on the public site is editable at `/admin`:

- **Separate admin pages**, grouped in the sidebar: *Branding* (Logo & colour, Navigation), *Homepage* (Hero, Brands we've worked with, Services, Statement banner, Projects, About, Team, Contact), *More* (Contact form, Footer & contact details, Google & SEO). Each page edits only its own text and images.
- **Show/hide:** the brands strip, services section and banner have on/off switches. Clearing a label or button text hides that element.
- **Projects and Team pages** also hold the project and member lists: add, edit, delete, reorder, feature, and upload images.
- Multi-line fields (headlines, slogans, handwritten overlays) use one line per row.
- Lists and cards can be reordered with Up/Down and removed.

To make a new piece of text editable, add a default in `lib/default-settings.ts`, a type in `lib/types.ts`, and an entry in `lib/site-fields.ts` — the admin form is generated from that list.

## Project videos (hover to play)

In **Admin → Projects**, edit a project and use **Hover video** to upload a short MP4/WebM clip (up to 50 MB; under 20 MB is best) or paste a video link. On the site the card shows its image; the clip plays silently while the visitor hovers it (mouse) or after a tap (phones), and resets when they leave. YouTube links are supported too. Projects with a video need the `video_url` column, so run this once in the Supabase SQL Editor if your database already exists:

```sql
alter table public.projects add column if not exists video_url text;
alter table public.projects add column if not exists link_url text;
```

## Services strip

Services appear as a compact set of still, clickable pills (4 across on desktop, 2 across on tablets and phones, plain CSS grid, no animation). Only the brands strip slides.

## Services open matching projects

Each service card (Admin → Services) has a **Project category it opens**, e.g. `Photography`. Clicking the card opens `/projects?category=Photography`, which lists only projects whose **Category** (Admin → Projects) is `Photography`. Matching ignores upper/lower case. The projects page also has filter buttons for every category, plus "All". Cards left without a category open the full project list.

## Clickable projects

Each project can have a **Project link** (the live site, an Instagram reel, a YouTube video, a Drive folder, etc.). Cards with a link are clickable, open it in a new tab and show a "View project" text (editable under Admin → Projects). Cards without a link are not clickable. A project can have an image, a hover video, or both; with a video only, the video's first frame is used as the thumbnail. On touch screens the video previews play automatically while the card is mostly in view.

## Enquiries via WhatsApp

When someone sends the contact form, a WhatsApp chat opens to your number with their name, email, chosen service and message already typed in; they only press send. A copy is also saved to `contact_submissions` in Supabase when it is configured. Set the number in **Admin → Contact form → WhatsApp number** (with country code, e.g. `+91 98765 43210`). If it is empty, the Phone number from Footer & contact details is used.

## Deployment

Push the repository to GitHub and import it into Vercel. Add the two `NEXT_PUBLIC_*` environment variables in Vercel. Do not commit `.env.local`. These values are inlined at build time, so after adding or changing them in Vercel you must **redeploy**. Until they are set, the public site shows built-in demo content and `/admin` shows a setup message.

## Routes

- `/` single-page site (hero, services, projects, about, team, contact)
- `/projects` all projects
- `/team` full team
- `/admin` content editor
