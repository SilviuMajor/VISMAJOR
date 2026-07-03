import { Fragment } from "react";
import { Container } from "@/components/ui/Container";

/**
 * The "Meaning" band — the lore of the name, stated once and refined.
 * Sits just below the hero.
 */
export function HouseMeaning() {
  return (
    <section id="meaning" className="border-y bg-paper-1" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              Meaning
            </span>
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
          </div>
          <p
            className="house mt-8 text-ink-0"
            style={{ fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            VIS MAJOR
          </p>
          <p
            className="serif mx-auto mt-6 max-w-2xl text-ink-1"
            style={{ fontSize: "clamp(16px, 2vw, 24px)", lineHeight: 1.5, letterSpacing: "0.04em" }}
          >
            The Roman name for &lsquo;AN UNSTOPPABLE FORCE&rsquo;, a power beyond resistance.
          </p>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-[1.6] text-ink-2 md:text-[16px]">
            Some things you cannot command. How you carry yourself is not one of them.
          </p>
        </div>
      </Container>
    </section>
  );
}

/** The virtues strip — three words, evenly spaced, understated. */
export function HouseVirtues() {
  const virtues = ["Discipline", "Composure", "Strength"];
  return (
    <section className="border-b bg-paper-0" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-9 md:py-11">
        <div className="flex items-center justify-center gap-5 sm:gap-10">
          {virtues.map((v, i) => (
            <Fragment key={v}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-[var(--hair-strong)]"
                />
              )}
              <span className="caps-loose text-[12px] font-medium text-ink-2 md:text-[13px]">
                {v}
              </span>
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
