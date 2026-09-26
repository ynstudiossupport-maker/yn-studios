import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YN Studios — Visuals for Brands",
  description: "YN Studios creates photography, reels, Meta ads and websites for brands that care about how they look and grow.",
  metadataBase: new URL("https://ynstudios.in")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
