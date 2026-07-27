"use client";

import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

export function ProofV2() {
  const reduce = useReducedMotion();
  const marqueeQuotes = [...QUOTES, ...QUOTES];

  return (
    <section
      id="proof"
      className="overflow-hidden border-y bg-ink-0 py-14 md:py-20"
      style={{ borderColor: "rgba(244,242,236,0.14)" }}
    >
      <Container>
        {/* ── Masthead ─────────────────────────────────────────── */}
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <span className="caps-loose text-[11px] font-semibold text-paper-0">
              Early Testers
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper-0/60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper-0" />
              </span>
              <span className="caps text-[10px] font-semibold text-paper-0/70">
                Ships September 2026
              </span>
            </span>
          </div>
        </Reveal>

        {/* ── Lead ─────────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div
            className="mt-6 border-t pt-7"
            style={{ borderColor: "rgba(244,242,236,0.28)" }}
          >
            <p className="max-w-xl text-[16.5px] leading-[1.6] text-paper-0">
              Tried before release by testers across the UK.{" "}
              <span className="num font-semibold">£18</span> for a 20ml tube, with
              free UK delivery.
            </p>
          </div>
        </Reveal>

        {/* ── Quote marquee ────────────────────────────────────── */}
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

        {/* ── Trust ledger ─────────────────────────────────────── */}
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
