import type { Member, Project } from "./types";

export const demoProjects: Project[] = [
  {
    id: "1",
    title: "Product Photography",
    category: "Photography",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85",
    description: "Fragrance Brand",
    featured: true,
    sort_order: 1
  },
  {
    id: "2",
    title: "Reel Campaign",
    category: "Reels",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
    description: "Lifestyle Brand",
    featured: true,
    sort_order: 2
  },
  {
    id: "3",
    title: "Website Development",
    category: "Websites",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=85",
    description: "Interior Studio",
    featured: true,
    sort_order: 3
  },
  {
    id: "4",
    title: "Social Media Ads",
    category: "Meta Ads",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=85",
    description: "D2C Brand",
    featured: true,
    sort_order: 4
  },
  {
    id: "5",
    title: "Restaurant Stories",
    category: "Reels",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    description: "Hospitality",
    featured: false,
    sort_order: 5
  },
  {
    id: "6",
    title: "Resort Promotion",
    category: "Photography",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
    description: "Resort & Hospitality",
    featured: false,
    sort_order: 6
  }
];

export const demoMembers: Member[] = [
  {
    id: "1",
    name: "Yash Patil",
    role: "Founder & Strategist",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",
    bio: "Strategy, client direction and growth.",
    sort_order: 1
  },
  {
    id: "2",
    name: "Rohan",
    role: "Content Creator",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
    bio: "Content, photography and creative execution.",
    sort_order: 2
  },
  {
    id: "3",
    name: "Sahil",
    role: "Web Developer",
    image_url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=85",
    bio: "Web experiences and technical direction.",
    sort_order: 3
  },
  {
    id: "4",
    name: "Aditya",
    role: "Video Editor",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
    bio: "Production, editing and visual storytelling.",
    sort_order: 4
  }
];
