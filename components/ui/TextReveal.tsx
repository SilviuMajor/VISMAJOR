"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * Clip-reveal for display headlines. Each line sits in an overflow-hidden
 * box and rises into place with a short, mechanical ease — on brand.
 */
export function TextReveal({
  lines,
  className = "",
  delay = 0,
  stagger = 0.08,
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "div";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const line: Variants = {
    hidden: { y: reduce ? 0 : "115%" },
    show: {
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Comp
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span variants={line} className="block">
            {l}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
