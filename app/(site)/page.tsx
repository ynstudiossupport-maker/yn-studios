import Carousel from "@/components/Carousel";
import ContactDialog from "@/components/ContactDialog";
import { MemberCard, ProjectCard } from "@/components/Cards";
import { ArrowDown } from "@/components/Icons";
import Logo from "@/components/Logo";
import Marquee from "@/components/Marquee";
import { getMembers, getProjects, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, members, s] = await Promise.all([getProjects(), getMembers(), getSiteSettings()]);

  const featured = projects.filter((project) => project.featured);
  const shown = featured.length ? featured : projects.slice(0, 8);
  const clients = s.clients.filter((client) => client.name || client.logo_url);

  return (
    <main>
      {/* Hero */}
      <section id="home" className="hero" aria-label="Home">
        <div className="hero-media">
          {s.hero_image && <img src={s.hero_image} alt="" fetchPriority="high" />}
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          {s.hero_label && <p className="hero-label">{s.hero_label}</p>}
          <h1 className="ml">{s.hero_title}</h1>
          {s.hero_intro && <p className="hero-intro ml">{s.hero_intro}</p>}
          {s.hero_cta_label && (
            <a className="btn btn-outline" href="#contact">
              {s.hero_cta_label}
            </a>
          )}
        </div>
        {s.hero_tags.length > 0 && (
          <ul className="hero-tags" aria-label="What we do">
            {s.hero_tags.map((tag, i) => (
              <li key={`${tag}-${i}`}>{tag}</li>
            ))}
          </ul>
        )}
        <a className="scroll-cue" href="#services">
          <ArrowDown />
          {s.scroll_cue_label && <span>{s.scroll_cue_label}</span>}
        </a>
      </section>

      {/* Clients: continuously sliding marquee (right to left) */}
      {s.show_clients && clients.length > 0 && (
        <section className="clients" aria-label="Brands we have worked with">
          <p className="sr-only">{clients.map((client) => client.name).filter(Boolean).join(", ")}</p>
          <div aria-hidden>
            <Marquee
              items={clients}
              render={(client) => (client.logo_url ? <img src={client.logo_url} alt="" loading="lazy" /> : client.name)}
            />
          </div>
        </section>
      )}

      {/* Services: compact, still pills; each one opens its projects */}
      {s.show_services && (
        <section id="services" className="services" aria-label={s.services_heading || "Services"}>
          <div className="section-head">
            <div>
              {s.services_eyebrow && <p className="eyebrow">{s.services_eyebrow}</p>}
              <h2>{s.services_heading}</h2>
            </div>
            {s.services_intro && <p className="section-lead">{s.services_intro}</p>}
            {s.services_link_label && (
              <a className="text-link" href="/projects">
                {s.services_link_label}
              </a>
            )}
          </div>
          {s.service_items.length > 0 && (
            <ul className="service-list">
              {s.service_items.map((item, i) => (
                <li key={`${item.title}-${i}`}>
                  <a className="service-chip" href={item.category ? `/projects?category=${encodeURIComponent(item.category)}` : "/projects"}>
                    {item.image_url && <img src={item.image_url} alt="" loading="lazy" />}
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Statement banner */}
      {s.show_banner && (
        <section className="banner" aria-label="Our approach">
          {s.banner_image && <img src={s.banner_image} alt="" loading="lazy" />}
          <div className="banner-shade" />
          <p className="banner-text ml">{s.banner_text}</p>
          <span className="banner-logo logo" aria-hidden>
            <Logo text={s.logo_text} sub={s.logo_sub} image={s.logo_image} />
          </span>
          {s.banner_tags.length > 0 && (
            <ul className="banner-tags">
              {s.banner_tags.map((tag, i) => (
                <li key={`${tag}-${i}`}>{tag}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Projects */}
      <section id="projects" className="projects" aria-label={s.projects_heading || "Projects"}>
        <div className="section-head">
          <div>
            {s.projects_eyebrow && <p className="eyebrow">{s.projects_eyebrow}</p>}
            <h2>{s.projects_heading}</h2>
          </div>
          {s.projects_link_label && (
            <a className="text-link" href="/projects">
              {s.projects_link_label}
            </a>
          )}
        </div>
        <Carousel label={s.projects_heading || "Projects"} className="projects-carousel">
          {shown.map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index < 2} linkLabel={s.project_link_label} />
          ))}
        </Carousel>
      </section>

      {/* About */}
      <section id="about" className="split about" aria-label={s.nav_about}>
        <div className="split-copy">
          {s.about_eyebrow && <p className="eyebrow">{s.about_eyebrow}</p>}
          <h2 className="ml">{s.about_heading}</h2>
          <p className="split-body">{s.about_body}</p>
          {s.about_cta_label && (
            <a className="btn btn-outline" href="#members">
              {s.about_cta_label}
            </a>
          )}
        </div>
        <div className="split-media">
          {s.about_image && <img src={s.about_image} alt="" loading="lazy" />}
          {s.about_script && <p className="script ml" aria-hidden>{s.about_script}</p>}
        </div>
      </section>

      {/* Team */}
      <section id="members" className="team" aria-label={s.nav_members}>
        <div className="team-copy">
          {s.members_eyebrow && <p className="eyebrow">{s.members_eyebrow}</p>}
          <h2 className="ml">{s.members_heading}</h2>
          <p className="split-body">{s.members_intro}</p>
          {s.members_cta_label && (
            <a className="btn btn-outline" href="/team">
              {s.members_cta_label}
            </a>
          )}
        </div>
        <Carousel label={s.nav_members} arrows className="team-carousel">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </Carousel>
      </section>

      {/* Contact */}
      <section id="contact" className="split contact" aria-label={s.nav_contact}>
        <div className="split-copy">
          {s.contact_eyebrow && <p className="eyebrow">{s.contact_eyebrow}</p>}
          <h2 className="ml">{s.contact_heading}</h2>
          <p className="split-body ml">{s.contact_intro}</p>
          <ContactDialog
            label={s.contact_cta_label}
            title={s.form_title}
            eyebrow={s.contact_eyebrow}
            intro={s.form_intro}
            email={s.email}
            phone={s.phone}
            location={s.location}
            form={{
              namePlaceholder: s.form_name_placeholder,
              emailPlaceholder: s.form_email_placeholder,
              typePlaceholder: s.form_type_placeholder,
              types: s.form_types,
              messagePlaceholder: s.form_message_placeholder,
              submitLabel: s.form_submit_label,
              sendingLabel: s.form_sending_label,
              success: s.form_success,
              whatsappNumber: s.whatsapp_number || s.phone,
              whatsappGreeting: s.whatsapp_greeting,
            }}
          />
        </div>
        <div className="split-media">
          {s.contact_image && <img src={s.contact_image} alt="" loading="lazy" />}
          {s.contact_script && <p className="script script-small ml" aria-hidden>{s.contact_script}</p>}
        </div>
      </section>
    </main>
  );
}
