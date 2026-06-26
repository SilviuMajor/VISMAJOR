"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { ProductShot } from "@/components/product/ProductShot";

const STEPS = [
  { n: "01", title: "Apply", body: "A thin layer to clean, dry skin." },
  { n: "02", title: "Wait", body: "Cooling and tightening within minutes." },
  {
    n: "03",
    title: "Step Out",
    body: "Up to one hour of temporary firmness. Reapply as needed.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="py-16 md:py-24">
      <Container>
        <SectionHead n="02" title="How it works." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {/* Steps */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
            }}
            className="flex flex-col"
          >
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.2, 0, 0, 1] },
                  },
                }}
                className={`flex items-baseline gap-7 py-7 md:gap-10 ${
                  i !== 0 ? "border-t" : ""
                }`}
                style={{ borderColor: "var(--hair)" }}
              >
                <span
                  className="font-light leading-none text-ink-3"
                  style={{ fontSize: "clamp(48px, 6vw, 84px)", letterSpacing: "-0.04em" }}
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className="pt-2">
                  <h4
                    className="caps text-[19px] font-bold text-ink-0"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {s.title}
                  </h4>
                  <p className="mt-2.5 max-w-[34ch] text-[16.5px] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Action shot */}
          <div className="relative flex items-center justify-center">
            <span className="absolute left-4 top-3 z-10 caps text-[9px] font-medium text-ink-3">
              On Contact
            </span>
            <Parallax amount={20} className="w-full px-6 py-8">
              <ProductShot
                src="/product/squeeze.png"
                alt="GY-NO! cream being dispensed from the tube"
                melt
                sizes="(max-width: 1024px) 80vw, 420px"
              />
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  );
}
