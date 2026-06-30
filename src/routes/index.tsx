import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import projectSeo from "@/assets/project-seo.jpg";
import projectFrontend from "@/assets/project-frontend.jpg";
import projectBackend from "@/assets/project-backend.jpg";

const LINKEDIN = "https://ng.linkedin.com/in/george-abisola-victor-6ba49831a";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "George Abisola Victor | SEO & Web Performance Specialist" },
      {
        name: "description",
        content:
          "SEO and Web Performance consultant helping businesses grow with technical SEO, Core Web Vitals optimization, and conversion-focused websites.",
      },
      { name: "author", content: "George Abisola Victor" },
      {
        name: "keywords",
        content:
          "SEO Specialist, Web Performance, Core Web Vitals, Technical SEO, Conversion Optimization, GA4, Search Console, George Abisola Victor",
      },
      { property: "og:title", content: "SEO + Web Performance That Turns Websites Into Growth Engines" },
      {
        property: "og:description",
        content:
          "Data-driven SEO and performance optimization for businesses that want more visibility, speed, and conversions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "George Abisola Victor",
          jobTitle: "SEO & Web Performance Specialist",
          url: "/",
          sameAs: [LINKEDIN],
          knowsAbout: [
            "SEO Strategy",
            "Technical SEO",
            "Web Performance",
            "Core Web Vitals",
            "Conversion Optimization",
            "GA4",
            "Google Search Console",
          ],
        }),
      },
    ],
  }),
  component: Page,
});

// ---------- Data ----------
const services = [
  {
    icon: "🎯",
    title: "SEO Strategy",
    items: ["Keyword research", "Technical SEO audits", "Content optimization", "Search visibility growth"],
  },
  {
    icon: "⚡",
    title: "Web Performance",
    items: ["Core Web Vitals optimization", "Page speed improvements", "Mobile performance", "Frontend optimization"],
  },
  {
    icon: "📈",
    title: "Conversion Optimization",
    items: ["User journey analysis", "Landing page improvements", "Better calls-to-action", "A/B testing insights"],
  },
  {
    icon: "📊",
    title: "Analytics & Growth",
    items: ["Google Search Console insights", "GA4 tracking & reporting", "Data-driven decisions", "Growth dashboards"],
  },
];

const projects = [
  {
    name: "Business Website Optimization",
    industry: "B2B Services",
    role: "SEO & Performance Lead",
    problems: "Slow loading speed, weak SEO structure, low organic traffic.",
    results: "Rebuilt rendering pipeline, fixed schema, optimized images and Core Web Vitals.",
    image: projectSeo,
    metrics: [
      { k: "+70%", v: "Performance Score" },
      { k: "+40%", v: "Organic Visibility" },
      { k: "-50%", v: "Load Time" },
    ],
    live: "https://web.dev/measure/",
    ranking: "Ranking page 1 for 12 target keywords",
  },
  {
    name: "SaaS Marketing Site Revamp",
    industry: "SaaS / Productivity",
    role: "Technical SEO Consultant",
    problems: "Thin content, crawl issues, weak internal linking, Core Web Vitals failing on mobile.",
    results: "Restructured site architecture, fixed indexing, rewrote pillar content, tuned LCP and INP.",
    image: projectFrontend,
    metrics: [
      { k: "+128%", v: "Organic Clicks" },
      { k: "98", v: "Lighthouse SEO" },
      { k: "1.6s", v: "LCP (mobile)" },
    ],
    live: "https://pagespeed.web.dev/",
    ranking: "Top 3 results for 8 high-intent queries",
  },
  {
    name: "E-commerce Growth Engine",
    industry: "E-commerce / DTC",
    role: "SEO & CRO Specialist",
    problems: "High bounce rate, poor product page SEO, slow checkout, low conversion rate.",
    results: "Product schema, faster PDPs, refreshed CTAs and trust signals, GA4 funnel tracking.",
    image: projectBackend,
    metrics: [
      { k: "+62%", v: "Revenue / Visitor" },
      { k: "+3.4x", v: "Indexed Pages" },
      { k: "+85%", v: "Mobile Speed" },
    ],
    live: "https://search.google.com/search-console/about",
    ranking: "First-page rankings for 20+ product keywords",
  },
];

