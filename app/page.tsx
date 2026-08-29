const projects = [
  {
    title: "BroTax",
    subtitle: "LINE OA Expense & Tax Tracker",
    type: "Client Project",
    description: "A LINE-native financial workflow for Thai SMEs and freelancers. Users can record income and expenses, attach evidence to Google Drive, review monthly summaries, and monitor accumulated revenue for VAT planning.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "LINE LIFF", "Messaging API", "Google OAuth", "Drive API"],
    highlights: ["LINE LIFF authentication", "Messaging API webhook verification", "Google OAuth & Drive integration", "Access control for trial / paid / expired users", "Admin and audit-log modules"],
    href: null,
  },
  {
    title: "Restaurant",
    subtitle: "POS & QR Ordering Management System",
    type: "Freelance Project",
    description: "A full-stack restaurant operations system for a single restaurant. Customers scan a table QR code to order while staff manage order queues, kitchen workflow, billing, promotions, employees, permissions, reports and audit logs.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "JWT", "Cloudinary", "Docker"],
    highlights: ["QR ordering linked to table tokens", "Kitchen and cashier workflows", "Role-based permissions", "VAT, service charge and promotion logic", "Sales reporting and audit logging"],
    href: "https://github.com/NinePK/Restaurant",
  },
  {
    title: "Internship Portal",
    subtitle: "University Internship Management Platform",
    type: "Capstone Project",
    description: "A university internship management platform for students and academic advisors. The backend exposes REST APIs for internship records, companies, reports, evaluations, weekly records and administrative reference data.",
    stack: ["Go", "Go Fiber", "REST API", "GORM", "Database Design"],
    highlights: ["Modular controller / router / model architecture", "Student and advisor workflows", "Company and internship records", "Reporting and evaluation modules", "Designed for 100+ students and advisors"],
    href: "https://github.com/NinePK/Back_coop",
  },
  {
    title: "TESA Top Gun",
    subtitle: "MQTT Embedded-System Backend",
    type: "Competition Project · Silver Rank",
    description: "A containerized IoT backend developed under competition time constraints for TESA Top Gun Rally 2023, using MQTT-oriented data flow, FastAPI, MongoDB and Dockerized services.",
    stack: ["Python", "FastAPI", "MQTT", "MongoDB", "Docker"],
    highlights: ["IoT telemetry ingestion", "FastAPI sensor endpoints", "Async MongoDB persistence", "Dockerized services", "Timed team engineering competition"],
    href: "https://github.com/NinePK/MQTT-TEST",
  },
  {
    title: "Electric Cost",
    subtitle: "ESP32 Electricity Cost Monitoring",
    type: "Academic Project",
    description: "An IoT coursework project that processes voltage and current readings from an ESP32-oriented setup, persists measurements, calculates estimated electricity cost, and exposes API/dashboard services.",
    stack: ["ESP32", "Python", "FastAPI", "MongoDB", "Streamlit", "Docker"],
    highlights: ["Voltage and current processing", "Power and cost calculation", "FastAPI + MongoDB", "Streamlit dashboard", "Docker Compose environment"],
    href: "https://github.com/NinePK/Electric_cost",
  },
];

const skills = {
  Frontend: ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js", "Nuxt.js", "Tailwind CSS"],
  Backend: ["Node.js", "Go", "Go Fiber", "Python", "FastAPI", "Java", "Spring Boot", "REST APIs"],
  Data: ["PostgreSQL", "SQL", "Supabase", "Prisma", "MongoDB", "Firebase", "InfluxDB", "Data Modeling"],
  Platform: ["Docker", "Git", "CI/CD", "Google Cloud", "AWS", "n8n", "Testing", "Deployment"],
};

