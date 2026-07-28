import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { TrustStrip } from "@/components/enhanced/TrustStrip";
import { SharpTicker } from "@/components/sharp/SharpTicker";
import { SharpActives } from "@/components/sharp/SharpActives";
import { SharpIsIsnt } from "@/components/sharp/SharpIsIsnt";
import { SharpFaq } from "@/components/sharp/SharpFaq";
import { SharpFinalCta } from "@/components/sharp/SharpFinalCta";
import { SharpProof } from "@/components/sharp/SharpProof";
import { SharpNotify } from "@/components/sharp/SharpNotify";
import { ProductQuote } from "@/components/house/ProductQuote";
import { OtherProducts } from "@/components/house/OtherProducts";
import { BuySplit } from "./BuySplit";
import { FormulaPlates } from "./FormulaPlates";
import { BuyPanel } from "./BuyPanel";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

const TIERS = [
  { key: "1", label: "One jar", unit: "100ml", price: 22 },
  { key: "2", label: "Large jar", unit: "200ml", price: 38, note: "Most chosen" },
  { key: "3", label: "Two jars", unit: "2 x 100ml", price: 40, note: "Save £4" },
];

/**
 * V4 STONE. Same treatment as PECTUS, mirrored so the two paid-traffic pages
 * read as a pair rather than as the same page twice.
 *
 * SharpActives stays: it is STONE's equivalent of the Architecture, and it is
 * the animated piece on this page. The Colosseum formula section sits after
 * it, and the two are split by job. SharpActives is narrative, running the
 * draw, the lift and the finish across its pin. FormulaPlates is
 * specification: the name, what it does, the INCI. Prose above, ingredient
 * panel below is how both Buly and Diptyque arrange the same material.
 *
 * Every product render in /public is the PECTUS tube, so STONE's product
 * imagery is marked as outstanding rather than faked with the wrong product.
 */
export function SynthesisStone() {
  return (
    <>
      <HeroTypeWindow product="stone" overlayAlwaysOn />

      <div data-mark="114">
        <BuySplit
          index="Vis Major · No. II"
          wordmark="STONE"
          category="Matte Cleanser"
          line="Clay, charcoal and mint. Lifts the day off, rinses clean, and leaves the skin matte rather than tight."
          tiers={TIERS}
          defaultTier="2"
          product="stone"
          cartPrefix="sharp"
          figure="/men/stone-wash.png"
          figureAlt="A figure washing at a basin, drawn"
          figureFit="contain"
          productImg={null}
          productAlt="STONE, 100ml"
          productBrief="STONE jar, front, on white"
          flip
        />
      </div>

      <TrustStrip />
      <SharpTicker />
      <div data-mark="115">
        <SharpActives />
      </div>

      <div data-mark="116">
        <FormulaPlates
          product="stone"
          eyebrow="The formula, in full"
          intro="The three actives above, stated as specification rather than as a story: what each one is, what it does, and the name it goes by on the back of the jar."
        />
      </div>

      <div data-mark="117">
        <BuyPanel
          eyebrow="STONE · 002"
          heading="One hundred millilitres. Roughly two months."
          line="A ten-pence amount is a wash. The 200ml jar is the one most people settle on."
          product="stone"
          productName="STONE"
          cartPrefix="sharp"
          tiers={TIERS}
          defaultTier="2"
          gallery={[
            { src: null, label: "Front", brief: "Jar, front, matte lid, on white" },
            { src: null, label: "Reverse", brief: "Reverse label, directions and INCI" },
            { src: null, label: "Texture", brief: "Grey slip worked between wet palms" },
            { src: null, label: "Detail", brief: "Lid thread and shoulder, close" },
          ]}
          spec={[
            { k: "Net", v: "100ml ℮ / 200ml ℮" },
            { k: "Format", v: "Wide-mouth jar, flat lid" },
            { k: "Actives", v: "Kaolin · Charcoal · Peppermint" },
            { k: "Use", v: "Once or twice daily" },
            { k: "Free from", v: "Sulphates" },
            { k: "Made in", v: "United Kingdom" },
          ]}
        />
      </div>

      <SharpIsIsnt />
      <SharpFaq />
      <ProductQuote latin="Tabula rasa" translation="a clean slate." />
      <SharpFinalCta />
      <SharpProof />
      <OtherProducts current="stone" />
      <SharpNotify />
      <StickyBuyBar priceFrom="£22" label="STONE · 100ml" href="#buy-top" />
    </>
  );
}