const framework = [
  { step: "01", title: "Audit", desc: "Technical crawl, Core Web Vitals, content gap and SERP analysis." },
  { step: "02", title: "Strategy", desc: "Keyword map, content roadmap, performance budget, KPIs." },
  { step: "03", title: "Optimization", desc: "Technical fixes, on-page SEO, schema, speed, internal linking." },
  { step: "04", title: "Measurement", desc: "GA4, Search Console, dashboards, monthly growth reporting." },
];

const dashboard = [
  { label: "Performance Score", value: 95 },
  { label: "SEO Score", value: 92 },
  { label: "Accessibility", value: 98 },
  { label: "Best Practices", value: 96 },
];

// ---------- Component ----------
function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="h-8 w-8 rounded-lg grid place-items-center bg-gradient-to-br from-accent to-[#1e40af] text-white shadow-glow">G</span>
            <span>George.SEO</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[
              ["Services", "#services"],
              ["Projects", "#projects"],
              ["Case Studies", "#case-studies"],
              ["Dashboard", "#dashboard"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <li key={h}><a href={h} className="hover:text-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
          <a href="#contact" className="hidden md:inline-flex btn-accent">Book a Consultation</a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={`hb md:hidden z-[60] relative h-10 w-10 grid place-items-center rounded-lg border border-white/10 bg-white/5 ${menuOpen ? "open" : ""}`}
          >
            <span className="block w-5 space-y-1.5">
              <span className="hb-line block h-0.5 bg-foreground" />
              <span className="hb-line block h-0.5 bg-foreground" />
              <span className="hb-line block h-0.5 bg-foreground" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-white/10 p-8 pt-24 transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col gap-5 text-lg">
          {[
            ["Services", "#services"],
            ["Projects", "#projects"],
            ["Case Studies", "#case-studies"],
            ["Dashboard", "#dashboard"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <li key={h}><a href={h} onClick={closeMenu} className="hover:text-accent">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" onClick={closeMenu} className="btn-accent mt-8 w-full">Book a Consultation</a>
      </aside>

      <main>
        {/* HERO */}
        <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1e40af]/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs glass border-accent/30">
                <span className="h-2 w-2 rounded-full bg-accent pulse-ring" />
                Available for SEO & Performance engagements
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                SEO + Web Performance That Turns Websites Into{" "}
                <span className="bg-gradient-to-r from-accent to-[#60a5fa] bg-clip-text text-transparent">Growth Engines</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                I help businesses improve search visibility, website speed, user experience, and conversions through data-driven SEO and performance optimization.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="btn-accent glow-accent">View My Work</a>
                <a href="#contact" className="btn-outline">Book a Consultation</a>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[
                  ["95+", "Avg. Lighthouse"],
                  ["+128%", "Organic Growth"],
                  ["20+", "Sites Optimized"],
                ].map(([k, v]) => (
                  <div key={v} className="glass rounded-xl p-4 text-center">
                    <dt className="text-2xl font-bold text-accent">{k}</dt>
                    <dd className="text-xs text-muted-foreground mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/40 to-transparent rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-3 card-hover">
                <img
                  src={profileImg}
                  alt="George Abisola Victor, SEO and Web Performance Specialist"
                  width={480}
                  height={480}
                  fetchPriority="high"
                  decoding="async"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">George</p>
                    <p className="text-sm font-semibold">SEO & Web Performance Specialist</p>
                  </div>
                  <span className="text-xs text-accent font-semibold">● Live</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">Services</p>
              <h2 className="h2">A full growth stack, from crawl to conversion.</h2>
              <p className="mt-4 text-muted-foreground">Strategy, technical execution, and measurement, in one engagement.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s, i) => (
                <div key={s.title} className="reveal glass card-hover rounded-2xl p-6" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="h-12 w-12 rounded-xl grid place-items-center text-2xl bg-accent/15 border border-accent/30">{s.icon}</div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-2"><span className="text-accent">→</span>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 relative">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="eyebrow">Live Projects</p>
                <h2 className="h2">Real systems. Real rankings. Real revenue.</h2>
              </div>
              <p className="text-muted-foreground max-w-md">Three recent engagements currently live and ranking on Google.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <article key={p.name} className="reveal glass rounded-2xl overflow-hidden card-hover flex flex-col" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="aspect-[16/10] overflow-hidden bg-card">
                    <img src={p.image} alt={`${p.name} preview`} loading="lazy" width={1280} height={800} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-accent/15 text-accent border border-accent/30">{p.industry}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{p.role}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Problem: </span>{p.problems}</p>
                      <p><span className="text-muted-foreground">Solution: </span>{p.results}</p>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {p.metrics.map((m) => (
                        <div key={m.v} className="rounded-lg bg-white/5 border border-white/10 p-2 text-center">
                          <p className="text-accent font-bold text-sm">{m.k}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{m.v}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-accent">🔍 {p.ranking}</p>
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="mt-5 text-sm text-accent hover:underline">View live insight →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES / FRAMEWORK */}
        <section id="case-studies" className="py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">SEO Case Studies</p>
              <h2 className="h2">The SEO Growth Framework.</h2>
              <p className="mt-4 text-muted-foreground">A repeatable process I use to turn underperforming sites into growth channels.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {framework.map((f, i) => (
                <div key={f.step} className="reveal relative glass rounded-2xl p-6 card-hover" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="text-5xl font-bold bg-gradient-to-br from-accent to-[#1e40af] bg-clip-text text-transparent">{f.step}</span>
                  <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {["Technical fixes", "Keyword opportunities", "Content improvements", "Ranking improvements"].map((t) => (
                <div key={t} className="glass rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                  <span className="text-accent">✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PERFORMANCE DASHBOARD */}
        <section id="dashboard" className="py-24 relative">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
            <div className="reveal text-center max-w-2xl mx-auto">
              <p className="eyebrow">Performance Dashboard</p>
              <h2 className="h2">Measured. Monitored. Improving.</h2>
              <p className="mt-4 text-muted-foreground">A snapshot of the scores I consistently ship for client sites.</p>
            </div>
            <div className="mt-12 reveal glass rounded-3xl p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {dashboard.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{d.label}</span>
                      <span className="text-xl font-bold text-accent">{d.value}/100</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-[#60a5fa] shadow-[0_0_20px_rgba(37,99,235,0.7)]"
                        style={{ width: `${d.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="glass rounded-3xl p-3">
                <img src={profileImg} alt="George Abisola Victor" width={400} height={400} className="rounded-2xl w-full aspect-square object-cover" />
              </div>
            </div>
            <div className="reveal">
              <p className="eyebrow">About</p>
              <h2 className="h2">Engineering visibility, speed, and growth.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                I combine technical SEO, frontend development, and performance optimization to help organizations build websites that attract visitors and convert them into customers.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My work sits at the intersection of engineering and marketing, so the sites I touch don't just rank, they load fast, feel great, and drive measurable business outcomes.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Technical SEO", "Schema, indexing, sitemaps"],
                  ["Core Web Vitals", "LCP, CLS, INP tuning"],
                  ["GA4 & GSC", "Insights and reporting"],
                  ["CRO", "Funnels and landing pages"],
                ].map(([t, d]) => (
                  <div key={t} className="glass rounded-xl p-4">
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="text-xs text-muted-foreground mt-1">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 relative">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <p className="eyebrow">Contact</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight reveal">
              Need a faster, more visible website?
            </h2>
            <p className="mt-5 text-muted-foreground text-lg reveal">
              Let's turn your site into a growth channel. Available for SEO retainers, performance audits, and consulting.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 reveal">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-accent glow-accent">Start a Project</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-outline">Connect on LinkedIn</a>
            </div>
            <div className="mt-12 reveal glass rounded-2xl p-6 grid sm:grid-cols-2 gap-5 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Name</p>
                <p className="font-semibold mt-1">George Abisola Victor</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Role</p>
                <p className="font-semibold mt-1">SEO & Web Performance Specialist</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                <a className="text-accent font-semibold mt-1 inline-block hover:underline" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  Visit LinkedIn Profile
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Availability</p>
                <p className="font-semibold text-accent mt-1">Open to new projects</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} George Abisola Victor. All rights reserved.</p>
          <p>Built for speed, visibility, and growth.</p>
        </div>
      </footer>
    </div>
  );
}
