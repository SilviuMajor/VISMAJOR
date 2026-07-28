import { HomeHero } from "./HomeHero";
import { Definition } from "./Definition";
import { ProductStrips, MaterialStrip } from "./ProductStrips";
import { HouseVirtues } from "@/components/house/HouseMeaning";

/**
 * V4 home.
 *
 *   hero        Atelier's, with the wordmark taken up to 112px
 *   definition  the name explained, as a dictionary entry, near the top
 *   strips      Colosseum's, alternating, the product on the inner edge
 *   materials   Colosseum's, six across
 *   virtues     moved to the end, where it reads as a closing note rather
 *               than as a bar sitting between the hero and the catalogue
 *
 * HouseStandard is gone: the closing house block was doing the same job as
 * the definition, less well and much further down.
 */
export function SynthesisHome() {
  return (
    <>
      <HomeHero />
      <Definition />
      <ProductStrips />
      <MaterialStrip />
      <HouseVirtues />
    </>
  );
}
