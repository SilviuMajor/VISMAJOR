import Image from "next/image";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";
import type { ProductSlug } from "@/lib/products";

/**
 * The formula, in Colosseum's treatment: every active shown at once, the
 * plate given real size, the name set large, the INCI carried underneath in
 * Courier.
 *
 * On the live site PECTUS shows its two actives as small plates in a band,
 * and STONE shows one at a time inside a 450vh pin. Neither lets you compare
 * them, and the pencil work only reads as pencil work above a certain size.
 *
 * On STONE this sits after the pinned actives section, and the two are split
 * by job: the pinned one is narrative (the draw, the lift, the finish), this
 * one is specification (name, role, INCI). Buly and Diptyque both run that
 * split, with prose above and an ingredients panel below.
 */
export function FormulaPlates({
  product,
  eyebrow = "The formula",
  intro,
}: {
  product: ProductSlug;
  eyebrow?: string;
  intro?: string;
}) {
  const formula = INGREDIENTS[product];
  const cols =
    formula.heroes.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section
      id="ingredients"
      className="scroll-mt-[92px] bg-paper-0 py-[clamp(64px,8vw,124px)]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p
            className="text-[10px] font-semibold uppercase text-ink-2"
            style={{ letterSpacing: "0.06em" }}
          >
            {eyebrow}
          </p>
          <p
            className="font-mono text-[10.5px] uppercase text-ink-3"
            style={{ letterSpacing: "0.05em" }}
          >
            {formula.line}
          </p>
        </div>

        {intro && (
          <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[1.7] text-ink-1">
            {intro}
          </p>
        )}

        <div className={`mt-12 grid grid-cols-1 gap-12 ${cols} md:gap-10`}>
          {formula.heroes.map((h) => (
            <div key={h.name} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={INGREDIENT_IMG[h.name]}
                  alt={`${h.name}, drawn`}
                  fill
                  sizes={
                    formula.heroes.length === 2
                      ? "(max-width: 768px) 100vw, 45vw"
                      : "(max-width: 768px) 100vw, 30vw"
                  }
                  className="melt object-contain"
                />
              </div>
              <h3
                className="mt-8 font-bold uppercase text-ink-0"
                style={{
                  fontSize:
                    formula.heroes.length === 2
                      ? "clamp(32px,4.2vw,62px)"
                      : "clamp(28px,3.2vw,48px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.028em",
                }}
              >
                {h.name}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[16px] leading-[1.66] text-ink-1">
                {h.role}
              </p>
              <p
                className="mt-4 font-mono text-[11px] uppercase text-ink-3"
                style={{ letterSpacing: "0.05em" }}
              >
                {h.inci}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
