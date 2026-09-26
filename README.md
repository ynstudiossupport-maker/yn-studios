# YN Studios

Mobile-first portfolio site for YN Studios, built with Next.js 16, React 19 and Supabase.

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

- Edit homepage headline, intro and hero image
- Edit services
- Edit Projects heading and intro
- Edit About heading, body, image and approach steps
- Edit contact information
- Add/edit/delete projects
- Add/edit/delete members
- Upload images directly to Supabase Storage
- Reorder projects and members
- Mark projects as featured

## Deployment

Push the repository to GitHub and import it into Vercel. Add the two `NEXT_PUBLIC_*` environment variables in Vercel. Do not commit `.env.local`.
