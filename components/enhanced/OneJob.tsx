"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ShieldIcon, CoolingIcon, DropletIcon, ShirtIcon } from "@/components/ui/Icons";

/**
 * "One job. Done well." — the PECTUS single-purpose points. Row-of-four layout
 * (Silviu's pick, 3 July 2026): a centred head with the David figure faint
 * directly behind it, then the four icon + text points across a single row.
 * Claim-safe: feel and look only.
 */
const POINTS = [
  {
    Icon: ShieldIcon,
    title: "Formulated for Men",
    body: "A precision topical engineered around a single, deliberate result.",
  },
  {
    Icon: CoolingIcon,
    title: "Cools on Contact, Firms & Tightens",
    body: "A menthol cooling complex you feel on application. Visibly firmer.",
  },
  {
    Icon: DropletIcon,
    title: "Fast-Absorbing, Matte Finish",
    body: "No residue, no shine. Dries down clean within moments.",
  },
  {
    Icon: ShirtIcon,
    title: "Lightly Fragranced, Undetectable",
    body: "Sits invisibly under any shirt. Pocket-size, go-out ready.",
  },
];

export function OneJob() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="relative overflow-hidden py-24 md:py-36">
      {/* the David — faint, centred directly behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 aspect-[3/4] w-[72vw] -translate-x-1/2 sm:w-[48vw] lg:w-[40vw]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
        }}
      >
        <Image
          src="/figures/david.png"
          alt=""
          fill
          sizes="(max-width: 640px) 72vw, 42vw"
          className="object-contain object-center opacity-[0.13] mix-blend-multiply"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        >
          <span className="caps-loose text-[11px] font-medium text-ink-3">
            01 — The Standard
          </span>
          <h3
            className="mt-4 font-semibold tracking-tight text-ink-0"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.02 }}
          >
            One job. Done well.
          </h3>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-2">
            A precision topical engineered around a single, deliberate result —
            the whole product pointed at one thing.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-24 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.08 } },
          }}
        >
          {POINTS.map((p) => (
            <motion.div
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0, 0, 1] } },
              }}
              className="group flex flex-col items-center text-center"
            >
              <p.Icon
                size={34}
                className="text-ink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h4
                className="caps mt-4 text-[13px] font-bold leading-snug text-ink-0"
                style={{ letterSpacing: "0.06em" }}
              >
                {p.title}
              </h4>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
