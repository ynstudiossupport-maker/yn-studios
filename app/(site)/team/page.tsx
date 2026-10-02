import type { Metadata } from "next";
import { MemberCard } from "@/components/Cards";
import { getMembers, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return { title: `${s.members_heading.replace(/\s+/g, " ")} — ${s.logo_text} ${s.logo_sub}`.trim() };
}

export default async function TeamPage() {
  const [members, s] = await Promise.all([getMembers(), getSiteSettings()]);
  return (
    <main className="subpage">
      <div className="section-head">
        <div>
          {s.members_eyebrow && <p className="eyebrow">{s.members_eyebrow}</p>}
          <h1 className="ml">{s.members_heading}</h1>
        </div>
        {s.members_intro && <p className="section-lead">{s.members_intro}</p>}
      </div>
      <div className="card-grid">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </main>
  );
}
