"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EMBER } from "@/components/chisel/Art";

const EASE = [0.2, 0, 0, 1] as const;

const FAQS = [
  {
    q: "How do I use the steel tool?",
    a: "Warm a thin layer of cream into the skin, then draw the tool along the contour in slow, firm strokes — edge to the skin, jaw down to neck, across the chest, along the midsection. About a minute per area is plenty.",
  },
  {
    q: "What does the warming feel like?",
    a: "A gentle, building warmth as you massage — the foil to a cooling product. It opens the skin and gives the tool its glide. It should feel pleasant, never hot. Patch test first.",
  },
  {
    q: "Where on the body can I use it?",
    a: "Jaw and neck, chest, arms and midsection — anywhere you want a firmer, more defined look. For external use on unbroken skin only. Avoid the eyes.",
  },
  {
    q: "How long does the look last?",
    a: "It's temporary. The defined, firmer-looking finish reads for a while after you work it in, then fades. Reapply whenever you want it back — it lasts for as long as you need it to read sharp.",
  },
  {
    q: "Is it permanent? Does it change my body?",
    a: "No. CHISEL is a cosmetic. It changes how the skin looks and feels for a short time — it does not burn fat, build muscle, or alter your body in any way. The effect washes off.",
  },
  {
    q: "Is the steel tool included?",
    a: "It depends on the set. The Cream-only tier is the cream by itself. The System and the 2-pack both include the weighted steel tool. You can see exactly what's in each set on the pre-order panel.",
  },
  {
    q: "When will my pre-order ship?",
    a: "The first batch ships in the launch month shown at checkout. Because each tool is machined to order the first run is limited — you'll get confirmation and tracking by email.",
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
        {/* big numeral — the one warm accent, only when open */}
        <span
          className="shrink-0 font-bold tabular-nums transition-colors duration-200"
          style={{
            fontSize: "clamp(20px, 2.2vw, 28px)",
            letterSpacing: "-0.02em",
            color: isOpen ? EMBER : "var(--ink-3)",
          }}
        >
          {index}
        </span>

        <span className="flex-1 caps text-[15px] font-semibold leading-snug text-ink-0 md:text-[17px]">
          {q}
        </span>

        <span aria-hidden className="relative ml-2 mt-0.5 h-3.5 w-3.5 shrink-0">
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
              <p className="max-w-2xl text-[16.5px] leading-[1.7] text-ink-1">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ChiselFaq({ shipMonth }: { shipMonth: string }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="border-y bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
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
          <Reveal>
            <div className="lg:sticky lg:top-16">
              <h3
                className="font-bold uppercase text-ink-0"
                style={{ fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "-0.025em", lineHeight: 0.96 }}
              >
                The tool,
                <br />
                explained.
              </h3>

              <p className="mt-6 max-w-sm text-[16.5px] leading-[1.6] text-ink-2">
                How the steel works, where it goes, and how long the look holds.
                The honest answers, upfront.
              </p>

              <a
                href="mailto:hello@gy-no.co.uk"
                className="group mt-8 flex items-center justify-between gap-4 rounded-sm border bg-paper-0 px-5 py-4 transition-colors duration-200 hover:bg-paper-2"
                style={{ borderColor: "var(--hair-strong)" }}
              >
                <span className="flex flex-col">
                  <span className="caps text-[10px] font-semibold text-ink-3">
                    Still wondering
                  </span>
                  <span className="mt-1 text-[15px] font-semibold text-ink-0">
                    hello@gy-no.co.uk
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
