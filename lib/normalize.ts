import { defaultSettings } from "./default-settings";
import type { SiteSettings } from "./types";

/** Merge stored content over the defaults and repair older / partial shapes. */
export function normalizeSettings(stored: Record<string, unknown> = {}): SiteSettings {
  const s = { ...defaultSettings, ...stored } as SiteSettings & Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);
  s.hero_tags = arr(s.hero_tags).map(String);
  s.banner_tags = arr(s.banner_tags).map(String);
  s.form_types = arr(s.form_types).map(String);
  s.clients = arr(s.clients).map((c: any) =>
    typeof c === "string" ? { name: c, logo_url: "" } : { name: String(c?.name ?? ""), logo_url: String(c?.logo_url ?? "") }
  );
  s.service_items = arr(s.service_items).map((c: any) => ({ title: String(c?.title ?? ""), image_url: String(c?.image_url ?? "") }));
  return s;
}
