"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { EMBER } from "@/components/chisel/Art";

/* ── Allocation ───────────────────────────────────────────────────
   The constraint here is the optional *steel tools* — each one is machined,
   so the first run is small. Distinct from GY-NO!'s units angle. */
const RESERVED_PCT = 74;
const SEGMENTS = 40;
const FILLED = Math.round((RESERVED_PCT / 100) * SEGMENTS);

const ROSTER = [
  { in: "MK", city: "London" },
  { in: "AB", city: "Birmingham" },
  { in: "JP", city: "Leeds" },
  { in: "DR", city: "Bristol" },
  { in: "SC", city: "Glasgow" },
  { in: "TN", city: "Newcastle" },
  { in: "HО", city: "Cardiff" },
  { in: "EW", city: "Brighton" },
];

const QUOTES = [
  {
    q: "The slip is the thing — it just keeps gliding, so you can actually work an area. Skin looks tighter for the rest of the night.",
    a: "Early tester · London",
  },
  {
    q: "It feels like a proper ritual, not a quick smear. Jaw and chest read a lot sharper after a minute of work, and the muscle feels eased.",
    a: "Early tester · Bristol",
  },
  {
    q: "Worked it in by hand for a week, then tried the steel. The steel has real weight — you do less and it does more. Looks defined without trying.",
    a: "Early tester · Leeds",
  },
];

const TRUST = [
  "Made in the UK",
  "Cruelty-Free",
  "Cosmetic-Grade",
  "Machined Steel",
  "Secure Checkout",
];

function RecentlyReserved() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROSTER.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const person = ROSTER[i];

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-1.5 w-1.5">
        {!reduce && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: EMBER }}
          />
        )}
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: EMBER }}
        />
      </span>
      <span className="caps text-[10px] font-semibold text-ink-3">
        Recently reserved
      </span>
      <span className="h-3 w-px bg-[var(--hair-strong)]" aria-hidden />
      <span className="relative h-[14px] min-w-[150px] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={reduce ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 caps text-[10px] font-semibold text-ink-1"
          >
            {person.in} · {person.city}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

function AllocationMeter() {
  const reduce = useReducedMotion();
  return (
    <div className="flex w-full gap-[3px]" aria-hidden>
      {Array.from({ length: SEGMENTS }).map((_, idx) => {
        const filled = idx < FILLED;
        return (
          <motion.span
            key={idx}
            className="h-7 flex-1 rounded-xs"
            style={{ background: filled ? "var(--ink-0)" : "var(--hair)" }}
            initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: filled ? idx * 0.018 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}

export function ChiselProof() {
  const marqueeQuotes = [...QUOTES, ...QUOTES];

  return (
    <section
      className="overflow-hidden border-y bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        {/* Masthead */}
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <span className="caps-loose text-[11px] font-semibold text-ink-2">
              The First-Batch List
            </span>
            <RecentlyReserved />
          </div>
        </Reveal>

        {/* Hero stat ledger */}
        <Reveal delay={0.05}>
          <div
            className="mt-7 grid grid-cols-1 items-end gap-x-10 gap-y-9 border-t pt-8 md:grid-cols-[auto_1fr]"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            <div>
              <div className="flex items-start gap-3">
                <span
                  className="font-extrabold text-ink-0"
                  style={{
                    fontSize: "clamp(72px, 11vw, 150px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.82,
                  }}
                >
                  <Counter value={1400} />+
                </span>
                <span className="caps mt-2 text-[12px] font-semibold leading-tight text-ink-2">
                  on the
                  <br />
                  list
                </span>
              </div>
            </div>

            <p className="max-w-sm pb-1 text-[16.5px] leading-[1.6] text-ink-2 md:justify-self-end">
              The cream pours in full batches, but every optional steel tool is
              machined to order — so the first run is small. Pre-order locks the
              early-bird price and a place in the first batch.
            </p>
          </div>
        </Reveal>

        {/* Allocation meter */}
        <Reveal delay={0.05}>
          <div className="mt-14">
            <div className="flex items-end justify-between">
              <span className="caps text-[11px] font-semibold text-ink-1">
                First steel-tool run · early-bird allocation
              </span>
              <span className="flex items-baseline gap-2">
                <span
                  className="font-extrabold text-ink-0"
                  style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.03em" }}
                >
                  <Counter value={RESERVED_PCT} />%
                </span>
                <span className="caps text-[10.5px] font-semibold text-ink-2">reserved</span>
              </span>
            </div>
            <div className="mt-4">
              <AllocationMeter />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="caps text-[10.5px] font-medium text-ink-2">
                Limited early-bird tool sets left from £39
              </span>
              <span className="caps text-[10.5px] font-medium text-ink-3">
                RRP £52 once it ships
              </span>
            </div>
          </div>
        </Reveal>

        {/* Quote marquee */}
        <Reveal delay={0.05}>
          <div
            className="relative mt-14 overflow-hidden border-y py-1"
            style={{ borderColor: "var(--hair)" }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
              style={{ background: "linear-gradient(to right, var(--paper-1), transparent)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
              style={{ background: "linear-gradient(to left, var(--paper-1), transparent)" }}
              aria-hidden
            />
            <div className="marquee">
              {[0, 1].map((group) => (
                <div className="marquee-group" key={group} aria-hidden={group === 1}>
                  {marqueeQuotes.map((qt, i) => (
                    <figure
                      key={group + "-" + i}
                      className="flex w-[78vw] max-w-[460px] shrink-0 flex-col justify-between gap-6 border-r px-7 py-8 md:w-[440px] md:px-9 md:py-9"
                      style={{ borderColor: "var(--hair)" }}
                    >
                      <blockquote className="text-[17.5px] leading-[1.55] text-ink-0">
                        <span className="mr-1 text-ink-3">&ldquo;</span>
                        {qt.q}
                        <span className="ml-0.5 text-ink-3">&rdquo;</span>
                      </blockquote>
                      <figcaption className="caps text-[10.5px] font-semibold text-ink-3">
                        {qt.a}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Trust ledger */}
        <Reveal delay={0.05}>
          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-2"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-ink-3" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-6 caps text-[10px] font-medium text-ink-3">
          Illustrative pre-launch figures &amp; early feedback · describes feel
          &amp; finish only
        </p>
      </Container>
    </section>
  );
}
