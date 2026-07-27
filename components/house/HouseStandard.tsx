"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PRODUCTS } from "@/lib/products";

/**
 * The house story, folded into The Standard rather than given its own About
 * page: who makes this, where, and why. Kept to four short blocks so the
 * homepage still ends quietly.
 *
 * PLACEHOLDER: "Made in the UK" carries no manufacturer. Name the actual
 * formulating and filling partner before launch, and add the founding
 * specifics (who, when, what prompted it) once they can be stated truthfully.
 * A story only works if it is true and specific.
 */
const STORY: { n: string; title: string; body: React.ReactNode }[] = [
  {
    n: "01",
    title: "Why it exists",
    body: (
      <>
        Men&rsquo;s grooming sells one of two things: a twelve-step routine
        nobody keeps, or a joke about not caring. This is the third option.
      </>
    ),
  },
  {
    n: "02",
    title: "One job each",
    body: (
      <>
        PECTUS cools the chest. STONE takes the day off your face. SCULPT is
        worked into muscle after training, by hand or with STEEL. Nothing here
        is a treatment, and the label says so.
      </>
    ),
  },
  {
    n: "03",
    title: "Made in the UK",
    body: (
      <>
        Formulated and filled in the United Kingdom, in small runs, to UK
        cosmetic regulation. Small runs because a standard is easier to hold
        than to recover.
      </>
    ),
  },
  {
    n: "04",
    title: "The name",
    body: (
      <>
        <span className="italic">Vis major</span> is the Roman legal term for an
        unstoppable force: a power beyond resistance. The right register for a
        house that would rather be plain than loud.
      </>
    ),
  },
];

export function HouseStandard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section
      id="standard"
      className="relative scroll-mt-[92px] overflow-hidden border-y"
      style={{ borderColor: "var(--hair)" }}
    >
      {/* The standard. The parallax figure is scoped to this block, so the
          story band below sits on clean paper and the figure keeps the exact
          scroll range it always had. */}
      <div ref={ref} className="relative">
        {/* Classical figure — desktop: absolute on the right, soft grey figure on white */}
        <motion.div
          style={{ y }}
          className="pointer-events-none absolute inset-y-0 right-[-2%] z-0 hidden w-[48vw] sm:block lg:w-[42vw]"
        >
          <Image
            src="/figures/general.png"
            alt="A classical figure, the standard"
            fill
            sizes="48vw"
            className="object-contain object-bottom opacity-[0.5] mix-blend-multiply"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 42%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 42%)",
            }}
          />
        </motion.div>

        <Container className="relative z-20">
          <div className="flex flex-col justify-center py-20 sm:min-h-screen sm:py-28">
            <Eyebrow>The Standard</Eyebrow>
            <h2
              className="mt-7 font-bold uppercase text-ink-0"
              style={{ fontSize: "clamp(40px, 6.5vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
            >
              One job.
              <br />
              Done well.
            </h2>
            <p className="mt-7 max-w-md text-[16.5px] leading-[1.6] text-ink-2">
              VIS MAJOR makes precision topicals for men. No theatre, no promises we
              cannot keep. Cosmetic, temporary by design, each engineered to do
              exactly one thing. Made in the UK, to one standard.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {PRODUCTS.map((p) => (
                <a key={p.slug} href={p.href} className="group inline-flex items-center gap-2.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--ink-4)" }}
                  />
                  <span className="caps text-[11.5px] font-medium text-ink-1 transition-colors group-hover:text-ink-0">
                    {p.wordmark}
                  </span>
                </a>
              ))}
            </div>

            {/* figure — mobile: in flow, below the copy */}
            <div className="relative mt-12 h-[46vh] w-full sm:hidden">
              <Image
                src="/figures/general.png"
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-center opacity-[0.5] mix-blend-multiply"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 20%, black 82%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent, black 20%, black 82%, transparent)",
                }}
              />
            </div>

            <p className="mt-12 max-w-md text-[13px] italic leading-relaxed text-ink-3 sm:mt-14">
              The figure was always in the marble. The work is only in revealing it.
            </p>
          </div>
        </Container>
      </div>

      {/* The house — the story, folded in under the standard rather than
          exiled to an About page nobody opens. */}
      <div className="border-t" style={{ borderColor: "var(--hair)" }}>
        <Container>
          <div className="py-20 sm:py-24">
            <Eyebrow>The House</Eyebrow>

            <p className="mt-7 max-w-md text-[16.5px] leading-[1.6] text-ink-2">
              Who makes this, where, and why it is built the way it is.
            </p>

            <div className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
              {STORY.map((s) => (
                <div
                  key={s.n}
                  className="border-t pt-6"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-medium text-ink-3">
                      {s.n}
                    </span>
                    <h3 className="caps text-[11px] font-semibold text-ink-0">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3.5 max-w-sm text-[14.5px] leading-[1.7] text-ink-2">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
