import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import projectBackend from "@/assets/project-backend.jpg";
import projectSeo from "@/assets/project-seo.jpg";
import projectFrontend from "@/assets/project-frontend.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "George Abisola Victor — Fullstack Developer | SEO & Web Performance Specialist" },
      {
        name: "description",
        content:
          "George Abisola Victor builds high-performance, SEO-optimized fullstack web applications. Frontend, backend, technical SEO, and performance engineering for real-world results.",
      },
      { name: "author", content: "George Abisola Victor" },
      { name: "keywords", content: "Fullstack Developer, SEO Specialist, Web Performance, React, Node.js, Technical SEO, Frontend, Backend, George Abisola Victor" },
      { property: "og:title", content: "George Abisola Victor — Fullstack Developer & SEO Specialist" },
      { property: "og:description", content: "Fullstack development, SEO, and web performance engineering portfolio." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "George Abisola Victor — Fullstack Developer & SEO Specialist" },
      { name: "twitter:description", content: "Fullstack development, SEO, and web performance engineering portfolio." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "George Abisola Victor",
          jobTitle: "Fullstack Developer | SEO & Web Performance Specialist",
          url: "/",
          sameAs: ["https://ng.linkedin.com/in/george-abisola-victor-6ba49831a"],
          knowsAbout: [
            "Fullstack Development",
            "React",
            "Node.js",
            "SEO Optimization",
            "Technical SEO",
            "Web Performance",
            "Content Strategy",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const skills = [
  "Fullstack Development",
  "Frontend (React / JavaScript)",
  "Backend Development",
  "APIs & Databases",
  "SEO Optimization",
  "Technical SEO",
  "Web Performance",
  "Content Strategy",
  "Copywriting",
  "Analytics (Google Tools)",
];

const projects = [
  {
    title: "Auth & API Platform",
    tag: "Backend",
    description:
      "JWT-based authentication system with role-based access, REST API endpoints, PostgreSQL persistence, rate limiting, and audit logging. Built with Node.js and Express.",
    stack: ["Node.js", "Express", "PostgreSQL", "JWT", "Zod"],
    image: projectBackend,
  },
  {
    title: "SEO Growth Engine",
    tag: "SEO",
    description:
      "SEO-optimized content site with keyword-mapped URL structure, structured data, optimized metadata, image lazy-loading, and Core Web Vitals tuned to 95+ Lighthouse.",
    stack: ["Next.js", "Schema.org", "Sitemap", "GA4", "Search Console"],
    image: projectSeo,
  },
  {
    title: "SaaS Dashboard UI",
    tag: "Frontend",
    description:
      "Responsive analytics dashboard with accessible components, dark theme system, smooth transitions, and an opinionated design system built on React and Tailwind.",
    stack: ["React", "TypeScript", "Tailwind", "Recharts"],
    image: projectFrontend,
  },
];

function Portfolio() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border"
      >
        <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground font-bold">
              G
            </span>
            <span className="text-foreground">George.dev</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {["About", "Skills", "Projects", "Why Me", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-foreground transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition"
          >
            Hire Me
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden hb ${menuOpen ? "open" : ""} relative h-10 w-10 grid place-items-center rounded-md border border-border`}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="hb-line block h-0.5 w-6 bg-foreground" />
              <span className="hb-line block h-0.5 w-6 bg-foreground" />
              <span className="hb-line block h-0.5 w-6 bg-foreground" />
            </span>
          </button>
        </nav>

        {/* Mobile slide menu */}
        <div
          className={`mobile-menu md:hidden fixed inset-y-0 right-0 top-16 z-40 w-72 bg-card border-l border-border p-6 ${menuOpen ? "open" : ""}`}
        >
          <ul className="flex flex-col gap-1 text-lg">
            {["About", "Skills", "Projects", "Why Me", "Contact"].map((l) => (
              <li key={l}>
                <a
                  onClick={close}
                  href={`#${l.toLowerCase().replace(" ", "-")}`}
                  className="block rounded-md px-3 py-3 hover:bg-muted transition"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            onClick={close}
            href="#contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground"
          >
            Hire Me
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="grid-bg relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32 grid gap-12 md:grid-cols-[1.2fr_1fr] items-center">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent pulse-ring" />
                Available for fullstack & SEO roles
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
                George Abisola Victor
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-balance">
                Fullstack Developer{" "}
                <span className="text-accent">|</span> SEO & Web Performance Specialist
              </p>
              <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
                I build high-performance, SEO-optimized web experiences that combine
                frontend and backend development to create scalable digital products
                that are fast, discoverable, and user-focused.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-medium text-accent-foreground hover:opacity-90 transition glow-accent"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-5 py-3 font-medium text-foreground hover:border-accent hover:text-accent transition"
                >
                  Contact Me
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-3 max-w-md gap-4 text-sm">
                {[
                  { k: "100", v: "Lighthouse" },
                  { k: "10+", v: "Skills" },
                  { k: "3+", v: "Projects" },
                ].map((s) => (
                  <div key={s.v} className="rounded-lg border border-border bg-card p-3">
                    <dt className="text-accent text-xl font-semibold">{s.k}</dt>
                    <dd className="text-muted-foreground text-xs">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal relative mx-auto">
              <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-3xl" />
              <div className="relative rounded-3xl border border-border bg-card p-2 shadow-2xl card-hover">
                <img
                  src={profileImg}
                  alt="Portrait of George Abisola Victor, fullstack developer"
                  width={480}
                  height={480}
                  className="rounded-2xl w-72 sm:w-80 md:w-96 h-auto object-cover"
                />
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-background px-3 py-2 text-xs shadow-card">
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <span className="text-accent font-medium">Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 sm:py-28 border-t border-border relative overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
            <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] items-start">
              <div className="reveal md:sticky md:top-24">
                <p className="text-accent text-sm font-medium tracking-wider uppercase">About</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                  Engineering for visibility, speed, and results.
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  A fullstack developer building web systems that rank, load fast,
                  and convert — from database to design system.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { k: "2+", v: "Years coding" },
                    { k: "95+", v: "Lighthouse avg" },
                    { k: "10+", v: "Tech stack" },
                    { k: "100%", v: "Remote ready" },
                  ].map((s) => (
                    <div key={s.v} className="rounded-lg border border-border bg-card p-3">
                      <p className="text-accent text-lg font-semibold">{s.k}</p>
                      <p className="text-xs text-muted-foreground">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal space-y-6">
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;m <span className="text-foreground font-medium">George Abisola Victor</span>, a
                    fullstack developer focused on building high-performance,
                    SEO-optimized web experiences. I work across frontend and backend
                    systems to ship digital products that are fast, scalable, and
                    structured for real-world use.
                  </p>
                  <p>
                    I combine engineering with content strategy, analytics, and
                    copywriting — so the sites I build aren&apos;t just well-coded,
                    they&apos;re discoverable, understandable, and conversion-focused.
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2 pt-2">
                  {[
                    { t: "Fullstack engineering", d: "React, Node.js, REST APIs, PostgreSQL." },
                    { t: "Technical SEO", d: "Schema, metadata, sitemaps, indexing." },
                    { t: "Web performance", d: "Core Web Vitals, caching, lazy-loading." },
                    { t: "Content & analytics", d: "Copy, GA4, Search Console insights." },
                  ].map((c) => (
                    <li
                      key={c.t}
                      className="card-hover rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 grid h-6 w-6 place-items-center rounded-md bg-accent/15 text-accent text-xs font-bold">
                          ✓
                        </span>
                        <div>
                          <p className="font-medium text-foreground text-sm">{c.t}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.d}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Currently</p>
                    <p className="font-medium mt-1">Open to fullstack & SEO roles</p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition"
                  >
                    Get in touch →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-20 sm:py-28 border-t border-border bg-[color:var(--surface)]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal max-w-2xl">
              <p className="text-accent text-sm font-medium tracking-wider uppercase">Skills</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                A toolkit built for shipping production systems.
              </h2>
            </div>
            <ul className="mt-12 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {skills.map((s, i) => (
                <li
                  key={s}
                  className="reveal card-hover rounded-xl border border-border bg-card p-4 text-sm font-medium"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="block h-1.5 w-6 rounded-full bg-accent mb-3" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-accent text-sm font-medium tracking-wider uppercase">
                  Projects
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                  Real systems. Real outcomes.
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Three focus areas — backend logic, SEO growth, and frontend UX —
                shipped end-to-end.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article
                  key={p.title}
                  className="reveal card-hover group rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-border">
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.tag} project preview`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4 grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <span className="text-xs font-medium text-accent border border-accent/40 rounded-full px-2 py-0.5">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                      {p.stack.map((t) => (
                        <li
                          key={t}
                          className="text-xs text-muted-foreground border border-border rounded-md px-2 py-1 bg-background/40"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY HIRE ME */}
        <section
          id="why-me"
          className="py-20 sm:py-28 border-t border-border bg-[color:var(--surface)]"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-12 md:grid-cols-[1fr_1.2fr] items-start">
            <div className="reveal">
              <p className="text-accent text-sm font-medium tracking-wider uppercase">
                Why hire me
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                I build web systems that don't just look good — they perform.
              </h2>
            </div>
            <div className="reveal grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Fullstack execution",
                  d: "Confident across frontend, backend, APIs, and databases — end-to-end ownership.",
                },
                {
                  t: "SEO-first thinking",
                  d: "Technical SEO, metadata, schema, and content structure built in, not bolted on.",
                },
                {
                  t: "Performance engineering",
                  d: "Core Web Vitals, lazy-loading, caching, and rendering strategies that ship 90+ scores.",
                },
                {
                  t: "Business outcomes",
                  d: "Analytics, copy, and UX aligned to turn traffic into real-world results.",
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="card-hover rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-semibold">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 sm:py-28 border-t border-border">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center reveal">
            <p className="text-accent text-sm font-medium tracking-wider uppercase">
              Contact
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              Let's build something that performs.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Open to fullstack developer roles, SEO engagements, and performance
              consulting. Reach out and let's talk.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://ng.linkedin.com/in/george-abisola-victor-6ba49831a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90 transition glow-accent"
              >
                Connect on LinkedIn
              </a>
              <a
                href="https://ng.linkedin.com/in/george-abisola-victor-6ba49831a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium hover:border-accent hover:text-accent transition"
              >
                Message George
              </a>
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-left grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </p>
                <p className="mt-1 font-medium">George Abisola Victor</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Role
                </p>
                <p className="mt-1 font-medium">
                  Fullstack Developer | SEO & Web Performance
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  LinkedIn
                </p>
                <a
                  href="https://ng.linkedin.com/in/george-abisola-victor-6ba49831a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  Visit LinkedIn Profile
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Availability
                </p>
                <p className="mt-1 font-medium text-accent">Open to opportunities</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} George Abisola Victor. All rights reserved.</p>
          <p>Built with performance and SEO in mind.</p>
        </div>
      </footer>
    </div>
  );
}
