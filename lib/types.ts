export type Project = {
  id: string;
  title: string;
  category: string;
  year: number;
  image_url: string;
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

export type SiteSettings = {
  hero_title: string;
  hero_intro: string;
  hero_image: string;
  services: string[];
  projects_heading: string;
  projects_intro: string;
  about_heading: string;
  about_body: string;
  about_image: string;
  approach: string[];
  members_heading: string;
  contact_heading: string;
  contact_intro: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
};