const experience = [
  ["2025 — 2026", "Full Stack Developer Intern", "MFEC Public Company Limited", "Built internal software across AI/RAG applications and project-audit automation, contributing from requirement analysis through development, testing, debugging and deployment."],
  ["2024 — 2026", "Freelance Software Developer", "Independent", "Delivered full-stack business systems and client work spanning restaurant operations, LINE OA financial workflows, API integrations and production improvements."],
  ["2024", "Capstone Project Developer", "University of Phayao", "Developed an internship management platform with a Go backend, REST APIs and database integration for students and academic advisors."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="logo" href="#top">PK<span>.</span></a>
        <nav>
          <a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
        <a className="resume" href="/Pakapop-Khiawkhum-Resume.pdf" target="_blank">Résumé <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow"><i /> Full Stack Developer · Software Engineer</p>
        <h1>Building software<br/><em>from requirement to production.</em></h1>
        <div className="heroText">
          <p>I design and build web applications, APIs, automation workflows and connected systems — across client work, internal enterprise tools, university systems and engineering competitions.</p>
          <div className="actions"><a className="primary" href="#work">Explore my work <Arrow /></a><a href="https://github.com/NinePK" target="_blank">GitHub <Arrow /></a></div>
        </div>
        <div className="keywords"><span>WEB</span><span>API</span><span>DATA</span><span>AUTOMATION</span><span>IoT</span></div>
      </section>

      <section className="section" id="about">
        <div className="label">01 / About</div>
        <div className="twoCol"><h2>I build practical systems,<br/>not just interfaces.</h2><div className="copy"><p>My work sits between product requirements and implementation. I enjoy turning operational problems into maintainable software — shaping data models, APIs, permissions, integrations and user flows.</p><p>My recent work spans Next.js business applications, LINE OA integrations, PostgreSQL-backed systems, Go APIs, AI/LLM workflows and Dockerized IoT backends.</p></div></div>
      </section>

      <section className="section" id="work">
        <div className="sectionHead"><div className="label">02 / Selected Work</div><h2>Projects with real engineering depth.</h2></div>
        <div className="projects">
          {projects.map((p, i) => <article className="project" key={p.title}>
            <div className="meta"><span>0{i+1}</span><span>{p.type}</span></div>
            <div className="projectTop"><div><h3>{p.title}</h3><strong>{p.subtitle}</strong></div><p>{p.description}</p></div>
            <div className="details"><div><b>Engineering highlights</b><ul>{p.highlights.map(h => <li key={h}>{h}</li>)}</ul></div><div><b>Stack</b><div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div></div></div>
            <div className="projectFoot"><span>{p.href ? "Public repository" : "Commercial source code is private"}</span>{p.href ? <a href={p.href} target="_blank">View repository <Arrow /></a> : <span>Private source</span>}</div>
          </article>)}
        </div>
      </section>

      <section className="section" id="experience">
        <div className="sectionHead"><div className="label">03 / Experience</div><h2>Experience across product delivery.</h2></div>
        <div className="timeline">{experience.map(([period, role, company, body]) => <article key={role}><small>{period}</small><div><h3>{role}</h3><span>{company}</span></div><p>{body}</p></article>)}</div>
      </section>

      <section className="section">
        <div className="sectionHead"><div className="label">04 / Toolkit</div><h2>Technologies I work with.</h2></div>
        <div className="skillGrid">{Object.entries(skills).map(([group, items]) => <div key={group}><h3>{group}</h3>{items.map(item => <span key={item}>{item}</span>)}</div>)}</div>
      </section>

      <section className="contact" id="contact">
        <div><div className="label">05 / Contact</div><h2>Have a role or project<br/>worth building?</h2></div>
        <div className="contactRight"><p>I&apos;m open to software engineering opportunities and projects where I can contribute across implementation, integration and problem solving.</p><a className="email" href="mailto:ninepakapop@gmail.com">ninepakapop@gmail.com <Arrow /></a><div className="links"><a href="https://github.com/NinePK" target="_blank">GitHub</a><a href="https://www.linkedin.com/in/pakapop-k" target="_blank">LinkedIn</a><a href="/Pakapop-Khiawkhum-Resume.pdf" target="_blank">Résumé</a></div></div>
      </section>
      <footer><span>© 2026 Pakapop Khiawkhum</span><span>Full Stack Developer · Thailand</span></footer>
    </main>
  );
}
