import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { TrustStrip } from "@/components/enhanced/TrustStrip";
import { StickyArchitecture } from "@/components/enhanced/StickyArchitecture";
import { Ticker } from "@/components/sections/Ticker";
import { HorizontalUseBefore } from "@/components/enhanced/HorizontalUseBefore";
import { OneJob } from "@/components/enhanced/OneJob";
import { IsIsnt } from "@/components/sections/IsIsnt";
import { ProofV2 } from "@/components/v2/ProofV2";
import { FaqV2 } from "@/components/v2/FaqV2";
import { ProductQuote } from "@/components/house/ProductQuote";
import { FinalCta } from "@/components/enhanced/FinalCta";
import { OtherProducts } from "@/components/house/OtherProducts";
import { NotifyBand } from "@/components/enhanced/NotifyBand";
import { BuySplit } from "./BuySplit";
import { FormulaPlates } from "./FormulaPlates";
import { BuyPanel } from "./BuyPanel";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";

const TIERS = [
  { key: "1", label: "One tube", unit: "20ml", price: 18 },
  { key: "2", label: "Two tubes", unit: "2 x 20ml", price: 32, note: "Save £4" },
];

/**
 * V4 PECTUS. The live page, with three imports and one substitution.
 *
 *   kept      the mask reveal, the Architecture with its lightning and snow,
 *             Five moments, One Job, the comparison, proof, FAQ, the banner
 *             and the close, all exactly as they are
 *   added     the buy split, second, so a price is one screen in rather than
 *             three
 *   swapped   ProductFormula for the Colosseum plate treatment
 *   swapped   StickyBuy for a stripped-back panel: same full size selector,
 *             no quantity stepper, no spec tabs, a much larger gallery
 */
export function SynthesisPectus() {
  return (
    <>
      <HeroTypeWindow overlayAlwaysOn />

      <div data-mark="107">
        <BuySplit
          index="Vis Major · No. I"
          wordmark="PECTUS"
          category="Cooling Chest Primer"
          line="Cools and tightens in minutes. About an hour of temporary firmness, undetectable under a shirt."
          tiers={TIERS}
          product="pectus"
          cartPrefix="pectus"
          figure="/product/david.png"
          figureAlt="A classical figure, one hand at the chest"
          figurePosition="50% 46%"
          productImg="/product/front.png"
          productAlt="PECTUS, 20ml tube"
        />
      </div>

      <TrustStrip />
      <div data-mark="108">
        <StickyArchitecture />
      </div>
      <Ticker />
      <div data-mark="109">
        <HorizontalUseBefore />
      </div>
      <OneJob />

      <div data-mark="110">
        <FormulaPlates
          product="pectus"
          intro="A short list of named ingredients. Coffee for a firmer-looking finish, mint for the cool hit you feel on contact. The rest is what carries them."
        />
      </div>

      <ProofV2 />

      <div data-mark="111">
        <BuyPanel
          eyebrow="PECTUS · 001"
          heading="Twenty millilitres. About thirty uses."
          line="One tube lasts most people a month of occasional use. The two-pack works out at £16 a tube."
          product="pectus"
          productName="PECTUS"
          cartPrefix="pectus"
          tiers={TIERS}
          gallery={[
            { src: "/product/front.png", label: "Front" },
            { src: "/product/back.png", label: "Reverse" },
            { src: "/product/squeeze.png", label: "Texture" },
            { src: "/product/angle.png", label: "Detail" },
          ]}
          spec={[
            { k: "Net", v: "20ml ℮" },
            { k: "Format", v: "Aluminium tube, screw cap" },
            { k: "Actives", v: "Caffeine · Menthol" },
            { k: "Onset", v: "Two to three minutes" },
            { k: "Duration", v: "About one hour" },
            { k: "Made in", v: "United Kingdom" },
          ]}
        />
      </div>

      <IsIsnt />
      <FaqV2 />
      <ProductQuote
        latin="Mens sana in corpore sano"
        translation="a sound mind in a sound body."
      />
      <FinalCta />
      <OtherProducts current="pectus" />
      <NotifyBand />
      {/* appears once the reveal is behind you, hides over the buy panel */}
      <StickyBuyBar priceFrom="£18" label="PECTUS · 20ml" href="#buy-top" />
    </>
  );
}
