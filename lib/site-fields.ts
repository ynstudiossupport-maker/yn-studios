import type { SiteSettings } from "./types";

export type FieldType = "text" | "textarea" | "image" | "color" | "toggle" | "list" | "clients" | "services";
export type FieldDef = { key: keyof SiteSettings; label: string; type: FieldType; hint?: string };
export type SectionDef = {
  id: string;
  group: "Branding" | "Homepage" | "More";
  title: string;
  /** Short description shown under the page title in the admin. */
  about: string;
  fields: FieldDef[];
};

const ML = "One line per row.";

/**
 * Every editable piece of the public site. The admin "Site" tab is generated
 * from this list, so adding a field here (plus a default in default-settings.ts)
 * makes it editable.
 */
export const siteSections: SectionDef[] = [
  {
    id: "logo",
    group: "Branding",
    title: "Logo & colour",
    about: "Your logo and the brand colour used for buttons, highlights and labels across the site.",
    fields: [
      { key: "accent_color", label: "Brand colour", type: "color", hint: "Buttons, highlights and labels." },
      { key: "logo_text", label: "Logo text", type: "text" },
      { key: "logo_sub", label: "Logo sub-text", type: "text" },
      { key: "logo_image", label: "Logo image (replaces the text logo)", type: "image", hint: "Transparent PNG or SVG works best. Leave empty to use the text logo." },
    ],
  },
  {
    id: "navigation",
    group: "Branding",
    title: "Navigation",
    about: "The menu links, header button and mobile menu line.",
    fields: [
      { key: "nav_home", label: "Home link", type: "text" },
      { key: "nav_projects", label: "Projects link", type: "text" },
      { key: "nav_about", label: "About link", type: "text" },
      { key: "nav_members", label: "Members link", type: "text" },
      { key: "nav_contact", label: "Contact link", type: "text" },
      { key: "header_cta_label", label: "Header button", type: "text" },
      { key: "mobile_menu_note", label: "Mobile menu footer line", type: "text" },
    ],
  },
  {
    id: "hero",
    group: "Homepage",
    title: "Hero",
    about: "The first screen: headline, intro, button, background image and tags.",
    fields: [
      { key: "hero_label", label: "Small label above headline", type: "text" },
      { key: "hero_title", label: "Headline", type: "textarea", hint: ML },
      { key: "hero_intro", label: "Intro", type: "textarea", hint: ML },
      { key: "hero_cta_label", label: "Button", type: "text" },
      { key: "hero_image", label: "Hero image", type: "image" },
      { key: "hero_tags", label: "Tags (bottom right)", type: "list" },
      { key: "scroll_cue_label", label: "Scroll hint", type: "text" },
    ],
  },
  {
    id: "brands",
    group: "Homepage",
    title: "Brands we've worked with",
    about: "The strip of brand names or logos under the hero.",
    fields: [
      { key: "show_clients", label: "Show this strip", type: "toggle" },
      { key: "clients", label: "Brands", type: "clients", hint: "Add a logo to show it instead of the name. Logos are shown in white." },
    ],
  },
  {
    id: "services",
    group: "Homepage",
    title: "Services",
    about: "The services heading, intro and the cards with images.",
    fields: [
      { key: "show_services", label: "Show this section", type: "toggle" },
      { key: "services_eyebrow", label: "Small label", type: "text" },
      { key: "services_heading", label: "Heading", type: "text" },
      { key: "services_intro", label: "Intro", type: "textarea" },
      { key: "services_link_label", label: "Link text", type: "text" },
      { key: "service_items", label: "Service cards", type: "services" },
    ],
  },
  {
    id: "banner",
    group: "Homepage",
    title: "Statement banner",
    about: "The full-width slogan image.",
    fields: [
      { key: "show_banner", label: "Show this section", type: "toggle" },
      { key: "banner_text", label: "Slogan", type: "textarea", hint: ML },
      { key: "banner_image", label: "Banner image", type: "image" },
      { key: "banner_tags", label: "Tags (bottom right)", type: "list" },
    ],
  },
  {
    id: "projects",
    group: "Homepage",
    title: "Projects",
    about: "The Projects section text, plus add, edit, reorder and feature the projects themselves.",
    fields: [
      { key: "projects_eyebrow", label: "Small label", type: "text" },
      { key: "projects_heading", label: "Heading", type: "text" },
      { key: "projects_link_label", label: "Link text", type: "text" },
      { key: "projects_page_heading", label: "“All projects” page heading", type: "text" },
      { key: "projects_page_cta", label: "“All projects” page link", type: "text" },
    ],
  },
  {
    id: "about",
    group: "Homepage",
    title: "About",
    about: "The About section text, button, image and handwritten overlay.",
    fields: [
      { key: "about_eyebrow", label: "Small label", type: "text" },
      { key: "about_heading", label: "Heading", type: "textarea", hint: ML },
      { key: "about_body", label: "Body", type: "textarea" },
      { key: "about_cta_label", label: "Button", type: "text" },
      { key: "about_image", label: "Image", type: "image" },
      { key: "about_script", label: "Handwritten text on image", type: "textarea", hint: ML },
    ],
  },
  {
    id: "members",
    group: "Homepage",
    title: "Team",
    about: "The Team section text, plus add, edit and reorder the people themselves.",
    fields: [
      { key: "members_eyebrow", label: "Small label", type: "text" },
      { key: "members_heading", label: "Heading", type: "textarea", hint: ML },
      { key: "members_intro", label: "Intro", type: "textarea" },
      { key: "members_cta_label", label: "Button", type: "text" },
    ],
  },
  {
    id: "contact",
    group: "Homepage",
    title: "Contact",
    about: "The Get in touch section: text, button, image and overlay.",
    fields: [
      { key: "contact_eyebrow", label: "Small label", type: "text" },
      { key: "contact_heading", label: "Heading", type: "textarea", hint: ML },
      { key: "contact_intro", label: "Intro", type: "textarea", hint: ML },
      { key: "contact_cta_label", label: "Button", type: "text" },
      { key: "contact_image", label: "Image", type: "image" },
      { key: "contact_script", label: "Handwritten text on image", type: "textarea", hint: ML },
    ],
  },
  {
    id: "form",
    group: "More",
    title: "Contact form",
    about: "Where enquiries go (WhatsApp) and every word in the enquiry form, including the dropdown options.",
    fields: [
      { key: "whatsapp_number", label: "WhatsApp number (enquiries are sent here)", type: "text", hint: "Include the country code, e.g. +91 98765 43210. If empty, the Phone number from Footer & contact details is used." },
      { key: "whatsapp_greeting", label: "First line of the WhatsApp message", type: "text" },
      { key: "form_title", label: "Form title", type: "text" },
      { key: "form_name_placeholder", label: "Name field", type: "text" },
      { key: "form_email_placeholder", label: "Email field", type: "text" },
      { key: "form_type_placeholder", label: "Dropdown placeholder", type: "text" },
      { key: "form_types", label: "Dropdown options", type: "list" },
      { key: "form_message_placeholder", label: "Message field", type: "text" },
      { key: "form_submit_label", label: "Send button", type: "text" },
      { key: "form_sending_label", label: "Sending state", type: "text" },
      { key: "form_success", label: "Success message", type: "text" },
    ],
  },
  {
    id: "footer",
    group: "More",
    title: "Footer & contact details",
    about: "Footer text, copyright, and your email, phone and social links.",
    fields: [
      { key: "footer_tagline", label: "Footer tagline", type: "textarea", hint: ML },
      { key: "copyright_text", label: "Copyright text (year is added automatically)", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "instagram", label: "Instagram (handle or URL)", type: "text" },
      { key: "youtube", label: "YouTube URL", type: "text", hint: "Leave empty to hide the icon." },
      { key: "linkedin", label: "LinkedIn URL", type: "text", hint: "Leave empty to hide the icon." },
    ],
  },
  {
    id: "seo",
    group: "More",
    title: "Google & SEO",
    about: "How the site appears in browser tabs and Google search results.",
    fields: [
      { key: "site_title", label: "Browser tab / Google title", type: "text" },
      { key: "site_description", label: "Google description", type: "textarea" },
    ],
  },
];
