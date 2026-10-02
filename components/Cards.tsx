import type { Member, Project } from "@/lib/types";
import { Play } from "./Icons";

const isVideo = (category: string) => /reel|video|film/i.test(category);

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <div className="project-card-media">
        <img src={project.image_url} alt={project.title} loading={priority ? "eager" : "lazy"} />
        {isVideo(project.category) && (
          <span className="play-badge" aria-label="Video project">
            <Play size={16} />
          </span>
        )}
      </div>
      <h3>{project.title}</h3>
      {project.description && <p>{project.description}</p>}
    </article>
  );
}

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
