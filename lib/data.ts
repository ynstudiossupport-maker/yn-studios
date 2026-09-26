import { demoMembers, demoProjects } from "./demo-data";
import { defaultSettings } from "./default-settings";
import { getSupabase } from "./supabase";
import type { Member, Project, SiteSettings } from "./types";

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return demoProjects;
  const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
  if (error || !data?.length) return demoProjects;
  return data as Project[];
}

export async function getMembers(): Promise<Member[]> {
  const supabase = getSupabase();
  if (!supabase) return demoMembers;
  const { data, error } = await supabase.from("members").select("*").order("sort_order", { ascending: true });
  if (error || !data?.length) return demoMembers;
  return data as Member[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  if (!supabase) return defaultSettings;
  const { data, error } = await supabase.from("site_settings").select("content").eq("id", "default").maybeSingle();
  if (error || !data?.content) return defaultSettings;
  return { ...defaultSettings, ...(data.content as Partial<SiteSettings>) };
}
