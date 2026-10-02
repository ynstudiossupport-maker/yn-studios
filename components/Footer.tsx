import type { SiteSettings } from "@/lib/types";
import { Instagram, Linkedin, Youtube } from "./Icons";
import Logo from "./Logo";

const ids = ["home", "projects", "about", "members", "contact"] as const;

const instagramUrl = (value: string) =>
  /^https?:\/\//.test(value) ? value : `https://instagram.com/${value.replace(/^@/, "")}`;

export default function Footer({ settings }: { settings: SiteSettings }) {
  const labels = [settings.nav_home, settings.nav_projects, settings.nav_about, settings.nav_members, settings.nav_contact];
  const links = ids.map((id, i) => [labels[i], id] as const);
  const socials = [
    { label: "Instagram", href: settings.instagram && instagramUrl(settings.instagram), Icon: Instagram },
    { label: "YouTube", href: settings.youtube, Icon: Youtube },
    { label: "LinkedIn", href: settings.linkedin, Icon: Linkedin },
  ].filter((item) => item.href);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="logo" href="/#home" aria-label="YN Studios home">
          <Logo text={settings.logo_text} sub={settings.logo_sub} image={settings.logo_image} />
        </a>

        <div className="footer-center">
          <nav aria-label="Footer navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`/#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="socials">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <p className="footer-tagline">{settings.footer_tagline}</p>
      </div>
      {settings.copyright_text && <p className="footer-copy">&copy; {new Date().getFullYear()} {settings.copyright_text}</p>}
    </footer>
  );
}
