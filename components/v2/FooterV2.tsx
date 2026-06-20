"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Contact", href: "mailto:hello@gy-no.co.uk" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

/* Corner register tick — paper-on-ink. */
function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 ${className}`}
      style={{
        borderTop: "1px solid rgba(244,242,236,0.30)",
        borderLeft: "1px solid rgba(244,242,236,0.30)",
      }}
    />
  );
}

export function FooterV2() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-0 text-paper-0">
      <Container className="relative pb-12 pt-20 md:pt-28">
        {/* Upper grid — identity + structured directory */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          {/* Identity column */}
          <div className="md:col-span-7">
            <p className="caps-loose text-[10px] font-semibold text-paper-0/45">
              The house of
            </p>
            <div
              className="house mt-4 font-light leading-none"
              style={{ fontSize: "clamp(40px, 5.4vw, 82px)" }}
            >
              VIS&nbsp;MAJOR
            </div>
            {/* hairline that draws across under the wordmark */}
            <motion.span
              aria-hidden
              className="mt-7 block h-px max-w-[440px] origin-left"
              style={{ background: "rgba(244,242,236,0.22)" }}
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <p className="caps mt-5 text-[11px] font-medium text-paper-0/55">
              Performance Topicals for Men · Est. MMXXVI
            </p>
            <p className="mt-7 max-w-[440px] text-[10px] leading-[1.8] text-paper-0/45">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition. GY-NO!™ is a product of Vis Major.
            </p>
          </div>

          {/* Directory + home column */}
          <div className="md:col-span-5">
            <p className="caps-loose text-[11px] font-semibold text-paper-0/45">
              Quick Links
            </p>
            <ul
              className="mt-5 border-t"
              style={{ borderColor: "rgba(244,242,236,0.16)" }}
            >
              {LINKS.map((l, i) => (
                <li
                  key={l.label}
                  className="border-b"
                  style={{ borderColor: "rgba(244,242,236,0.16)" }}
                >
                  <a
                    href={l.href}
                    className="group flex items-center justify-between py-3.5"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="caps text-[9.5px] font-medium text-paper-0/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="caps text-[11.5px] font-semibold text-paper-0/85 transition-colors duration-300 group-hover:text-paper-0">
                        {l.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-paper-0/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-paper-0/70"
                    >
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="caps-loose mt-9 text-[11px] font-semibold text-paper-0/45">
              Home
            </p>
            <a
              href="https://gy-no.co.uk"
              className="group mt-2 inline-flex items-baseline gap-2 text-[22px] font-medium tracking-tight text-paper-0 transition-colors hover:text-paper-0/70"
            >
              gy-no.co.uk
              <span
                aria-hidden
                className="h-px w-0 self-center bg-paper-0/50 transition-all duration-300 group-hover:w-6"
              />
            </a>
          </div>
        </div>

        {/* Seal moment — oversized house wordmark, ghosted, with a framed maker's mark */}
        <div className="relative mt-20 md:mt-28">
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="house select-none font-light leading-[0.8] text-paper-0/[0.06]"
            style={{
              fontSize: "clamp(64px, 19vw, 280px)",
              letterSpacing: "0.18em",
            }}
          >
            VIS&nbsp;MAJOR
          </motion.div>

          {/* maker's seal, framed with corner ticks, sits over the ghost */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="relative rounded-sm px-6 py-4 text-center"
              style={{
                border: "1px solid rgba(244,242,236,0.22)",
                background: "var(--ink-0)",
              }}
            >
              <Corner className="left-0 top-0" />
              <Corner className="right-0 top-0 rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <Corner className="bottom-0 left-0 -rotate-90" />
              <p className="caps-loose text-[10px] font-semibold text-paper-0/70">
                One Job
              </p>
              <p className="caps mt-1.5 text-[10px] font-medium text-paper-0/45">
                Done Well
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-16 flex flex-col items-start justify-between gap-3 border-t pt-7 md:flex-row md:items-center"
          style={{ borderColor: "rgba(244,242,236,0.16)" }}
        >
          <p className="caps text-[10px] font-medium text-paper-0/45">
            © {year} VIS MAJOR LTD · Made in the UK
          </p>
          <p className="caps text-[10px] font-medium text-paper-0/45">
            One Job. Done Well.
          </p>
        </div>
      </Container>
    </footer>
  );
}
