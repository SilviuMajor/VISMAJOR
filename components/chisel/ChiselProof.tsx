"use client";

import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const QUOTES = [
  {
    q: "The slip is the thing: it just keeps gliding, so you can actually work an area. Skin looks tighter for the rest of the night.",
    a: "Early tester · London",
  },
  {
    q: "It feels like a proper ritual, not a quick smear. Jaw and chest read a lot sharper after a minute of work, and the muscle feels eased.",
    a: "Early tester · Bristol",
  },
  {
    q: "Worked it in by hand for a week, then tried the steel. The steel has real weight: you do less and it does more. Looks defined without trying.",
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

export function ChiselProof() {
  const reduce = useReducedMotion();
  const marqueeQuotes = [...QUOTES, ...QUOTES];

  return (
    <section
      id="proof"
      className="overflow-hidden border-y bg-ink-0 py-14 md:py-20"
      style={{ borderColor: "rgba(244,242,236,0.14)" }}
    >
      <Container>
        {/* Masthead */}
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <span className="caps-loose text-[11px] font-medium text-paper-0">
              The Testers
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper-0/60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper-0" />
              </span>
              <span className="caps text-[10px] font-medium text-paper-0/70">
                Open for orders
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
                className="font-bold font-mono text-paper-0"
                style={{
                  fontSize: "clamp(70px, 10.5vw, 142px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.82,
                }}
              >
                <Counter value={60} />s
              </span>
              <span
                className="font-bold uppercase text-paper-0"
                style={{
                  fontSize: "clamp(23px, 3.4vw, 52px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.9,
                }}
              >
                Per
                <br />
                area
              </span>
            </div>

            <p className="max-w-md pb-1 text-[16.5px] leading-[1.6] text-paper-0 lg:justify-self-end">
              About a minute of slow, firm strokes per area, by hand or with the
              optional steel tool. The slip holds long enough to keep working.
              Skin reads firmer and more defined after, for a while, then it
              fades.
            </p>
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
