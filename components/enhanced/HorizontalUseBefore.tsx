"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const OCCASIONS = [
  "The shirt that matters.",
  "The beach.",
  "The night out.",
  "The gym mirror.",
  "The stage.",
];

const HAIR = "rgba(244,242,236,0.16)";

/* Mobile: the list builds inside the pinned viewport. The first slice of the
   pin is the intro beat and the last is a hold on the finished list, so the
   moments land across the middle stretch. Driven off scroll progress rather
   than stacked position:sticky rows, which fight each other's constraints. */
const INTRO_END = 0.14;
const LIST_END = 0.82;

/**
 * "Five moments". Desktop is a pinned horizontal pan. Mobile is a pinned list
 * that builds: each moment lands at the top of the list as you scroll and
 * stays, so by the last one you're looking at the whole list.
 */
export function HorizontalUseBefore() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackX = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  // spring-smooth the horizontal pan so the long track glides instead of
  // tracking every scroll delta 1:1 (which reads as micro-stutter)
  const xSmooth = useSpring(x, { stiffness: 200, damping: 40, restDelta: 0.5 });
  const [maxX, setMaxX] = useState(0);
  const [built, setBuilt] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      if (trackX.current) setMaxX(Math.max(0, trackX.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    x.set(-v * maxX);
    const t = (v - INTRO_END) / (LIST_END - INTRO_END);
    setBuilt(Math.max(0, Math.min(OCCASIONS.length, Math.ceil(t * OCCASIONS.length))));
  });

  return (
    <section id="moments" ref={sectionRef} className="relative h-[420vh] bg-ink-0 text-paper-0 lg:h-[600vh]">
      {/* ---- Mobile / tablet: the list builds inside the pinned viewport ---- */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 pb-20 lg:hidden">
        <div className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/40" />
          <span className="caps-loose text-[11px] font-medium text-paper-0/70">
            Use Before
          </span>
        </div>
        <h2
          className="mt-5 font-bold uppercase text-paper-0"
          style={{ fontSize: "clamp(34px, 9vw, 54px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
        >
          Five moments.
        </h2>

        <ul className="mt-7">
          {OCCASIONS.map((o, i) => {
            const on = i < built;
            return (
              <motion.li
                key={o}
                className="flex items-center gap-5 border-t py-4"
                style={{ borderColor: HAIR }}
                animate={reduce ? { opacity: 1 } : { opacity: on ? 1 : 0.12, y: on ? 0 : 10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="caps w-7 shrink-0 text-[11px] font-medium text-paper-0/45">
                  0{i + 1}
                </span>
                <p
                  className="font-bold uppercase text-paper-0"
                  style={{ fontSize: "clamp(21px, 5.8vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
                >
                  {o}
                </p>
              </motion.li>
            );
          })}
        </ul>

        {/* the close, once the list is built */}
        <motion.div
          className="mt-8"
          animate={reduce ? { opacity: 1 } : { opacity: built >= OCCASIONS.length ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="caps text-[12px] font-medium text-paper-0/55">
            Whenever you want to feel sharper.
          </p>
          <a
            href="#buy"
            className="caps mt-4 inline-flex w-fit items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-7 py-3.5 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
          >
            Pre-order £18
          </a>
        </motion.div>
      </div>

      {/* ---- Desktop: the cinematic horizontal pan ---- */}
      <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
        <motion.div
          ref={trackX}
          style={{ x: reduce ? x : xSmooth }}
          className="flex items-center gap-0 will-change-transform"
        >
          {/* intro panel */}
          <div className="flex min-w-[58vw] flex-col justify-center pl-[16vw] pr-[8vw]">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-8 bg-paper-0/40" />
              <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
                Use Before
              </span>
            </div>
            <h2
              className="mt-7 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(40px, 6vw, 92px)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
            >
              Five
              <br />
              moments.
            </h2>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.6] text-paper-0/55">
              Keep your composure on hand. Scroll →
            </p>
          </div>

          {/* occasion panels */}
          {OCCASIONS.map((o, i) => (
            <div
              key={o}
              className="flex min-w-[48vw] flex-col items-center justify-center border-l px-[6vw] text-center"
              style={{ borderColor: HAIR }}
            >
              <span className="caps text-[12px] font-medium text-paper-0/45">
                0{i + 1}
              </span>
              <p
                className="mt-5 font-bold uppercase text-paper-0"
                style={{ fontSize: "clamp(34px, 4.6vw, 72px)", letterSpacing: "-0.025em", lineHeight: 1.02 }}
              >
                {o}
              </p>
            </div>
          ))}

          {/* outro */}
          <div
            className="flex min-w-[40vw] flex-col justify-center border-l pl-[6vw] pr-[10vw]"
            style={{ borderColor: HAIR }}
          >
            <p className="caps text-[12px] font-medium text-paper-0/55">
              Whenever you want to feel
            </p>
            <p
              className="mt-3 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(34px, 4.4vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Sharper.
            </p>
            <a
              href="#buy"
              className="caps mt-9 inline-flex w-fit items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Pre-order £18
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
