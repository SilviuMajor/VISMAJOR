"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const RESERVED_PCT = 68;

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

export function Proof() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y bg-paper-1 py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
      <Container>
        {/* Count + intro */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
            <div>
              <span className="caps-loose text-[11px] font-semibold text-ink-2">
                The First-Batch List
              </span>
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  className="font-extrabold text-ink-0"
                  style={{ fontSize: "clamp(64px, 9vw, 124px)", letterSpacing: "-0.035em", lineHeight: 0.86 }}
                >
                  <Counter value={2000} />+
                </span>
                <span className="caps pb-2 text-[12px] font-semibold text-ink-2">men reserved</span>
              </div>
            </div>
            <p className="max-w-sm text-[16.5px] leading-[1.6] text-ink-2">
              Pre-order locks the early-bird price and your place in the queue.
              The first production run is limited.
            </p>
          </div>
        </Reveal>

        {/* Reservation progress */}
        <Reveal delay={0.05}>
          <div className="mt-12">
            <div className="flex items-end justify-between">
              <span className="caps text-[11px] font-semibold text-ink-1">
                First batch · early-bird allocation
              </span>
              <span className="caps text-[11px] font-semibold text-ink-0">
                <Counter value={RESERVED_PCT} />% reserved
              </span>
            </div>
            <div
              className="mt-3 h-2.5 w-full overflow-hidden rounded-pill"
              style={{ background: "var(--hair)" }}
            >
              <motion.div
                className="h-full rounded-pill bg-ink-0"
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${RESERVED_PCT}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="caps text-[10.5px] font-medium text-ink-2">
                Limited early-bird units left at £24
              </span>
              <span className="caps text-[10.5px] font-medium text-ink-3">
                RRP £32 once it ships
              </span>
            </div>
          </div>
        </Reveal>

        {/* Quotes */}
        <div
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-3"
          style={{ borderColor: "var(--hair)", backgroundColor: "var(--hair)" }}
        >
          {QUOTES.map((qt, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="flex flex-col justify-between gap-8 bg-paper-1 p-8 md:p-9"
            >
              <p className="text-[17.5px] leading-[1.55] text-ink-0">
                <span className="mr-1 text-ink-3">“</span>
                {qt.q}
                <span className="ml-0.5 text-ink-3">”</span>
              </p>
              <span className="caps text-[10.5px] font-semibold text-ink-3">{qt.a}</span>
            </Reveal>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {["Made in the UK", "Cruelty-Free", "Cosmetic-Grade", "Secure Checkout", "30-Day Returns"].map((t) => (
            <span key={t} className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-3">
              <span className="inline-block h-1 w-1 rounded-full bg-ink-3" />
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 caps text-[10px] font-medium text-ink-3">
          Illustrative pre-launch figures &amp; early feedback · describes feel &amp; finish only
        </p>
      </Container>
    </section>
  );
}
