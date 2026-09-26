import type { Member, Project } from "./types";

export const demoProjects: Project[] = [
  {
    id: "1",
    title: "Automotive Campaign",
    category: "Photography",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    description: "Campaign photography and short-form content.",
    featured: true,
    sort_order: 1
  },
  {
    id: "2",
    title: "Restaurant Stories",
    category: "Reels",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=85",
    description: "Food, atmosphere and social-first content.",
    featured: true,
    sort_order: 2
  },
  {
    id: "3",
    title: "Resort Promotion",
    category: "Photography",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    description: "Visual identity and campaign assets for hospitality.",
    featured: true,
    sort_order: 3
  },
  {
    id: "4",
    title: "Brand Film",
    category: "Reels",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85",
    description: "A short visual story built for digital.",
    featured: false,
    sort_order: 4
  },
  {
    id: "5",
    title: "Digital Presence",
    category: "Websites",
    year: 2026,
    image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=85",
    description: "Strategy, design and development.",
    featured: false,
    sort_order: 5
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
    name: "Aditya",
    role: "Videographer & Editor",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
    bio: "Production, editing and visual storytelling.",
    sort_order: 2
  },
  {
    id: "3",
    name: "Rohan",
    role: "Web Developer",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
    bio: "Web experiences and technical direction.",
    sort_order: 3
  },
  {
    id: "4",
    name: "Sahil",
    role: "Content Creator",
    image_url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=85",
    bio: "Content, photography and creative execution.",
    sort_order: 4
  }
];
