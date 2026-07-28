import { HomeHero } from "./HomeHero";
import { ProductStrips, MaterialStrip } from "./ProductStrips";
import { HouseVirtues } from "@/components/house/HouseMeaning";
import { HouseStandard } from "@/components/house/HouseStandard";

/**
 * V4 home.
 *
 * Atelier's hero and plate, Colosseum's product strips and material strip,
 * and the two V1 sections that were not being replaced by either. Nothing was
 * removed that the live page has: HouseProducts becomes the strips and
 * HouseIngredients becomes the material strip, so the content survives in a
 * better presentation rather than disappearing.
 */
export function SynthesisHome() {
  return (
    <>
      <HomeHero />
      <HouseVirtues />
      <ProductStrips />
      <MaterialStrip />
      <HouseStandard />
    </>
  );
}
