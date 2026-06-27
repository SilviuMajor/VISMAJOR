"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { ProductShot } from "@/components/product/ProductShot";
import { ShieldIcon, CoolingIcon, DropletIcon, ShirtIcon } from "@/components/ui/Icons";

/**
 * "One job. Done well." — the single-purpose points sat beside the dispensed
 * shot. Replaces the old How-It-Works steps and folds in the former Features
 * grid, so the point is made once. Claim-safe: feel and look only.
 */
const POINTS = [
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

export function OneJob() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="relative overflow-hidden py-16 md:py-24">
      {/* a classical figure, facing in — faint multiply on white, like the
          Architecture one, but on the opposite side for variety */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[5%] left-[-9%] z-0 hidden w-[32vw] sm:block lg:w-[25vw]"
      >
        <Image
          src="/figures/gyno-3.png"
          alt=""
          width={1122}
          height={1402}
          sizes="32vw"
          className="h-auto w-full opacity-[0.12] mix-blend-multiply"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 50%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 50%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <SectionHead n="01" title="One job. Done well." />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {/* the points — 2 × 2 */}
          <motion.div
            className="grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
            }}
          >
            {POINTS.map((p) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 14 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.2, 0, 0, 1] },
                  },
                }}
                className="group flex flex-col gap-4"
              >
                <p.Icon
                  size={36}
                  className="text-ink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <h4
                  className="caps mt-1 whitespace-pre-line text-[15.5px] font-bold leading-snug text-ink-0"
                  style={{ letterSpacing: "0.07em" }}
                >
                  {p.title}
                </h4>
                <p className="text-[15.5px] leading-relaxed text-ink-2">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* the dispensed shot */}
          <div className="relative flex items-center justify-center">
            <span className="absolute left-4 top-3 z-10 caps text-[9px] font-medium text-ink-3">
              On Contact
            </span>
            <Parallax amount={20} className="w-full px-6 py-8">
              <ProductShot
                src="/product/squeeze.png"
                alt="GY-NO! cream being dispensed from the tube"
                melt
                sizes="(max-width: 1024px) 80vw, 380px"
              />
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
