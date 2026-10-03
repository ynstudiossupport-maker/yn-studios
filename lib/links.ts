/** Turn whatever was typed in the admin into a usable href (or null). */
export function normalizeLink(value?: string | null) {
  const v = (value ?? "").trim();
  if (!v) return null;
  if (/^(https?:|mailto:|tel:)/i.test(v)) return { href: v, external: /^https?:/i.test(v) };
  if (v.startsWith("/") || v.startsWith("#")) return { href: v, external: false };
  // "instagram.com/p/abc" -> https://instagram.com/p/abc
  return { href: `https://${v}`, external: true };
}
