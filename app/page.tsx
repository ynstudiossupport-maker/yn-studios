import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import { getMembers, getProjects, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, members, settings] = await Promise.all([getProjects(), getMembers(), getSiteSettings()]);

  return <>
    <Navigation />
    <main>
      <section id="home" className="hero" aria-label="Home">
        <div className="hero-media"><img src={settings.hero_image} alt="YN Studios creative work" /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">YN Studios</p>
          <h1>{settings.hero_title}</h1>
          <p className="hero-intro">{settings.hero_intro}</p>
          <div className="hero-services">{settings.services.map(service => <span key={service}>{service}</span>)}</div>
        </div>
      </section>

      <section id="projects" className="section projects-section" aria-label="Projects">
        <div className="section-head">
          <div><p className="eyebrow">Selected work</p><h2 className="section-title">{settings.projects_heading}</h2></div>
          <p className="section-copy">{settings.projects_intro}</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => <article className={`project project-${index % 3}`} key={project.id}>
            <div className="project-media"><img src={project.image_url} alt={project.title} loading={index < 2 ? "eager" : "lazy"} /></div>
            <div className="project-info"><div><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}</div><span>{project.category} / {project.year}</span></div>
          </article>)}
        </div>
      </section>

      <section id="about" className="about" aria-label="About YN Studios">
        <div className="about-image"><img src={settings.about_image} alt="YN Studios production" loading="lazy" /></div>
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>{settings.about_heading}</h2>
          <p className="about-body">{settings.about_body}</p>
          <div className="approach">{settings.approach.map((item, index) => <div className="approach-row" key={`${item}-${index}`}><span>0{index + 1}</span><span>{item}</span></div>)}</div>
        </div>
      </section>

      <section id="members" className="members" aria-label="YN Studios members">
        <div className="members-inner">
          <p className="eyebrow">The team</p>
          <h2 className="section-title">{settings.members_heading}</h2>
          <div className="members-grid">
            {members.map(member => <article className="member" key={member.id}>
              <div className="member-image"><img src={member.image_url} alt={member.name} loading="lazy" /></div>
              <div className="member-info"><h3>{member.name}</h3><p>{member.role}</p>{member.bio && <span>{member.bio}</span>}</div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-label="Contact YN Studios">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>{settings.contact_heading}</h2>
          <p>{settings.contact_intro}</p>
          <div className="contact-details">
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
            <span>{settings.location}</span>
            <span>{settings.instagram}</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
    <footer className="footer"><span>YN Studios</span><span>© {new Date().getFullYear()}</span></footer>
  </>;
}
