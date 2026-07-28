"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Change, Rendition, Surface } from "@/lib/renditions";
import { RENDITIONS, SURFACE_LABEL, LIVE_HREF } from "@/lib/renditions";

/**
 * The review apparatus: a numbered badge pinned to every changed element, and
 * a panel that lists the changes. Clicking a row scrolls to that exact
 * element.
 *
 * Why badges are portalled to `document.body` rather than rendered in place:
 * the compositions wrap sections in transformed `motion.div`s (a transform
 * creates a containing block, so `position: fixed` inside the page tree stops
 * being viewport-relative), several sections are `overflow-hidden` (which
 * would clip a badge sitting in the margin), and a few use
 * `mix-blend-multiply` (which would tint one). Measuring in the page and
 * drawing outside it is the only arrangement that survives all three.
 *
 * Marked elements opt in with plain attributes, so the pages stay server
 * components:
 *
 *   data-mark="12"          the catalogue number
 *   data-mark-tone="dark"   badge sits on a black slab, so invert it
 *   data-mark-at="0.5"      the element lives inside a pinned section: scroll
 *                           to this fraction through the section's travel
 *                           rather than to the element's current position
 */
export function ReviewLayer({
  changes,
  rendition,
  surface,
}: {
  changes: Change[];
  rendition: Rendition;
  surface: Surface;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<
    { n: number; x: number; y: number; dark: boolean }[]
  >([]);
  const flashTimer = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Restore the panel state, so flipping between renditions does not keep
  // reopening a panel you just closed to look at the design.
  useEffect(() => {
    const saved = window.localStorage.getItem("vm-review-open");
    if (saved !== null) setOpen(saved === "1");
  }, []);
  useEffect(() => {
    if (mounted) window.localStorage.setItem("vm-review-open", open ? "1" : "0");
  }, [open, mounted]);

  // Inset the page rather than cover it. A panel that sits on top of the right
  // third of a design is a panel that stops you judging the design: the buy
  // column on a two-column product page disappears entirely underneath it.
  // The class drives a margin on the shell wrapper, so full-bleed sections stay
  // genuinely full-bleed inside the narrowed area. Only above 1280px, where
  // there is width to spare; below that the panel overlays and you close it.
  useEffect(() => {
    document.documentElement.classList.toggle("review-open", open);
    return () => document.documentElement.classList.remove("review-open");
  }, [open]);

  // Measure. The node list is cached and only the rects are recomputed per
  // frame — re-querying the DOM on every scroll frame is what made the old
  // annotation layer stutter on the pinned sections.
  useEffect(() => {
    let raf = 0;
    let nodes: HTMLElement[] = [];

    const collect = () => {
      nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-mark]")
      ).filter((n) => Number(n.dataset.mark) > 0);
    };

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const next: { n: number; x: number; y: number; dark: boolean }[] = [];
      for (const node of nodes) {
        const r = node.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        // Only draw badges for elements near the viewport. On a 450vh pinned
        // section most marks are far off-screen and drawing them all costs
        // layout for nothing.
        if (r.bottom < -120 || r.top > vh + 120) continue;
        next.push({
          n: Number(node.dataset.mark),
          // Sit just outside the element's top-left corner rather than on it,
          // so the badge never covers the first word of the thing it labels.
          // Clamped so a badge on a full-bleed element stays on screen.
          x: Math.min(Math.max(r.left - 13, 24), window.innerWidth - 24),
          y: Math.min(Math.max(r.top - 13, 92), vh - 24),
          dark: node.dataset.markTone === "dark",
        });
      }
      setBoxes(next);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    collect();
    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Images and fonts land after first paint and move everything.
    const settle = window.setTimeout(() => {
      collect();
      measure();
    }, 600);
    document.fonts?.ready.then(schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goTo = useCallback((n: number) => {
    const el = document.querySelector<HTMLElement>(`[data-mark="${n}"]`);
    if (!el) return;

    let top: number | null = null;

    // Inside a pinned section, the element's current rect tells you where it
    // happens to be sitting, not where its moment in the scroll is. Walk up to
    // the tall section and scroll to the requested fraction of its travel.
    const at = el.dataset.markAt;
    if (at) {
      const section = el.closest<HTMLElement>("section");
      if (section) {
        const travel = section.offsetHeight - window.innerHeight;
        top =
          window.scrollY +
          section.getBoundingClientRect().top +
          Math.max(0, travel) * Number(at);
      }
    }

    if (top === null) {
      // 110px clears the 74px header and leaves the element a little air.
      top = window.scrollY + el.getBoundingClientRect().top - 110;
    }

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActive(n);

    el.classList.add("mark-flash");
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(
      () => el.classList.remove("mark-flash"),
      2000
    );
  }, []);

  if (!mounted) return null;

  const meta = RENDITIONS[rendition];

  return createPortal(
    <>
      {/* numbered badges */}
      <div className="pointer-events-none fixed inset-0 z-[45]">
        {boxes.map((b) => {
          const on = active === b.n;
          return (
            <button
              key={b.n}
              type="button"
              onClick={() => goTo(b.n)}
              style={{ left: b.x, top: b.y }}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-[11px] font-bold tabular-nums transition-transform duration-150 hover:scale-125 ${
                on
                  ? "h-[26px] w-[26px] bg-[#C8452F] text-white ring-2 ring-white"
                  : b.dark
                    ? "h-[22px] w-[22px] bg-white text-[#14130F] ring-1 ring-black/20"
                    : "h-[22px] w-[22px] bg-[#14130F] text-white ring-1 ring-white/70"
              }`}
              aria-label={`Change ${b.n}`}
            >
              {b.n}
            </button>
          );
        })}
      </div>

      {/* collapsed tab */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed right-0 top-1/2 z-[46] -translate-y-1/2 rounded-l-md bg-[#14130F] px-3 py-4 text-[11px] font-semibold uppercase text-white shadow-lg"
          style={{ letterSpacing: "0.18em", writingMode: "vertical-rl" }}
        >
          {changes.length} changes
        </button>
      )}

      {/* panel */}
      {open && (
        <aside className="fixed bottom-0 right-0 top-0 z-[46] flex w-full max-w-[380px] flex-col border-l border-black/10 bg-white/97 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]">
          <header className="border-b border-black/10 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase text-black/45"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {SURFACE_LABEL[surface]} · Rendition {meta.slug.toUpperCase()}
                </p>
                <h2
                  className="mt-1 text-[22px] font-semibold text-[#14130F]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {meta.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-1 -mt-1 rounded p-2 text-[11px] font-semibold uppercase text-black/45 hover:bg-black/5 hover:text-black"
                style={{ letterSpacing: "0.14em" }}
              >
                Hide
              </button>
            </div>
            <p className="mt-2 text-[12.5px] leading-[1.5] text-black/60">
              {meta.tagline}
            </p>

            <nav className="mt-4 flex flex-wrap gap-1.5">
              {(["home", "pectus", "stone"] as Surface[]).map((s) => (
                <a
                  key={s}
                  href={`/${meta.slug}${s === "home" ? "" : `/${s}`}`}
                  className={`rounded-sm border px-2 py-1 text-[10.5px] font-semibold uppercase transition-colors ${
                    s === surface
                      ? "border-[#14130F] bg-[#14130F] text-white"
                      : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
                  }`}
                  style={{ letterSpacing: "0.12em" }}
                >
                  {SURFACE_LABEL[s]}
                </a>
              ))}
              {/* There was a cross-rendition switcher here while Atelier and
                  Colosseum existed. With one rendition left it had nothing to
                  point at, so it is gone rather than rendering empty. */}
              <a
                href={LIVE_HREF[surface]}
                className="rounded-sm border border-black/15 px-2 py-1 text-[10.5px] font-semibold uppercase text-black/60 transition-colors hover:border-black/40 hover:text-black"
                style={{ letterSpacing: "0.12em" }}
              >
                Live
              </a>
            </nav>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <p className="border-b border-black/10 px-5 py-3 text-[12px] leading-[1.55] text-black/55">
              {meta.note}
            </p>
            <ol>
              {changes.map((c) => {
                const on = active === c.n;
                return (
                  <li key={c.n} className="border-b border-black/[0.07]">
                    <button
                      type="button"
                      onClick={() => goTo(c.n)}
                      className={`flex w-full gap-3 px-5 py-3.5 text-left transition-colors ${
                        on ? "bg-[#14130F]/[0.045]" : "hover:bg-black/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-[1px] flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold tabular-nums ${
                          on
                            ? "bg-[#C8452F] text-white"
                            : "bg-[#14130F] text-white"
                        }`}
                      >
                        {c.n}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-semibold leading-[1.35] text-[#14130F]">
                          {c.title}
                        </span>
                        <span
                          className="mt-1 block text-[9.5px] font-semibold uppercase text-black/35"
                          style={{ letterSpacing: "0.16em" }}
                        >
                          {c.category}
                        </span>
                        <span className="mt-1.5 block text-[12px] leading-[1.5] text-black/55">
                          <span className="text-black/40">Was: </span>
                          {c.from}
                        </span>
                        <span className="mt-1 block text-[12px] leading-[1.5] text-black/70">
                          {c.why}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <footer className="border-t border-black/10 px-5 py-3">
            <a
              href="/renditions"
              className="text-[11px] font-semibold uppercase text-black/50 hover:text-black"
              style={{ letterSpacing: "0.14em" }}
            >
              ← All renditions
            </a>
          </footer>
        </aside>
      )}
    </>,
    document.body
  );
}
