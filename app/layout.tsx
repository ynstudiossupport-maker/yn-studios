import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { getSiteSettings } from "@/lib/data";
import { onColor, safeColor } from "@/lib/color";

export const viewport: Viewport = { themeColor: "#09090a" };
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: s.site_title,
    description: s.site_description,
    metadataBase: new URL("https://ynstudios.in")
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSiteSettings();
  const accent = safeColor(s.accent_color);
  const theme = { "--accent": accent, "--on-accent": onColor(accent) } as CSSProperties;

  return (
    <html lang="en" style={theme}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Oswald:wght@300;400;500&family=Mrs+Saint+Delafield&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
