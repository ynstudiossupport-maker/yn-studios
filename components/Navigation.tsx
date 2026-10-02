"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Logo, { type LogoProps } from "./Logo";

const ids = ["home", "projects", "about", "members", "contact"] as const;

type Props = {
  labels: [string, string, string, string, string];
  ctaLabel: string;
  menuNote: string;
  logo: LogoProps;
};

export default function Navigation({ labels, ctaLabel, menuNote, logo }: Props) {
  const links = ids.map((id, i) => [labels[i], id] as const);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently on screen (home page only).
  useEffect(() => {
    if (!onHome) return;
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  // Never show the public-site navigation inside the admin area.
  if (pathname?.startsWith("/admin")) return null;

  const href = (id: string) => `/#${id}`;
  const solid = scrolled || !onHome;

  return (
    <>
      <header className={`site-header ${solid ? "solid" : ""}`}>
        <a className="logo" href={href("home")} aria-label="YN Studios home">
          <Logo {...logo} />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, id]) => (
            <a key={id} href={href(id)} aria-current={onHome && active === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </nav>

        {ctaLabel && (
          <a className="btn btn-outline header-cta" href={href("contact")}>
            {ctaLabel}
          </a>
        )}

        <button
          className="menu-btn"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </header>

      <div id="mobile-menu" className={`menu-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id]) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
        {menuNote && <p>{menuNote}</p>}
      </div>
    </>
  );
}
