import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { SHELF, INGREDIENT_IMG } from "@/lib/ingredients";
import { ShotPlaceholder } from "@/components/renditions/ShotPlaceholder";

/**
 * Colosseum's full-bleed product strips, with the fix that was asked for: the
 * tube now sits over the drawing, hard-edged and shadowed, so each strip
 * carries both the thing that makes the brand distinctive and the thing being
 * sold. On the live site the drawing and the product never appear together
 * above the product page's own hero.
 *
 * Half a viewport per product, alternating side. STEEL joins the run, because
 * it is currently absent from the home page entirely.
 */

/**
 * `product: null` where no photography of that product exists. Every render in
 * /public/product is the PECTUS tube, so putting one on the STONE or SCULPT
 * strip would label the wrong object with the right name. The slot holds its
 * space and names the shot instead.
 */
const PANEL: Record<
  string,
  { figure: string; fit: string; product: string | null; brief?: string }
> = {
  pectus: {
    figure: "/product/david.png",
    fit: "object-cover object-[50%_62%]",
    product: "/product/front.png",
  },
  stone: {
    figure: "/men/stone-finish.png",
    fit: "object-cover object-[50%_28%]",
    product: null,
    brief: "STONE jar, front, on white",
  },
  sculpt: {
    figure: "/men/sculpt-carved.png",
    fit: "object-cover object-center",
    product: null,
    brief: "SCULPT tube, front, on white",
  },
};

export function ProductStrips() {
  return (
    <section className="bg-paper-0" data-mark="104">
      <div className="mx-auto w-full max-w-[1560px] px-6 py-[clamp(56px,7vw,110px)] md:px-12">
        <p
          className="text-[10px] font-semibold uppercase text-ink-2"
          style={{ letterSpacing: "0.06em" }}
        >
          The house
        </p>
      </div>

      {PRODUCTS.map((p, i) => {
        const flip = i % 2 === 1;
        const panel = PANEL[p.slug];
        return (
          <a
            key={p.slug}
            href={p.href}
            className="group grid grid-cols-1 border-t md:grid-cols-2"
            style={{ borderColor: "var(--hair)" }}
          >
            <div
              className={`relative h-[46vh] min-h-[300px] overflow-hidden bg-paper-0 md:h-[60vh] ${
                flip ? "md:order-2" : ""
              }`}
            >
              <Image
                src={panel.figure}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`${panel.fit} transition-transform duration-700 group-hover:scale-[1.03]`}
              />
              {/* The product sits on the inner edge of the image panel,
                  vertically centred, so it always lands directly beside the
                  name and explainer whichever way the strip is turned. */}
              <div
                className={`absolute top-1/2 h-[130px] w-[58px] -translate-y-1/2 md:h-[210px] md:w-[104px] ${
                  flip ? "left-6 md:left-10" : "right-6 md:right-10"
                }`}
              >
                {panel.product ? (
                  <Image
                    src={panel.product}
                    alt={`${p.wordmark}, ${p.category}`}
                    fill
                    sizes="96px"
                    className="object-contain drop-shadow-[0_18px_36px_rgba(20,19,15,0.30)]"
                  />
                ) : (
                  <ShotPlaceholder
                    brief={panel.brief ?? `${p.wordmark} on white`}
                    className="h-full w-full"
                  />
                )}
              </div>
            </div>

            <div
              className={`flex flex-col justify-center px-6 py-14 md:px-14 ${
                flip ? "md:order-1" : ""
              }`}
            >
              <p
                className="num text-[12px] font-semibold tabular-nums text-ink-3"
                style={{ letterSpacing: "0.05em" }}
              >
                {p.index}
              </p>
              <h3
                className="serif mt-4 text-ink-0"
                style={{
                  fontSize: "clamp(38px,5.4vw,86px)",
                  lineHeight: 0.94,
                  letterSpacing: "0.01em",
                }}
              >
                {p.wordmark}
              </h3>
              <p
                className="mt-4 text-[12px] font-semibold uppercase text-ink-2"
                style={{ letterSpacing: "0.05em" }}
              >
                {p.category}
              </p>
              <p className="mt-6 max-w-[50ch] text-[16px] leading-[1.66] text-ink-1">
                {p.short}
              </p>
              <p className="num mt-7 text-[20px] font-semibold tabular-nums text-ink-0">
                £{p.priceFrom}
              </p>
            </div>
          </a>
        );
      })}

      {/* STEEL, which the home page currently omits */}
      <a
        href="/steel"
        className="group grid grid-cols-1 border-y md:grid-cols-2"
        style={{ borderColor: "var(--hair)" }}
        data-mark="105"
      >
        <div className="relative h-[38vh] min-h-[260px] overflow-hidden bg-paper-0 md:order-2 md:h-[46vh]">
          <Image
            src="/product/steel-dagger.png"
            alt="STEEL, machined tool"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:order-1 md:px-14">
          <p
            className="num text-[12px] font-semibold tabular-nums text-ink-3"
            style={{ letterSpacing: "0.05em" }}
          >
            004
          </p>
          <h3
            className="serif mt-4 text-ink-0"
            style={{
              fontSize: "clamp(38px,5.4vw,86px)",
              lineHeight: 0.94,
              letterSpacing: "0.01em",
            }}
          >
            STEEL
          </h3>
          <p
            className="mt-4 text-[12px] font-semibold uppercase text-ink-2"
            style={{ letterSpacing: "0.05em" }}
          >
            Machined Tool
          </p>
          <p className="mt-6 max-w-[50ch] text-[16px] leading-[1.66] text-ink-1">
            A weighted stainless tool for working SCULPT into the skin.
            Optional, and made to outlast the cream by some decades.
          </p>
          <p className="num mt-7 text-[20px] font-semibold tabular-nums text-ink-0">
            £24
          </p>
        </div>
      </a>
    </section>
  );
}

/**
 * Colosseum's material strip: six plates across, hairline under each, the
 * products they appear in set in Courier. Density is the point, so it stays
 * six across on a wide screen rather than relaxing into three.
 */
export function MaterialStrip() {
  return (
    <section
      className="bg-paper-0 py-[clamp(64px,8vw,124px)]"
      data-mark="106"
    >
      <div className="mx-auto w-full max-w-[1560px] px-6 md:px-12">
        <p
          className="text-[10px] font-semibold uppercase text-ink-2"
          style={{ letterSpacing: "0.06em" }}
        >
          The materials
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {SHELF.map((s) => (
            <figure key={s.name}>
              <div className="relative aspect-square w-full">
                <Image
                  src={INGREDIENT_IMG[s.name]}
                  alt={`${s.name}, drawn`}
                  fill
                  sizes="(max-width: 768px) 44vw, 200px"
                  className="melt object-contain"
                />
              </div>
              <figcaption className="mt-4">
                <hr
                  className="border-0 border-t"
                  style={{ borderColor: "var(--hair)" }}
                />
                <p
                  className="mt-3 text-[13px] font-bold uppercase text-ink-0"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.name}
                </p>
                <p className="mt-2 max-w-[22ch] text-[13px] leading-[1.5] text-ink-2">
                  {s.role}
                </p>
                <p
                  className="mt-2 font-mono text-[10px] uppercase text-ink-3"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {s.in.join(" · ")}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
