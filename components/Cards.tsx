import type { Member } from "@/lib/types";

export { default as ProjectCard } from "./ProjectCard";

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="member-card">
      <div className="member-card-media">
        <img src={member.image_url} alt={member.name} loading="lazy" />
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  );
}
