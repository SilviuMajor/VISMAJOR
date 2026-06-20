"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import {
  ShieldIcon,
  CoolingIcon,
  DropletIcon,
  ShirtIcon,
} from "@/components/ui/Icons";

const FEATURES = [
  {
    Icon: ShieldIcon,
    title: "Formulated\nfor Men",
    body: "A precision topical engineered around a single, deliberate result.",
  },
  {
    Icon: CoolingIcon,
    title: "Cools on Contact,\nFirms & Tightens",
    body: "A menthol cooling complex you feel on application. Visibly firmer.",
  },
  {
    Icon: DropletIcon,
    title: "Fast-Absorbing,\nMatte Finish",
    body: "No residue, no shine. Dries down clean within moments.",
  },
  {
    Icon: ShirtIcon,
    title: "Lightly Fragranced,\nUndetectable",
    body: "Sits invisibly under any shirt. Pocket-size, go-out ready.",
  },
];

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="01" title="One job. Done well." />

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--hair)", backgroundColor: "var(--hair)" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.2, 0, 0, 1] },
                },
              }}
              className="group flex flex-col gap-5 bg-paper-0 p-8 lg:p-9"
            >
              <f.Icon
                size={38}
                className="text-ink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h4
                className="caps mt-2 whitespace-pre-line text-[15.5px] font-bold leading-snug text-ink-0"
                style={{ letterSpacing: "0.07em" }}
              >
                {f.title}
              </h4>
              <p className="text-[15.5px] leading-relaxed text-ink-2">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
