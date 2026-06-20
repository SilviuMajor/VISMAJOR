"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import {
  ShieldIcon,
  CoolingIcon,
  DropletIcon,
  ShirtIcon,
} from "@/components/ui/Icons";

type Feature = {
  idx: string;
  Icon: (p: { size?: number; className?: string }) => JSX.Element;
  title: string;
  body: string;
  note: string;
};

const FEATURES: Feature[] = [
  {
    idx: "i",
    Icon: ShieldIcon,
    title: "Formulated for Men",
    body: "A precision topical engineered around a single, deliberate result.",
    note: "Single intent",
  },
  {
    idx: "ii",
    Icon: CoolingIcon,
    title: "Cools on Contact, Firms & Tightens",
    body: "A menthol cooling complex you feel on application. Visibly firmer.",
    note: "Felt instantly",
  },
  {
    idx: "iii",
    Icon: DropletIcon,
    title: "Fast-Absorbing, Matte Finish",
    body: "No residue, no shine. Dries down clean within moments.",
    note: "No trace",
  },
  {
    idx: "iv",
    Icon: ShirtIcon,
    title: "Lightly Fragranced, Undetectable",
    body: "Sits invisibly under any shirt. Pocket-size, go-out ready.",
    note: "Wears unseen",
  },
];

export function FeaturesV2() {
  const reduce = useReducedMotion();

  const row: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="01" title="One job. Done well." />

        {/* Lede — sets the editorial register before the ledger */}
        <Lede reduce={reduce} />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
          }}
          className="mt-12 border-t md:mt-16"
          style={{ borderColor: "var(--hair)" }}
        >
          {FEATURES.map((f) => (
            <motion.li
              key={f.title}
              variants={row}
              className="group relative border-b"
              style={{ borderColor: "var(--hair)" }}
            >
              {/* hairline that wipes across the row on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--hair-strong)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <div className="grid grid-cols-[auto_1fr] items-start gap-x-6 py-9 sm:gap-x-9 md:grid-cols-[5.5rem_8.5rem_1fr_auto] md:items-center md:gap-x-10 md:py-11">
                {/* Roman index */}
                <span
                  className="caps select-none pt-1 text-[12px] font-semibold text-ink-3 transition-colors duration-300 group-hover:text-ink-1 md:pt-0"
                  aria-hidden
                >
                  {f.idx}
                </span>

                {/* Expressive icon, draws + lifts on hover */}
                <div className="row-span-2 mt-1 md:row-span-1 md:mt-0">
                  <DrawIcon Icon={f.Icon} reduce={reduce} />
                </div>

                {/* Title + body */}
                <div className="col-start-2 md:col-start-3">
                  <h4
                    className="text-ink-0"
                    style={{
                      fontSize: "clamp(20px, 2.4vw, 28px)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      fontWeight: 700,
                    }}
                  >
                    {f.title}
                  </h4>
                  <p className="mt-3 max-w-[46ch] text-[16.5px] leading-relaxed text-ink-2">
                    {f.body}
                  </p>
                </div>

                {/* Right-aligned micro-label, slides in on hover */}
                <span className="col-start-2 mt-4 inline-flex items-center gap-2.5 md:col-start-4 md:mt-0 md:justify-self-end">
                  <span
                    aria-hidden
                    className="hidden h-px w-6 bg-[var(--hair-strong)] transition-all duration-300 group-hover:w-9 md:block"
                  />
                  <span className="caps text-[10px] font-medium text-ink-3 transition-colors duration-300 group-hover:text-ink-1">
                    {f.note}
                  </span>
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}

/* ---- Lede line ---- */
function Lede({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="max-w-[52ch] text-ink-1"
      style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.45, letterSpacing: "-0.01em" }}
    >
      No fifteen-step routine. Four things it does, and nothing it doesn&rsquo;t.
    </motion.p>
  );
}

/* ---- Icon with a stroke draw-in on scroll + hover lift ---- */
function DrawIcon({
  Icon,
  reduce,
}: {
  Icon: (p: { size?: number; className?: string }) => JSX.Element;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="relative inline-flex h-16 w-16 items-center justify-center rounded-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
      style={{ border: "1px solid var(--hair)" }}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, scale: 0.92 },
              show: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }
      }
    >
      {/* corner ticks — apothecary register mark */}
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <Icon
        size={34}
        className="text-ink-0 transition-colors duration-300"
      />
    </motion.div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-1.5 w-1.5 ${className}`}
      style={{
        borderTop: "1px solid var(--hair-strong)",
        borderLeft: "1px solid var(--hair-strong)",
      }}
    />
  );
}
