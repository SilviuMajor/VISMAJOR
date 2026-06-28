"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/* ── Allocation ───────────────────────────────────────────────────
   The constraint here is the optional *steel tools* — each one is machined,
   so the first run is small. Distinct from GY-NO!'s units angle. */
const RESERVED_PCT = 74;
const SEGMENTS = 40;
const FILLED = Math.round((RESERVED_PCT / 100) * SEGMENTS);

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

export function ChiselProof() {
  const reduce = useReducedMotion();
  const marqueeQuotes = [...QUOTES, ...QUOTES];

  return (
    <section
      className="overflow-hidden border-y bg-ink-0 py-14 md:py-20"
      style={{ borderColor: "rgba(244,242,236,0.14)" }}
    >
      <Container>
        {/* Masthead */}
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <span className="caps-loose text-[11px] font-semibold text-paper-0">
              The First-Batch List
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper-0/60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper-0" />
              </span>
              <span className="caps text-[10px] font-semibold text-paper-0/70">
                Early-bird open
              </span>
            </span>
          </div>
        </Reveal>

        {/* Hero stat ledger */}
        <Reveal delay={0.05}>
          <div
            className="mt-6 grid grid-cols-1 items-end gap-x-12 gap-y-7 border-t pt-7 lg:grid-cols-[auto_1fr]"
            style={{ borderColor: "rgba(244,242,236,0.28)" }}
          >
            <div className="flex items-end gap-3 md:gap-5">
              <span
                className="font-extrabold text-paper-0"
                style={{
                  fontSize: "clamp(70px, 10.5vw, 142px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.82,
                }}
              >
                <Counter value={1400} />+
              </span>
              <span
                className="font-extrabold uppercase text-paper-0"
                style={{
                  fontSize: "clamp(23px, 3.4vw, 52px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.9,
                }}
              >
                Pre-
                <br />
                orders
              </span>
            </div>

            <p className="max-w-md pb-1 text-[16.5px] leading-[1.6] text-paper-0 lg:justify-self-end">
              Deliveries start <span className="font-semibold">September 2026</span>.
              Order now to lock the early-bird{" "}
              <span className="font-semibold">£28</span> — it rises to{" "}
              <span className="text-paper-0/45 line-through">£38</span> at launch
              — and hold your place in a limited first run.
            </p>
          </div>
        </Reveal>

        {/* Allocation meter */}
        <Reveal delay={0.05}>
          <div className="mt-10">
            <div className="flex items-end justify-between">
              <span className="caps text-[11px] font-semibold text-paper-0">
                First steel-tool run · early-bird allocation
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
              <span className="caps text-[10.5px] font-medium text-paper-0/70">
                Limited first-batch units
              </span>
              <span className="caps text-[10.5px] font-medium text-paper-0/70">
                Price rises at launch
              </span>
            </div>
          </div>
        </Reveal>

        {/* Quote marquee */}
        <Reveal delay={0.05}>
          <div
            className="relative mt-10 overflow-hidden border-y py-1"
            style={{ borderColor: "rgba(244,242,236,0.12)" }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
              style={{ background: "linear-gradient(to right, var(--ink-0), transparent)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
              style={{ background: "linear-gradient(to left, var(--ink-0), transparent)" }}
              aria-hidden
            />
            <div className="marquee">
              {[0, 1].map((group) => (
                <div className="marquee-group" key={group} aria-hidden={group === 1}>
                  {marqueeQuotes.map((qt, i) => (
                    <figure
                      key={group + "-" + i}
                      className="flex w-[78vw] max-w-[440px] shrink-0 flex-col justify-between gap-5 border-r px-7 py-6 md:w-[420px] md:px-9"
                      style={{ borderColor: "rgba(244,242,236,0.12)" }}
                    >
                      <blockquote className="text-[16.5px] leading-[1.5] text-paper-0">
                        &ldquo;{qt.q}&rdquo;
                      </blockquote>
                      <figcaption className="caps text-[10.5px] font-semibold text-paper-0/70">
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
          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-paper-0/70"
              >
                <span className="inline-block h-1 w-1 rounded-full bg-paper-0/45" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
