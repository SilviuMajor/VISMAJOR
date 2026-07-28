import Image from "next/image";
import { AddToBag, type Tier } from "@/components/renditions/AddToBag";
import { ShotPlaceholder } from "@/components/renditions/ShotPlaceholder";

/**
 * The buy split, imported from Atelier and moved in under the mask reveal.
 *
 * Three things in one block, which is what was liked about it: a way to buy,
 * the drawn figure beside it at full strength, and the actual product in the
 * same eyeline as the price. On the live site those three live on three
 * different screens.
 *
 * It sits second, after the reveal, so the reveal keeps the opening. That
 * costs roughly one screen of scroll before a price appears, which is the
 * trade that was chosen deliberately.
 */
export function BuySplit({
  id = "buy-top",
  index,
  wordmark,
  category,
  line,
  tiers,
  defaultTier,
  product,
  cartPrefix,
  figure,
  figureAlt,
  /** `cover` crops the drawing to fill the column; `contain` pads it. */
  figureFit = "cover",
  figurePosition = "50% 46%",
  productImg,
  productAlt,
  productBrief,
  /** Put the figure on the right instead of the left, so the two product
   *  pages are a mirrored pair rather than the same page twice. */
  flip = false,
}: {
  id?: string;
  index: string;
  wordmark: string;
  category: string;
  line: string;
  tiers: Tier[];
  defaultTier?: string;
  product: "pectus" | "stone" | "sculpt" | "steel";
  cartPrefix: string;
  figure: string;
  figureAlt: string;
  figureFit?: "cover" | "contain";
  figurePosition?: string;
  /** Null where no photography of this product exists yet. */
  productImg: string | null;
  productAlt: string;
  /** Shot brief, used when productImg is null. */
  productBrief?: string;
  flip?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[92px] border-b bg-paper-0"
      style={{ borderColor: "var(--hair)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`relative min-h-[52vh] overflow-hidden border-b lg:min-h-[76vh] lg:border-b-0 ${
            flip ? "lg:order-2 lg:border-l" : "lg:border-r"
          }`}
          style={{ borderColor: "var(--hair)" }}
        >
          <Image
            src={figure}
            alt={figureAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={
              figureFit === "cover"
                ? "object-cover"
                : "object-contain object-bottom p-6"
            }
            style={
              figureFit === "cover" ? { objectPosition: figurePosition } : undefined
            }
          />
        </div>

        <div
          className={`flex items-center px-6 py-14 md:px-14 lg:py-16 ${
            flip ? "lg:order-1" : ""
          }`}
        >
          <div className="w-full max-w-[440px]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase text-ink-2"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {index}
                </p>
                <h2
                  className="serif mt-3 text-ink-0"
                  style={{
                    fontSize: "clamp(38px,4.6vw,58px)",
                    lineHeight: 1.06,
                    letterSpacing: "0.01em",
                  }}
                >
                  {wordmark}
                </h2>
                <p
                  className="mt-2 text-[13px] font-medium uppercase text-ink-2"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {category}
                </p>
              </div>
              <div className="relative h-[104px] w-[52px] shrink-0 md:h-[132px] md:w-[76px]">
                {productImg ? (
                  <Image
                    src={productImg}
                    alt={productAlt}
                    fill
                    sizes="76px"
                    className="object-contain"
                  />
                ) : (
                  <ShotPlaceholder
                    brief={productBrief ?? "Product on white"}
                    className="h-full w-full"
                  />
                )}
              </div>
            </div>

            <p className="mt-6 text-[17px] leading-[1.6] text-ink-1">{line}</p>

            <AddToBag
              className="mt-8"
              product={product}
              productName={wordmark}
              cartPrefix={cartPrefix}
              tiers={tiers}
              defaultTier={defaultTier}
            />

            <ul
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase text-ink-2"
              style={{ letterSpacing: "0.05em" }}
            >
              <li>Free UK delivery</li>
              <li>30-day returns</li>
              <li>Made in the UK</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
