"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/* ── Allocation ───────────────────────────────────────────────── */
const RESERVED_PCT = 68;
const SEGMENTS = 40; // segmented meter resolution
const FILLED = Math.round((RESERVED_PCT / 100) * SEGMENTS);

/* ── Illustrative early-tester roster (initials only) ─────────────
   Used for the avatar stack + the rolling "recently reserved" line.
   Pre-launch & illustrative — no real personal data. */
const ROSTER = [
  { in: "JM", city: "London" },
  { in: "TA", city: "Manchester" },
  { in: "RK", city: "Leeds" },
  { in: "DC", city: "Bristol" },
  { in: "SW", city: "Glasgow" },
  { in: "HB", city: "Sheffield" },
  { in: "NP", city: "Cardiff" },
  { in: "OE", city: "Liverpool" },
];

const QUOTES = [
  {
    q: "Cool, sharp, and gone in seconds. Exactly the kind of edge I wanted before a night out.",
    a: "Early tester · London",
  },
  {
    q: "The packaging alone sold me. Then it actually delivered the cool, composed feel it promises.",
    a: "Early tester · Manchester",
  },
  {
    q: "Discreet, fast, no mess. It does one job and does it properly.",
    a: "Early tester · Leeds",
  },
];

const TRUST = [
  "Made in the UK",
  "Cruelty-Free",
  "Cosmetic-Grade",
  "Secure Checkout",
  "30-Day Returns",
];

/* ── Rolling "recently reserved" activity line ───────────────────── */
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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper-0/60 opacity-60" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper-0" />
      </span>
      <span className="caps text-[10px] font-semibold text-paper-0">
        Recently reserved
      </span>
      <span className="h-3 w-px bg-[rgba(244,242,236,0.28)]" aria-hidden />
      <span className="relative h-[14px] min-w-[150px] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={reduce ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 caps text-[10px] font-semibold text-paper-0"
          >
            {person.in} · {person.city}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

/* ── Segmented allocation meter ──────────────────────────────────── */
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
            style={{ background: filled ? "var(--paper-0)" : "rgba(244,242,236,0.18)" }}
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

export function ProofV2() {
  // Doubled for a seamless marquee loop.
  const marqueeQuotes = [...QUOTES, ...QUOTES];

  return (
    <section
      className="overflow-hidden border-y bg-ink-0 py-16 md:py-24"
      style={{ borderColor: "rgba(244,242,236,0.14)" }}
    >
      <Container>
        {/* ── Masthead ─────────────────────────────────────────── */}
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <span className="caps-loose text-[11px] font-semibold text-paper-0">
              The First-Batch List
            </span>
            <RecentlyReserved />
          </div>
        </Reveal>

        {/* ── Hero stat ledger ─────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div
            className="mt-7 grid grid-cols-1 items-end gap-x-10 gap-y-9 border-t pt-8 md:grid-cols-[auto_1fr]"
            style={{ borderColor: "rgba(244,242,236,0.28)" }}
          >
            <div>
              <div className="flex items-end gap-3 md:gap-5">
                <span
                  className="font-extrabold text-paper-0"
                  style={{
                    fontSize: "clamp(72px, 11vw, 150px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.82,
                  }}
                >
                  <Counter value={2000} />+
                </span>
                <span
                  className="font-extrabold uppercase text-paper-0"
                  style={{
                    fontSize: "clamp(24px, 3.6vw, 56px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.9,
                  }}
                >
                  Pre-
                  <br />
                  orders
                </span>
              </div>
            </div>

            <p className="max-w-sm pb-1 text-[16.5px] leading-[1.6] text-paper-0 md:justify-self-end">
              Pre-order locks the early-bird price and your place in the queue.
              The first production run is limited.
            </p>
          </div>
        </Reveal>

        {/* ── Allocation meter ─────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="mt-14">
            <div className="flex items-end justify-between">
              <span className="caps text-[11px] font-semibold text-paper-0">
                First batch · early-bird allocation
              </span>
              <span className="flex items-baseline gap-2">
                <span
                  className="font-extrabold text-paper-0"
                  style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.03em" }}
                >
                  <Counter value={RESERVED_PCT} />%
                </span>
                <span className="caps text-[10.5px] font-semibold text-paper-0">reserved</span>
              </span>
            </div>
            <div className="mt-4">
              <AllocationMeter />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="caps text-[10.5px] font-medium text-paper-0">
                Limited early-bird units left at £24
              </span>
              <span className="caps text-[10.5px] font-medium text-paper-0">
                RRP £32 once it ships
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Quote marquee ────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div
            className="relative mt-14 overflow-hidden border-y py-1"
            style={{ borderColor: "rgba(244,242,236,0.12)" }}
          >
            {/* edge fades */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
              style={{
                background:
                  "linear-gradient(to right, var(--ink-0), transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
              style={{
                background:
                  "linear-gradient(to left, var(--ink-0), transparent)",
              }}
              aria-hidden
            />
            <div className="marquee">
              {[0, 1].map((group) => (
                <div className="marquee-group" key={group} aria-hidden={group === 1}>
                  {marqueeQuotes.map((qt, i) => (
                    <figure
                      key={group + "-" + i}
                      className="flex w-[78vw] max-w-[460px] shrink-0 flex-col justify-between gap-6 border-r px-7 py-8 md:w-[440px] md:px-9 md:py-9"
                      style={{ borderColor: "rgba(244,242,236,0.12)" }}
                    >
                      <blockquote className="text-[17.5px] leading-[1.55] text-paper-0">
                        <span className="mr-1 text-paper-0">&ldquo;</span>
                        {qt.q}
                        <span className="ml-0.5 text-paper-0">&rdquo;</span>
                      </blockquote>
                      <figcaption className="caps text-[10.5px] font-semibold text-paper-0">
                        {qt.a}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Trust ledger ─────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-paper-0"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-paper-0/45" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-6 caps text-[10px] font-medium text-paper-0">
          Illustrative pre-launch figures &amp; early feedback · describes feel
          &amp; finish only
        </p>
      </Container>
    </section>
  );
}
