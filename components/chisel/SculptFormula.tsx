import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { INGREDIENTS } from "@/lib/ingredients";

/**
 * SCULPT's "Formula" — the named hero ingredients, one line each on what they
 * do. Brings SCULPT to parity with STONE (which already names its actives);
 * PECTUS carries the same story in its buy-panel Ingredients tab. Static
 * three-column, hairline-ruled, mono. The full INCI lives in the buy panel
 * (#buy), where the "View full ingredients" link points.
 *
 * Claim-safe: nourishes, conditions/moisturises, a firmer-LOOKING finish.
 */

// One small hairline diagram per hero (olive drop, shea seed, coffee burst).
const DIAGRAMS: Record<string, JSX.Element> = {
  "Olive Oil": (
    <path d="M24 6c7 8 11 14 11 21a11 11 0 0 1-22 0c0-7 4-13 11-21z" />
  ),
  "Shea Butter": (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M24 9v30M9 24h30" opacity="0.5" />
    </>
  ),
  Coffee: (
    <>
      <circle cx="24" cy="24" r="6" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" />
    </>
  ),
};

export function SculptFormula() {
  const { heroes } = INGREDIENTS.sculpt;

  return (
    <section
      id="formula"
      className="scroll-mt-24 border-t bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            The Formula · What goes in
          </span>
        </div>
        <h2
          className="mt-5 max-w-2xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          What&rsquo;s in it.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-ink-1">
          A short list of named ingredients. An oil to nourish, a butter to
          condition, coffee for the finish. The rest is what carries them.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-3">
          {heroes.map((h, i) => (
            <Reveal key={h.name} delay={i * 0.06}>
              <div
                className="flex h-full flex-col border-t pt-7"
                style={{ borderColor: "var(--hair)" }}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 48 48"
                  className="mb-6 h-11 w-11 text-ink-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                >
                  {DIAGRAMS[h.name]}
                </svg>
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="font-semibold uppercase font-serif text-ink-0"
                    style={{ fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.01em" }}
                  >
                    {h.name}
                  </h3>
                  <span className="caps font-mono text-[10px] font-medium text-ink-3">
                    {`0${i + 1}`}
                  </span>
                </div>
                <span className="mt-2 font-mono text-[10.5px] leading-[1.5] text-ink-3">
                  {h.inci}
                </span>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{h.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="#buy"
          className="caps mt-12 inline-flex items-center gap-2.5 text-[11px] font-medium text-ink-0"
        >
          View full ingredients
          <span className="transition-transform duration-300 hover:translate-x-1">→</span>
        </Link>
      </Container>
    </section>
  );
}
