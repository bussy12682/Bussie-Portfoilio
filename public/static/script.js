// ===== Data =====
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
    image: "./assets/project-backend.jpg",
  },
  {
    title: "SEO Growth Engine",
    tag: "SEO",
    description:
      "SEO-optimized content site with keyword-mapped URL structure, structured data, optimized metadata, image lazy-loading, and Core Web Vitals tuned to 95+ Lighthouse.",
    stack: ["Next.js", "Schema.org", "Sitemap", "GA4", "Search Console"],
    image: "./assets/project-seo.jpg",
  },
  {
    title: "SaaS Dashboard UI",
    tag: "Frontend",
    description:
      "Responsive analytics dashboard with accessible components, dark theme system, smooth transitions, and an opinionated design system built on React and Tailwind.",
    stack: ["React", "TypeScript", "Tailwind", "Recharts"],
    image: "./assets/project-frontend.jpg",
  },
];

const whyCards = [
  {
    t: "Fullstack execution",
    d: "Confident across frontend, backend, APIs, and databases , end-to-end ownership.",
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
];

// ===== Render dynamic sections =====
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

document.getElementById("skillGrid").innerHTML = skills
  .map((s, i) => `<li class="skill reveal" style="transition-delay:${i * 40}ms">${esc(s)}</li>`)
  .join("");

document.getElementById("projectGrid").innerHTML = projects
  .map(
    (p, i) => `
    <article class="project reveal" style="transition-delay:${i * 100}ms">
      <div class="thumb">
        <img src="${p.image}" alt="${esc(p.title)}, ${esc(p.tag)} project preview" loading="lazy" width="1280" height="800" />
      </div>
      <div class="body">
        <div class="head">
          <h3>${esc(p.title)}</h3>
          <span class="tag">${esc(p.tag)}</span>
        </div>
        <p class="desc">${esc(p.description)}</p>
        <ul class="stack">
          ${p.stack.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}
        </ul>
      </div>
    </article>
  `,
  )
  .join("");

document.getElementById("whyCards").innerHTML = whyCards
  .map((c) => `<div class="why-card"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`)
  .join("");

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Reveal on scroll =====
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
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backdrop = document.getElementById("backdrop");

function setMenu(open) {
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  backdrop.classList.toggle("open", open);
  document.body.classList.toggle("no-scroll", open);
}

menuBtn.addEventListener("click", () => {
  setMenu(!mobileMenu.classList.contains("open"));
});
backdrop.addEventListener("click", () => setMenu(false));
document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Close mobile menu when resizing up to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) setMenu(false);
});
