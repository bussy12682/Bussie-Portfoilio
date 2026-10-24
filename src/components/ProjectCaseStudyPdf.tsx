import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type ProjectCaseStudyPdfProps = {
  fileUrl: string;
  title: string;
};

export function ProjectCaseStudyPdf({ fileUrl, title }: ProjectCaseStudyPdfProps) {
  const [pageCount, setPageCount] = useState(0);
  const [pageAspectRatio, setPageAspectRatio] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pdfDocumentRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const renderTasksRef = useRef(new Map<number, pdfjsLib.RenderTask>());

  useEffect(() => {
    let cancelled = false;
    const renderTasks = renderTasksRef.current;
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    const loadingTask = pdfjsLib.getDocument({ url: fileUrl });

    loadingTask.promise
      .then(async (pdfDocument) => {
        if (cancelled) return;
        const firstPage = await pdfDocument.getPage(1);
        const firstPageViewport = firstPage.getViewport({ scale: 1 });
        setPageAspectRatio(`${firstPageViewport.width} / ${firstPageViewport.height}`);
        pdfDocumentRef.current = pdfDocument;
        setPageCount(pdfDocument.numPages);
      })
      .catch((loadError: unknown) => {
        console.error(`Unable to load ${title} case study PDF`, loadError);
        if (!cancelled) setError("Unable to display the case study in this browser.");
      });

    return () => {
      cancelled = true;
      renderTasks.forEach((task) => task.cancel());
      renderTasks.clear();
      void loadingTask.destroy();
      pdfDocumentRef.current = null;
    };
  }, [fileUrl, title]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const pdfDocument = pdfDocumentRef.current;
    if (!viewer || !pdfDocument || !pageCount) return;

    let cancelled = false;
    const renderTasks = renderTasksRef.current;
    const renderVisiblePage = async (pageNumber: number) => {
      if (cancelled || renderTasks.has(pageNumber)) return;

      const canvas = canvasRefs.current[pageNumber - 1];
      const pageContainer = pageRefs.current[pageNumber - 1];
      const context = canvas?.getContext("2d");
      if (!canvas || !pageContainer || !context) return;
      let renderTask: pdfjsLib.RenderTask | undefined;

      try {
        const page = await pdfDocument.getPage(pageNumber);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const availableWidth = Math.max(pageContainer.clientWidth, 1);
        const viewport = page.getViewport({ scale: availableWidth / baseViewport.width });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = Math.ceil(viewport.width * pixelRatio);
        canvas.height = Math.ceil(viewport.height * pixelRatio);
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        renderTask = page.render({
          canvasContext: context,
          viewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        renderTasks.set(pageNumber, renderTask);
        await renderTask.promise;
      } catch (renderError: unknown) {
        if (!(renderError instanceof Error && renderError.name === "RenderingCancelledException")) {
          console.error(`Unable to render ${title} case study page ${pageNumber}`, renderError);
          if (!cancelled) setError("Unable to display the case study in this browser.");
        }
      } finally {
        if (renderTask && renderTasks.get(pageNumber) === renderTask) {
          renderTasks.delete(pageNumber);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageNumber = Number((entry.target as HTMLElement).dataset.pageNumber);
          if (entry.isIntersecting) {
            void renderVisiblePage(pageNumber);
            return;
          }

          const task = renderTasks.get(pageNumber);
          if (task) {
            task.cancel();
            renderTasks.delete(pageNumber);
          }

          const canvas = canvasRefs.current[pageNumber - 1];
          if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
          }
        });
      },
      { rootMargin: "400px 0px" },
    );

    pageRefs.current.forEach((page) => {
      if (page) observer.observe(page);
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      renderTasks.forEach((task) => task.cancel());
      renderTasks.clear();
    };
  }, [pageCount, title]);

  return (
    <div className="case-study-viewer">
      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-950/30 p-6 text-center text-sm text-red-200">
          <p>{error}</p>
          <a href={fileUrl} target="_blank" rel="noreferrer" className="btn-outline mt-4">
            Open case study PDF
          </a>
        </div>
      ) : (
        <div ref={viewerRef} className="case-study-viewer-content">
          {pageCount === 0 && (
            <p className="p-8 text-center text-sm text-white/70">Loading case study...</p>
          )}
          {Array.from({ length: pageCount }, (_, index) => (
            <div
              key={`${title}-case-study-page-${index + 1}`}
              ref={(element) => {
                pageRefs.current[index] = element;
              }}
              data-page-number={index + 1}
              className="case-study-page"
              style={{ aspectRatio: pageAspectRatio }}
            >
              <canvas
                ref={(element) => {
                  canvasRefs.current[index] = element;
                }}
                aria-label={`${title} case study page ${index + 1}`}
              />
            </div>
          ))}
          <div className="flex justify-center">
            <a href={fileUrl} target="_blank" rel="noreferrer" className="btn-outline">
              Open case study PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
