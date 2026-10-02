export type Project = {
  id: string;
  title: string;
  category: string;
  year: number;
  image_url: string;
  /** Optional preview clip (mp4/webm file URL or a YouTube link) that plays on hover. */
  video_url?: string | null;
  /** Short subtitle shown under the title, e.g. "Fragrance Brand". */
  description?: string | null;
  featured?: boolean;
  sort_order?: number;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio?: string | null;
  sort_order?: number;
};

export type ServiceItem = { title: string; image_url: string };
export type ClientItem = { name: string; logo_url: string };

export type SiteSettings = {
  /* Brand + SEO */
  site_title: string;
  site_description: string;
  accent_color: string;
  logo_text: string;
  logo_sub: string;
  logo_image: string;

  /* Navigation */
  nav_home: string;
  nav_projects: string;
  nav_about: string;
  nav_members: string;
  nav_contact: string;
  header_cta_label: string;
  mobile_menu_note: string;

  /* Hero */
  hero_label: string;
  hero_title: string;
  hero_intro: string;
  hero_cta_label: string;
  hero_image: string;
  hero_tags: string[];
  scroll_cue_label: string;

  /* Clients */
  show_clients: boolean;
  clients: ClientItem[];

  /* Services */
  show_services: boolean;
  services_eyebrow: string;
  services_heading: string;
  services_intro: string;
  services_link_label: string;
  service_items: ServiceItem[];

  /* Statement banner */
  show_banner: boolean;
  banner_text: string;
  banner_image: string;
  banner_tags: string[];

  /* Projects */
  projects_eyebrow: string;
  projects_heading: string;
  projects_link_label: string;
  projects_page_heading: string;
  projects_page_cta: string;

  /* About */
  about_eyebrow: string;
  about_heading: string;
  about_body: string;
  about_cta_label: string;
  about_image: string;
  about_script: string;

  /* Team */
  members_eyebrow: string;
  members_heading: string;
  members_intro: string;
  members_cta_label: string;

  /* Contact */
  contact_eyebrow: string;
  contact_heading: string;
  contact_intro: string;
  contact_cta_label: string;
  contact_image: string;
  contact_script: string;

  /* Contact form */
  form_title: string;
  form_intro: string;
  form_name_placeholder: string;
  form_email_placeholder: string;
  form_type_placeholder: string;
  form_types: string[];
  form_message_placeholder: string;
  form_submit_label: string;
  form_sending_label: string;
  form_success: string;
  whatsapp_number: string;
  whatsapp_greeting: string;

  /* Footer + contact details */
  footer_tagline: string;
  copyright_text: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  youtube: string;
  linkedin: string;
};
