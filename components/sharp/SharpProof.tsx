"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/* Allocation — segmented, STONE-flavoured. */
const RESERVED_PCT = 61;
const SEGMENTS = 40;
const FILLED = Math.round((RESERVED_PCT / 100) * SEGMENTS);

const QUOTES = [
  {
    q: "Thirty seconds at the sink, morning and night. The day comes straight off — skin feels clean, never tight.",
    a: "Early tester · London",
  },
  {
    q: "Cuts the grime most face washes leave behind. Rinses clear, no squeaky-tight pull, just fresh skin.",
    a: "Early tester · Manchester",
  },
  {
    q: "Skin looks clearer somehow — less shine, more life. It's become part of the routine.",
    a: "Early tester · Leeds",
  },
];

const TRUST = [
  "Made in the UK",
  "Cruelty-Free",
  "Cosmetic-Grade",
  "Fragrance-Light",
  "30-Day Returns",
];

/* Segmented allocation meter. */
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

export function SharpProof() {
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
            <span className="caps-loose text-[11px] font-medium text-paper-0">
              The First-Batch List
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper-0/60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper-0" />
              </span>
              <span className="caps text-[10px] font-medium text-paper-0/70">
                Early-bird open
              </span>
            </span>
          </div>
        </Reveal>

        {/* Hero stat ledger — the daily-driver angle */}
        <Reveal delay={0.05}>
          <div
            className="mt-6 grid grid-cols-1 items-end gap-x-12 gap-y-7 border-t pt-7 lg:grid-cols-[auto_1fr]"
            style={{ borderColor: "rgba(244,242,236,0.28)" }}
          >
            <div>
              <div className="flex items-end gap-3 md:gap-4">
                <span
                  className="stat-tab font-semibold text-paper-0"
                  style={{
                    fontSize: "clamp(60px, 9vw, 128px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.82,
                  }}
                >
                  <Counter value={1400} />+
                </span>
                <span
                  className="font-bold uppercase text-paper-0"
                  style={{
                    fontSize: "clamp(22px, 3.1vw, 48px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.9,
                  }}
                >
                  Pre-
                  <br />
                  orders
                </span>
              </div>
              <p className="mt-4 caps text-[11px] font-medium text-paper-0">
                The one they reach for at 7am.
              </p>
            </div>

            <p className="max-w-md pb-1 text-[16.5px] leading-[1.6] text-paper-0 lg:justify-self-end">
              Deliveries start <span className="font-semibold">September 2026</span>.
              Order now to lock the early-bird{" "}
              <span className="font-mono font-semibold">£22</span> — it rises to{" "}
              <span className="font-mono text-paper-0/45 line-through">£30</span> at launch
              — and hold your place in a limited first run.
            </p>
          </div>
        </Reveal>

        {/* Allocation meter */}
        <Reveal delay={0.05}>
          <div className="mt-10">
            <div className="flex items-end justify-between">
              <span className="caps text-[11px] font-medium text-paper-0">
                First batch · early-bird allocation
              </span>
              <span className="flex items-baseline gap-2">
                <span
                  className="stat-tab font-semibold text-paper-0"
                  style={{ fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.03em" }}
                >
                  <Counter value={RESERVED_PCT} />%
                </span>
                <span className="caps text-[10.5px] font-medium text-paper-0">reserved</span>
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
                      <figcaption className="caps text-[10.5px] font-medium text-paper-0/70">
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
                className="caps inline-flex items-center gap-2 text-[10px] font-medium text-paper-0/70"
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
