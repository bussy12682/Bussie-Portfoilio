import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import caseStudyPdfUrl from "../../budget vs finance case study.pdf?url";
import dashboardAssetUrl from "../../budget vs finance dashbaord.pptx?url";
import sqlScript from "../../Budget vs Actual Query script.txt?raw";

type ProjectView = "caseStudy" | "dashboard" | "sqlQuery";

type SlideAsset = {
  title: string;
  text: string;
  images?: string[];
};

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

function CaseStudyPdf() {
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      const pdfDocument = await pdfjsLib.getDocument({
        url: caseStudyPdfUrl,
      }).promise;

      if (cancelled) return;
      setPageCount(pdfDocument.numPages);

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
        const page = await pdfDocument.getPage(pageNumber);
        const canvas = canvasRefs.current[pageNumber - 1];
        const context = canvas?.getContext("2d");
        if (!canvas || !context || cancelled) continue;

        const baseViewport = page.getViewport({ scale: 1 });
        const availableWidth = Math.max(canvas.parentElement?.clientWidth ?? 320, 320);
        const viewport = page.getViewport({ scale: availableWidth / baseViewport.width });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = viewport.width * pixelRatio;
        canvas.height = viewport.height * pixelRatio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        await page.render({
          canvasContext: context,
          viewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        }).promise;
      }
    }

    renderPdf().catch((renderError) => {
      console.error("Unable to render case study PDF", renderError);
      if (!cancelled) setError("Unable to load the case study PDF.");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <div className="rounded-2xl border border-red-400/30 bg-red-950/30 p-6 text-center text-sm text-red-200">{error}</div>;
  }

  return (
    <div className="case-study-viewer">
      {pageCount === 0 && <p className="p-8 text-center text-sm text-white/70">Loading case study...</p>}
      {Array.from({ length: pageCount }, (_, index) => (
        <div key={`budget-case-study-page-${index + 1}`} className="case-study-page">
          <canvas
            ref={(canvas) => {
              canvasRefs.current[index] = canvas;
            }}
            aria-label={`Budget vs Actual case study page ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

function decodeXmlText(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function isMeaningfulText(value: string) {
  const cleaned = value.trim();

  if (!cleaned || cleaned.includes("<") || cleaned.includes(">") || /^\d+$/.test(cleaned)) {
    return false;
  }

  return cleaned.length > 1;
}

function resolveRelationshipTarget(slideFile: string, target: string) {
  const basePath = slideFile.split("/").slice(0, -1).join("/");
  const targetSegments = target.replace(/\\/g, "/").split("/").filter(Boolean);
  const baseSegments = basePath.split("/").filter(Boolean);

  for (const segment of targetSegments) {
    if (segment === "..") {
      baseSegments.pop();
    } else if (segment !== ".") {
      baseSegments.push(segment);
    }
  }

  return baseSegments.join("/");
}

function collectSlideText(xml: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const textNodes = Array.from(doc.getElementsByTagName("a:t"));

  const values = textNodes
    .map((node) => node.textContent ?? "")
    .map((value) => decodeXmlText(value))
    .filter(isMeaningfulText);

  return Array.from(new Set(values));
}

async function getPresentationSlides(fileUrl: string): Promise<SlideAsset[]> {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Unable to load presentation: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const slideFiles = Object.keys(zip.files)
    .filter((key) => /^ppt\/slides\/slide\d+\.xml$/.test(key))
    .sort();

  const slides: SlideAsset[] = [];

  for (let index = 0; index < slideFiles.length; index += 1) {
    const slideFile = slideFiles[index];
    const xml = await zip.files[slideFile].async("text");
    const collectedText = collectSlideText(xml);

    const slideImages: string[] = [];
    const relsFile = `ppt/slides/_rels/${slideFile.replace(/^ppt\/slides\//, "")}.rels`;

    if (zip.files[relsFile]) {
      const relsXml = await zip.files[relsFile].async("text");
      const imageTargets = Array.from(
        relsXml.matchAll(/Type="http:\/\/schemas\.openxmlformats\.org\/officeDocument\/2006\/relationships\/image"[^>]*Target="([^"]+)"/g),
      ).map((match) => match[1]);

      for (const target of imageTargets) {
        const resolvedPath = resolveRelationshipTarget(slideFile, target);
        const resolved = zip.files[resolvedPath];

        if (resolved) {
          const base64 = await resolved.async("base64");
          slideImages.push(`data:image/png;base64,${base64}`);
        }
      }
    }

    const title = collectedText[0] || `Slide ${index + 1}`;
    const text = collectedText.slice(1).join("\n") || collectedText[0] || "";

    slides.push({
      title,
      text,
      images: slideImages.length > 0 ? slideImages : undefined,
    });
  }

  return slides;
}

export const Route = createFileRoute("/budget-vs-actual-finance-analysis")({
  component: BudgetVsActualFinanceAnalysisPage,
});

function BudgetVsActualFinanceAnalysisPage() {
  const [activeView, setActiveView] = useState<ProjectView>("caseStudy");
  const [dashboardSlides, setDashboardSlides] = useState<SlideAsset[]>([]);
  const sqlQuery = (sqlScript || "").trim() || "";

  useEffect(() => {
    async function loadSlides() {
      try {
        const dashboardContent = await getPresentationSlides(dashboardAssetUrl);

        setDashboardSlides(dashboardContent);
      } catch (error) {
        console.error("Unable to load presentation slides", error);
      }
    }

    loadSlides();
  }, []);

  const topNav = useMemo(
    () => [
      { label: "Case Study", value: "caseStudy" as const },
      { label: "Dashboard", value: "dashboard" as const },
      { label: "SQL Query", value: "sqlQuery" as const },
    ],
    [],
  );

  const renderPresentationDeck = (
    label: string,
    badge: string,
    slides: SlideAsset[],
    loadingText: string,
  ) => (
    <div className="space-y-6">
      {slides.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/90 p-6 text-white/80">
          {loadingText}
        </div>
      ) : (
        slides.map((slide, idx) => (
          <article
            key={`${label}-${slide.title}-${idx}`}
            className="rounded-3xl border border-white/10 bg-black/90 p-5 text-white"
          >
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wider text-white/70">
                {label} | {slide.title}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase text-white/70">
                {badge}
              </span>
            </div>

            <div className="space-y-5">
                          {slide.text && (
                            <p className="text-sm leading-7 text-white/85 whitespace-pre-wrap">{slide.text}</p>
                          )}

              {slide.images && slide.images.length > 0 && (
                <div className="grid gap-4">
                  {slide.images.map((image, imageIndex) => (
                    <img
                      key={`${label}-${slide.title}-image-${imageIndex}`}
                      src={image}
                      alt={`${slide.title} visual ${imageIndex + 1}`}
                      className="w-full rounded-2xl border border-white/15 bg-black object-contain"
                    />
                  ))}
                </div>
              )}
            </div>
          </article>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="h-8 w-8 rounded-lg grid place-items-center bg-gradient-to-br from-accent to-[#1e40af] text-white shadow-glow">
              B
            </span>
            <span>Busayo Analytics</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <li>
              <a href="/#portfolio" className="hover:text-foreground transition-colors">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="project-detail" className="pt-28 pb-16">
        <section className="relative mx-auto max-w-6xl px-0 sm:px-8">
          <div className="mb-8 px-5 sm:px-0">
            <a href="/" className="fixed left-4 top-20 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-foreground shadow-lg backdrop-blur-md transition hover:bg-white/10" aria-label="Back to portfolio" title="Back to Portfolio">
              <span aria-hidden="true">←</span>
            </a>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow">Budget vs Actual</span>
                <h1 className="h2 mt-3">Finance Analysis</h1>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden">
            <nav className="flex flex-wrap gap-3 border-b border-white/10 p-4">
              {topNav.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeView === tab.value
                      ? "bg-accent text-white"
                      : "border border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveView(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="p-6 md:p-8">
              {activeView === "caseStudy" && (
                <article className="-mx-6 -mt-6 overflow-hidden border-x border-b border-white/10 bg-black md:-mx-8 md:-mt-8">
                  <CaseStudyPdf />
                </article>
              )}

              {activeView === "dashboard" && (
                renderPresentationDeck(
                  "Dashboard",
                  "Performance Dashboard",
                  dashboardSlides,
                  "Loading dashboard slides…",
                )
              )}

              {activeView === "sqlQuery" && (
                <article className="rounded-3xl border border-white/10 bg-card/50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      SQL Query
                    </span>
                    <span className="rounded-full border border-accent/40 px-3 py-1 text-[11px] uppercase text-accent">
                      Budget vs Actual Script
                    </span>
                  </div>
                  <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-background/70 p-5 text-sm leading-7 text-muted-foreground">
                    {sqlQuery || "No SQL query file content found."}
                  </pre>
                </article>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
