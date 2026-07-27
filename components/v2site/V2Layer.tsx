"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/lib/cart";
import {
  changesForRoute,
  changeByNumber,
  type V2Change,
} from "@/lib/v2-changes";

/**
 * The annotation overlay for the V2 review site.
 *
 * Changed elements in a V2 composition carry a plain `data-v2="7"` attribute.
 * This client component finds them, draws a numbered marker beside each, and
 * lists every change in a side panel with the reasoning.
 *
 * Why it works this way, rather than a React context + wrapper component:
 *   - The V2 compositions are SERVER components (matching the rest of the site),
 *     and server components cannot read client context. A data attribute is
 *     something a server component can emit freely.
 *   - Markers are PORTALLED to document.body because the page tree is hostile to
 *     positioned children: the hero wraps everything in a transformed motion.div
 *     (which becomes the containing block for position:fixed), every pinned
 *     section is overflow-hidden (which would clip a margin badge), and several
 *     sections use mix-blend-multiply (which would tint one).
 *   - z-45 sits above the header and announcement (z-40) but below the cart
 *     drawer (z-50), so the cart still works normally over the top.
 */

type Marker = { n: number; top: number; left: number; change: V2Change };

const PANEL_W = 360;

export function V2Layer({ route }: { route: string }) {
  const changes = changesForRoute(route);
  const { open: cartOpen } = useCart();

  const [mounted, setMounted] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [panelOpen, setPanelOpen] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [showMarkers, setShowMarkers] = useState(true);
  const raf = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Measure every annotated element. Positions are document-relative (rect +
  // scroll offset) so they stay correct through the tall pinned sections.
  const measure = useCallback(() => {
    const found: Marker[] = [];
    document.querySelectorAll<HTMLElement>("[data-v2]").forEach((el) => {
      const n = Number(el.getAttribute("data-v2"));
      const change = changeByNumber(n);
      if (!change) return;
      const r = el.getBoundingClientRect();
      // skip things scrolled far out of play, and elements with no box
      if (r.width === 0 && r.height === 0) return;
      found.push({
        n,
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        change,
      });
    });
    found.sort((a, b) => a.n - b.n);
    setMarkers(found);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    measure();
    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        measure();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // pinned sections settle after their animations; re-measure a few times
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [mounted, measure]);

  // Escape collapses the panel — but the cart drawer owns Escape while it's
  // open, so stand down rather than fight it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !cartOpen) setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen]);

  const goTo = (n: number) => {
    const el = document.querySelector<HTMLElement>(`[data-v2="${n}"]`);
    if (!el) return;
    setActive(n);
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    window.setTimeout(() => setActive((cur) => (cur === n ? null : cur)), 2600);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ---- markers ---- */}
      {showMarkers &&
        !cartOpen &&
        markers.map((m) => (
          <button
            key={m.n}
            onClick={() => goTo(m.n)}
            title={`${m.n}. ${m.change.title}`}
            aria-label={`Change ${m.n}: ${m.change.title}`}
            className="absolute z-[45] flex h-6 w-6 items-center justify-center rounded-full bg-ink-0 text-paper-0 shadow-[0_2px_8px_rgba(20,19,15,0.35)] ring-1 ring-paper-0/40 transition-transform hover:scale-110"
            style={{ top: m.top - 8, left: Math.max(4, m.left - 30) }}
          >
            <span className="num text-[11px] font-bold leading-none">{m.n}</span>
          </button>
        ))}

      {/* ---- highlight for the change you jumped to ---- */}
      {active !== null &&
        (() => {
          const m = markers.find((x) => x.n === active);
          const el = document.querySelector<HTMLElement>(`[data-v2="${active}"]`);
          if (!m || !el) return null;
          const r = el.getBoundingClientRect();
          return (
            <div
              aria-hidden
              className="pointer-events-none absolute z-[44] rounded-sm ring-2 ring-ink-0"
              style={{
                top: r.top + window.scrollY - 6,
                left: r.left + window.scrollX - 6,
                width: r.width + 12,
                height: r.height + 12,
              }}
            />
          );
        })()}

      {/* ---- side panel ---- */}
      <aside
        className="fixed right-0 top-0 z-[45] flex h-screen flex-col border-l bg-paper-0/95 backdrop-blur transition-transform duration-300"
        style={{
          width: PANEL_W,
          borderColor: "var(--hair)",
          transform: panelOpen ? "translateX(0)" : `translateX(${PANEL_W}px)`,
        }}
      >
        <header
          className="flex items-baseline justify-between border-b px-5 py-4"
          style={{ borderColor: "var(--hair)" }}
        >
          <div>
            <div className="caps-loose text-[10px] font-semibold text-ink-2">
              V2 · Proposed changes
            </div>
            <div className="mt-1 text-[13px] font-semibold text-ink-0">
              {changes.length} on this page
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(false)}
            className="caps text-[10px] font-semibold text-ink-3 hover:text-ink-0"
          >
            Hide
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {changes.length === 0 && (
            <p className="px-5 py-6 text-[13px] leading-[1.6] text-ink-2">
              No annotated changes on this page yet.
            </p>
          )}
          {changes.map((c) => (
            <button
              key={c.n}
              onClick={() => goTo(c.n)}
              className={`block w-full border-b px-5 py-4 text-left transition-colors hover:bg-ink-0/[0.03] ${
                active === c.n ? "bg-ink-0/[0.05]" : ""
              }`}
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="flex items-baseline gap-3">
                <span className="num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-0 text-[10px] font-bold text-paper-0">
                  {c.n}
                </span>
                <span className="text-[13.5px] font-semibold leading-[1.35] text-ink-0">
                  {c.title}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 pl-8">
                <Tag>{c.category}</Tag>
                <Tag>{`Effort ${c.effort}`}</Tag>
                {c.fixesBug && <Tag strong>Fixes a bug</Tag>}
              </div>
              <p className="mt-2.5 pl-8 text-[12.5px] leading-[1.5] text-ink-2">
                {c.what}
              </p>
              <p className="mt-2 pl-8 text-[12.5px] leading-[1.5] text-ink-1">
                <span className="caps text-[9px] font-semibold text-ink-3">
                  Why
                </span>
                <br />
                {c.why}
              </p>
              {c.evidence && (
                <p className="mt-2 pl-8 text-[11.5px] leading-[1.5] text-ink-3">
                  {c.evidence}
                </p>
              )}
            </button>
          ))}
        </div>

        <footer
          className="flex items-center justify-between border-t px-5 py-3"
          style={{ borderColor: "var(--hair)" }}
        >
          <label className="flex items-center gap-2 text-[11px] font-medium text-ink-2">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
            />
            Show markers
          </label>
          <a
            href="/v2/changes"
            className="caps text-[10px] font-semibold text-ink-0 underline underline-offset-4"
          >
            Full catalogue
          </a>
        </footer>
      </aside>

      {/* ---- reopen tab ---- */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed right-0 top-1/2 z-[45] -translate-y-1/2 rounded-l-[5px] border border-r-0 bg-ink-0 px-3 py-4 text-paper-0"
          style={{ borderColor: "var(--hair)" }}
        >
          <span className="caps block text-[10px] font-semibold [writing-mode:vertical-rl]">
            V2 · {changes.length} changes
          </span>
        </button>
      )}
    </>,
    document.body,
  );
}

function Tag({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <span
      className={`caps rounded-xs px-1.5 py-0.5 text-[8.5px] font-semibold ${
        strong
          ? "bg-ink-0 text-paper-0"
          : "border text-ink-2"
      }`}
      style={strong ? undefined : { borderColor: "var(--hair-strong)" }}
    >
      {children}
    </span>
  );
}
