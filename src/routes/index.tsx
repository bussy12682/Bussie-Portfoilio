import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import projectSeo from "../../pic pic 1.jpeg";
import projectBackend from "../../pic pic 2.jpeg";

type ProjectTab = "caseStudy" | "dashboard" | "sqlQuery";

type Project = {
  name: string;
  tools: string[];
  image: string;
  summary: string;
  caseStudy: {
    intro: string;
    body: string[];
    focus: string[];
  };
  dashboard: {
    metrics: Array<{ label: string; value: string }>;
  };
  sqlQuery: {
    query: string;
  };
};

const portfolioProjects: Project[] = [
  {
    name: "Budget vs Actual Financial Analysis",
    tools: ["SQL", "Power BI", "Excel"],
    image: projectBackend,
    summary: "Variance reporting connecting budget planning with business performance.",
    caseStudy: {
      intro:
        "Budget vs Actual Financial Analysis compares planned and realized business performance, helping the organization understand variance across cost, revenue, and operational activity.",
      body: [
        "The analysis translates financial movements into business language so leadership can quickly see where performance is above or below expectation and respond with better decisions.",
      ],
      focus: [
        "Budget vs actual variance",
        "Revenue and expense movement",
        "Operational decision support",
      ],
    },
    dashboard: {
      metrics: [
        { label: "Revenue", value: "$46.2K" },
        { label: "Expenses", value: "$31.8K" },
        { label: "Variance", value: "+$4.4K" },
        { label: "Performance", value: "Above Plan" },
      ],
    },
    sqlQuery: {
      query: `SELECT month,
       budget_amount,
       actual_amount,
       actual_amount - budget_amount AS variance
FROM financial_performance
ORDER BY month;`,
    },
  },
  {
    name: "Global Superstore performance Analytics",
    tools: ["SQL", "Power BI", "Excel"],
    image: projectSeo,
    summary: "Retail performance analysis spanning sales, regions and categories.",
    caseStudy: {
      intro:
        "Global Superstore performance Analytics connects sales, category, and regional performance patterns into one shared decision view for retail operations.",
      body: [
        "The analysis translates regional performance, category demand, and shipping timing into practical clues for sales planning and store operations.",
      ],
      focus: [
        "Regional sales performance",
        "Category deep dives",
        "Operational trend analysis",
      ],
    },
    dashboard: {
      metrics: [
        { label: "Sales", value: "$102.6K" },
        { label: "Profit", value: "$21.9K" },
        { label: "Orders", value: "1,284" },
        { label: "Region", value: "Global" },
      ],
    },
    sqlQuery: {
      query: `SELECT region,
       category,
       SUM(sales) AS sales_total,
       SUM(profit) AS profit_total
FROM superstore_sales
GROUP BY region, category
ORDER BY sales_total DESC;`,
    },
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Busayo Omoniyi | Data Analyst" },
      {
        name: "description",
        content:
          "Data analyst turning business data into insights that make performance easier to understand and decisions easier to make.",
      },
      { name: "author", content: "Busayo Omoniyi" },
      {
        name: "keywords",
        content: "Data Analyst, Busayo Omoniyi, SQL, Power BI, Excel, Python, Business Analytics",
      },
      { property: "og:title", content: "Busayo Omoniyi | Data Analyst" },
      {
        property: "og:description",
        content:
          "I turn business data into insights that make performance easier to understand and decisions easier to make.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectTab, setProjectTab] = useState<ProjectTab>("caseStudy");
  const [contactCardOpen, setContactCardOpen] = useState(false);

  const selectedProjectData =
    portfolioProjects.find((project) => project.name === selectedProject) ?? null;

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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-2 font-semibold min-w-0">
            <span className="truncate text-sm sm:text-base">Busayo Omoniyi</span>
            <span className="hidden sm:inline text-muted-foreground">| Data Analyst</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {[
              ["About", "#about"],
              ["Portfolio", "#portfolio"],
              ["Contact", "#contact"],
              ["Hire Me", "#contact"],
            ].map(([l, h]) => (
              <li key={h}>
                {l === "Hire Me" ? (
                  <a
                    href={h}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent text-white font-semibold hover:brightness-110"
                  >
                    {l}
                  </a>
                ) : (
                  <a href={h} className="hover:text-foreground transition-colors">
                    {l}
                  </a>
                )}
              </li>
            ))}
          </ul>

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
            ["About", "#about"],
            ["Portfolio", "#portfolio"],
            ["Contact", "#contact"],
            ["Hire Me", "#contact"],
          ].map(([l, h]) => (
            <li key={h}>
              <a
                href={h}
                onClick={closeMenu}
                className={l === "Hire Me" ? "text-accent font-semibold" : "hover:text-accent"}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main>
        <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1e40af]/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs glass border-accent/30">
                <span className="h-2 w-2 rounded-full bg-accent pulse-ring" />
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-accent to-[#60a5fa] bg-clip-text text-transparent">
                  DATA ANALYST
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                I work at the intersection of data and business operations, using data to
                understand what is happening, identify patterns and turn findings into useful
                information for decision-making. Simply, I turn business data into insights that
                make performance easier to understand and decisions easier to make.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#portfolio" className="btn-accent glow-accent">
                  View Portfolio
                </a>
                <a href="#contact" className="btn-outline">
                  Hire Me
                </a>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-px w-12 bg-accent" />
                <a href="#portfolio" className="hover:text-accent transition-colors">
                  
                </a>
              </div>
            </div>

            <div className="reveal relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/40 to-transparent rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-3 card-hover">
                <img
                  src={profileImg}
                  alt="Busayo Omoniyi"
                  width={480}
                  height={480}
                  fetchPriority="high"
                  decoding="async"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Busayo Omoniyi</p>
                    <p className="text-sm font-semibold">Data Analyst</p>
                  </div>
                  <span className="text-xs text-accent font-semibold">● Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="relative">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="eyebrow">Featured Projects</p>
                <h2 className="h2">Featured Projects</h2>
              </div>
              <p className="text-muted-foreground max-w-md">
                Analytical work across finance, retail and performance reporting.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {portfolioProjects.map((project, i) => (
                <article
                  key={project.name}
                  className="reveal glass rounded-2xl overflow-hidden card-hover flex flex-col"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <button
                    type="button"
                    className="text-left"
                    onClick={() => {
                      if (project.name === "Budget vs Actual Financial Analysis") {
                        navigate({ to: "/budget-vs-actual-finance-analysis" });
                        return;
                      }

                      if (project.name === "Global Superstore performance Analytics") {
                        navigate({ to: "/global-superstore-performance-analytics" });
                        return;
                      }

                      setSelectedProject(project.name);
                      setProjectTab("caseStudy");
                    }}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-card">
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        width={1280}
                        height={800}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-accent/15 text-accent border border-accent/30">
                          Analytics
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                      <span className="mt-5 text-sm text-accent hover:underline">
                        Open project →
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedProjectData && (
          <section id="project-detail" className="relative">
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
              <div className="glass rounded-3xl p-8">
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="fixed left-4 top-20 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-foreground shadow-lg backdrop-blur-md transition hover:bg-white/10"
                    onClick={() => {
                      setSelectedProject(null);
                      setProjectTab("caseStudy");
                    }}
                    aria-label="Back to portfolio"
                    title="Back to Portfolio"
                  >
                    <span aria-hidden="true">←</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="eyebrow">Project</p>
                      <h2 className="h2 mt-2">{selectedProjectData.name}</h2>
                    </div>
                  </div>
                </div>

                <nav className="mt-8 flex flex-wrap gap-3 border-b border-white/10 pb-4">
                  {[
                    ["Case Study", "caseStudy"],
                    ["Dashboard", "dashboard"],
                    ["SQL Query", "sqlQuery"],
                  ].map(([label, key]) => (
                    <button
                      key={key}
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${projectTab === key ? "bg-accent text-white" : "border border-white/10 text-muted-foreground hover:text-foreground"}`}
                      onClick={() => setProjectTab(key as ProjectTab)}
                    >
                      {label}
                    </button>
                  ))}
                </nav>

                <div className="mt-8">
                  {projectTab === "caseStudy" && (
                    <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-8">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">
                          Case Study
                        </p>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                          {selectedProjectData.caseStudy.intro}
                        </p>
                        {selectedProjectData.caseStudy.body.map((paragraph) => (
                          <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="glass rounded-2xl p-6">
                        <p className="text-xs uppercase text-muted-foreground">Focus</p>
                        <ul className="mt-4 space-y-3">
                          {selectedProjectData.caseStudy.focus.map((focus) => (
                            <li key={focus}>
                              <span className="text-accent">●</span> {focus}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {projectTab === "dashboard" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProjectData.dashboard.metrics.map((metric) => (
                        <div key={metric.label} className="glass rounded-2xl p-6">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            {metric.label}
                          </p>
                          <p className="mt-3 text-3xl font-bold text-accent">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {projectTab === "sqlQuery" && (
                    <div className="glass rounded-2xl p-6">
                      <pre className="overflow-x-auto text-sm leading-7 text-muted-foreground">
                        {selectedProjectData.sqlQuery.query}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="about">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="glass rounded-3xl p-3">
                <img
                  src={profileImg}
                  alt="Busayo Omoniyi"
                  width={400}
                  height={400}
                  className="rounded-2xl w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="reveal">
              <p className="eyebrow">About</p>
              <h2 className="h2">Hi, I'm Busayo Omoniyi.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                I work at the intersection of data and business operations, using data to understand
                what is happening, identify patterns and turn findings into useful information for
                decision-making.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My experience includes operational reporting, data tracking and analysis, alongside
                hands-on work with SQL, Power BI, Excel and Python. I enjoy taking messy or ordinary
                business data and turning it into something that actually answers a business
                question.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["SQL", "Power BI", "Excel", "Python"].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 px-3 py-2 text-xs text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 relative">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <p className="eyebrow">Contact</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight reveal">Hire Me</h2>
            <p className="mt-5 text-muted-foreground text-lg reveal">
              I transform business data into practical insight for clearer decisions and stronger
              performance.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 reveal">
              <button type="button" className="btn-accent glow-accent" onClick={() => setContactCardOpen(true)}>
                Hire Me
              </button>
              <a href="#portfolio" className="btn-outline">
                View Portfolio
              </a>
            </div>

            {contactCardOpen && (
              <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 backdrop-blur-sm p-4">
                <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-card p-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="eyebrow">Hire Me</p>
                      <h3 className="mt-2 text-2xl font-bold">Busayo Omoniyi</h3>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-white/10 px-3 py-1 text-sm hover:bg-white/10"
                      onClick={() => setContactCardOpen(false)}
                      aria-label="Close contact card"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-6 space-y-3 text-left">
                    <div className="glass rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                      <a href="mailto:hi.busayoniyi@gmail.com" className="mt-1 block text-sm font-semibold text-foreground hover:text-accent">
                        hi.busayoniyi@gmail.com
                      </a>
                    </div>

                    <div className="glass rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                      <a href="https://wa.me/2349052470512" target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold text-foreground hover:text-accent">
                        +2349052470512
                      </a>
                    </div>

                    <div className="glass rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">GitHub</p>
                      <a href="https://github.com/busayo-omoniyi" target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold text-foreground hover:text-accent">
                        github.com/busayo-omoniyi
                      </a>
                    </div>

                    <div className="glass rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                      <a href="https://linkedin.com/in/busayo-omoniyi" target="_blank" rel="noreferrer" className="mt-1 block text-sm font-semibold text-foreground hover:text-accent">
                        linkedin.com/in/busayo-omoniyi
                      </a>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-full border border-red-500/70 bg-red-600/90 px-3 py-1 text-[11px] font-semibold text-white hover:bg-red-500"
                        onClick={() => setContactCardOpen(false)}
                        aria-label="Close contact card"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Busayo Omoniyi. All rights reserved.</p>
          <p>Business insights through data.</p>
        </div>
      </footer>
    </div>
  );
}
