"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

type Cell = "yes" | "part" | "no";

const ROWS: { label: string; gyno: Cell; cold: Cell; none: Cell }[] = [
  { label: "Cooling on contact", gyno: "yes", cold: "yes", none: "no" },
  { label: "Firmer-looking finish", gyno: "yes", cold: "part", none: "no" },
  { label: "Holds up to an hour", gyno: "yes", cold: "no", none: "no" },
  { label: "Pocket-size, no mess", gyno: "yes", cold: "no", none: "no" },
  { label: "Matte, undetectable", gyno: "yes", cold: "no", none: "no" },
  { label: "Made in the UK", gyno: "yes", cold: "no", none: "no" },
];

// minmax(0,…) keeps every column to its share regardless of label length,
// so rows stay perfectly aligned on narrow screens.
const COLS =
  "grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,0.95fr)]";

function Mark({ v, on = false }: { v: Cell; on?: boolean }) {
  if (v === "yes")
    return (
      <span className={on ? "text-paper-0" : "text-ink-0"} aria-label="yes">
        ●
      </span>
    );
  if (v === "part")
    return (
      <span className={on ? "text-paper-0/50" : "text-ink-3"} aria-label="partial">
        ◐
      </span>
    );
  return (
    <span className={on ? "text-paper-0/30" : "text-ink-3"} aria-label="no">
      —
    </span>
  );
}

export function Comparison() {
  const reduce = useReducedMotion();
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="—" title="Why GY-NO!" />

        <div className="overflow-hidden border" style={{ borderColor: "var(--hair-strong)" }}>
          {/* header */}
          <div className={COLS}>
            <div className="px-3 py-4 sm:px-5 sm:py-5" />
            <div className="flex items-center justify-center bg-ink-0 px-1 py-4 text-center text-paper-0 sm:py-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] sm:text-[13px] sm:tracking-caps">
                GY-NO!
              </span>
            </div>
            <div className="flex items-center justify-center px-1 py-4 text-center sm:py-5">
              <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                The Cold Trick
              </span>
            </div>
            <div className="flex items-center justify-center px-1 py-4 text-center sm:py-5">
              <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2 sm:text-[11px]">
                Nothing
              </span>
            </div>
          </div>

          {/* rows */}
          {ROWS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
              className={`${COLS} border-t`}
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="flex items-center px-3 py-4 sm:px-5 sm:py-5">
                <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.05em] text-ink-1 sm:text-[13px] sm:tracking-[0.1em]">
                  {r.label}
                </span>
              </div>
              <div className="flex items-center justify-center bg-ink-0 py-4 text-[16px] sm:py-5">
                <Mark v={r.gyno} on />
              </div>
              <div className="flex items-center justify-center py-4 text-[16px] sm:py-5">
                <Mark v={r.cold} />
              </div>
              <div className="flex items-center justify-center py-4 text-[16px] sm:py-5">
                <Mark v={r.none} />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 caps text-[10px] font-medium text-ink-3">
          Describes feel &amp; finish. A cosmetic — temporary by design.
        </p>
      </Container>
    </section>
  );
}
