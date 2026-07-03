import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { HouseHero } from "@/components/house/HouseHero";
import { HouseMeaning, HouseVirtues } from "@/components/house/HouseMeaning";
import { HouseProducts } from "@/components/house/HouseProducts";
import { HouseStandard } from "@/components/house/HouseStandard";
import { ProductQuote } from "@/components/house/ProductQuote";

/**
 * The VIS MAJOR house landing (/). Summarises the three products and routes
 * into each. The flagship PECTUS page now lives at /pectus.
 */
export function HomeComposition() {
  return (
    <>
      <ScrollProgress />
      <Announcement
        message="Three topicals. One standard. · Now on pre-order · Free UK delivery"
        messageShort="Three topicals · Now on pre-order"
      />
      <Header
        cta={{ href: "#products", label: "Pre-order" }}
      />
      <main>
        <HouseHero />
        <ProductQuote latin="Fortes fortuna adiuvat" translation="fortune favours the strong." />
        <HouseMeaning />
        <HouseVirtues />
        <HouseProducts />
        <HouseStandard />
      </main>
      <Footer />
    </>
  );
}
