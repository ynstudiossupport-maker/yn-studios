import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

/** Public-site chrome. The /admin area sits outside this group, so it gets no header or footer. */
export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSiteSettings();
  return (
    <>
      <Navigation
        labels={[s.nav_home, s.nav_projects, s.nav_about, s.nav_members, s.nav_contact]}
        ctaLabel={s.header_cta_label}
        menuNote={s.mobile_menu_note}
        logo={{ text: s.logo_text, sub: s.logo_sub, image: s.logo_image }}
      />
      {children}
      <Footer settings={s} />
    </>
  );
}
