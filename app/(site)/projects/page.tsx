import type { Metadata } from "next";
import { ProjectCard } from "@/components/Cards";
import { getProjects, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return { title: `${s.projects_page_heading} — ${s.logo_text} ${s.logo_sub}`.trim() };
}

export default async function ProjectsPage() {
  const [projects, s] = await Promise.all([getProjects(), getSiteSettings()]);
  return (
    <main className="subpage">
      <div className="section-head">
        <div>
          {s.projects_eyebrow && <p className="eyebrow">{s.projects_eyebrow}</p>}
          <h1>{s.projects_page_heading}</h1>
        </div>
        {s.projects_page_cta && <a className="text-link" href="/#contact">{s.projects_page_cta}</a>}
      </div>
      <div className="card-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index < 4} linkLabel={s.project_link_label} />
        ))}
      </div>
    </main>
  );
}
