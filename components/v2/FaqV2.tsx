"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { RomanBehind } from "@/components/ui/RomanBehind";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.2, 0, 0, 1] as const;
const INK_OPEN = "#14130F";

const FAQS = [
  {
    q: "How fast does it work?",
    a: "Cooling and tightening take hold within minutes of applying.",
  },
  {
    q: "How long does it last?",
    a: "A temporary effect, typically around 30 to 60 minutes. Reapply whenever you like.",
  },
  {
    q: "Is it discreet?",
    a: "Yes. A pocket-size tube, non-greasy and fast-drying, with a light fragrance.",
  },
  {
    q: "Who is it for?",
    a: "Any man who wants a quick confidence boost — gym, beach, a night out, or just a fitted shirt.",
  },
  {
    q: "Is it safe?",
    a: "It is a cosmetic product made to UK standards. Patch test before first use and avoid broken skin.",
  },
  {
    q: "When will my pre-order ship?",
    a: "The first batch ships in the launch month shown at checkout. You'll get confirmation and tracking by email.",
  },
];

function Row({
  index,
  q,
  a,
  isOpen,
  onToggle,
}: {
  index: string;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b" style={{ borderColor: "var(--hair)" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-5 py-6 text-left md:gap-7"
      >
        {/* big numeral — ink, only when open */}
        <span
          className="shrink-0 font-bold tabular-nums transition-colors duration-200"
          style={{
            fontSize: "clamp(20px, 2.2vw, 28px)",
            letterSpacing: "-0.02em",
            color: isOpen ? INK_OPEN : "var(--ink-3)",
          }}
        >
          {index}
        </span>

        <span className="flex-1 caps text-[15px] font-semibold leading-snug text-ink-0 md:text-[17px]">
          {q}
        </span>

        {/* hairline plus that rotates */}
        <span
          aria-hidden
          className="relative ml-2 mt-0.5 h-3.5 w-3.5 shrink-0"
        >
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink-0" />
          <motion.span
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink-0"
            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.24, ease: EASE }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[calc(clamp(20px,2.2vw,28px)+1.25rem)] pr-8 md:pl-[calc(clamp(20px,2.2vw,28px)+1.75rem)]">
              <p className="max-w-2xl text-[16.5px] leading-[1.7] text-ink-1">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function FaqV2({ shipMonth }: { shipMonth: string }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      className="relative overflow-hidden border-y py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <RomanBehind figure="/figures/gyno-2.png" side="left" />
      <Container className="relative z-10">
        <div className="mb-9 flex items-baseline gap-4">
          <span className="text-[13px] font-medium text-ink-3">06</span>
          <h3
            className="m-0 font-bold tracking-tight text-ink-0"
            style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
          >
            FAQ.
          </h3>
          <span className="h-px flex-1 bg-[var(--hair)]" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[4fr_8fr] lg:gap-16">
          {/* designed left rail */}
          <Reveal>
            <div className="lg:sticky lg:top-16">
              <h3
                className="font-bold uppercase text-ink-0"
                style={{
                  fontSize: "clamp(40px, 5vw, 68px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.96,
                }}
              >
                Everything,
                <br />
                upfront.
              </h3>

              <p className="mt-6 max-w-sm text-[16.5px] leading-[1.6] text-ink-2">
                No fine print, no mystery. The honest answers to what people
                actually ask.
              </p>

              {/* contact — plain, divided by a single hairline */}
              <a
                href="mailto:hello@vismajor.co.uk"
                className="group mt-8 flex items-center justify-between gap-4 border-t pt-6 transition-colors duration-200"
                style={{ borderColor: "var(--hair)" }}
              >
                <span className="flex flex-col">
                  <span className="caps text-[10px] font-semibold text-ink-3">
                    Still wondering
                  </span>
                  <span className="mt-1 text-[15px] font-semibold text-ink-0 underline-offset-4 group-hover:underline">
                    hello@vismajor.co.uk
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-lg leading-none text-ink-2 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>

              <p className="mt-5 caps text-[10px] font-medium text-ink-3">
                First batch ships {shipMonth}
              </p>
            </div>
          </Reveal>

          {/* numbered accordion */}
          <Reveal delay={0.05}>
            <ul className="border-t" style={{ borderColor: "var(--hair-strong)" }}>
              {FAQS.map((f, i) => (
                <Row
                  key={f.q}
                  index={String(i + 1).padStart(2, "0")}
                  q={f.q}
                  a={f.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
