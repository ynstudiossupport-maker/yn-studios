import type { Metadata } from "next";
import { ProjectCard } from "@/components/Cards";
import { getProjects, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return { title: `${s.projects_page_heading} — ${s.logo_text} ${s.logo_sub}`.trim() };
}

const norm = (v: string) => v.trim().toLowerCase();

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const [projects, s, params] = await Promise.all([getProjects(), getSiteSettings(), searchParams]);

  const requested = Array.isArray(params.category) ? params.category[0] : params.category;

  // Filter buttons: the service categories first (in the order you set them), then any other project categories.
  const categories: string[] = [];
  const add = (c: string) => {
    const label = c.trim();
    if (label && !categories.some((x) => norm(x) === norm(label))) categories.push(label);
  };
  s.service_items.forEach((item) => add(item.category));
  projects.forEach((project) => add(project.category));

  const active = requested ? categories.find((c) => norm(c) === norm(requested)) ?? requested : "";
  const visible = active ? projects.filter((project) => norm(project.category) === norm(active)) : projects;

  return (
    <main className="subpage">
      <div className="section-head">
        <div>
          {s.projects_eyebrow && <p className="eyebrow">{s.projects_eyebrow}</p>}
          <h1>{active || s.projects_page_heading}</h1>
        </div>
        {s.projects_page_cta && <a className="text-link" href="/#contact">{s.projects_page_cta}</a>}
      </div>

      {categories.length > 0 && (
        <nav className="filter-bar" aria-label="Filter projects by category">
          <a href="/projects" className={!active ? "filter active" : "filter"} aria-current={!active ? "true" : undefined}>
            {s.projects_filter_all}
          </a>
          {categories.map((c) => (
            <a
              key={c}
              href={`/projects?category=${encodeURIComponent(c)}`}
              className={norm(c) === norm(active) ? "filter active" : "filter"}
              aria-current={norm(c) === norm(active) ? "true" : undefined}
            >
              {c}
            </a>
          ))}
        </nav>
      )}

      {visible.length > 0 ? (
        <div className="card-grid">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index < 4} linkLabel={s.project_link_label} />
          ))}
        </div>
      ) : (
        <p className="empty-note">{s.projects_empty_text}</p>
      )}
    </main>
  );
}
