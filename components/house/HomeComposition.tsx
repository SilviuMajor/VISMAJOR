import { ScrollProgress } from "@/components/enhanced/ScrollProgress";
import { Announcement } from "@/components/nav/Announcement";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";
import { HouseHero } from "@/components/house/HouseHero";
import { HouseProducts } from "@/components/house/HouseProducts";
import { HouseStandard } from "@/components/house/HouseStandard";

/**
 * The VIS MAJOR house landing (/). Summarises the three products and routes
 * into each. The flagship GY-NO! page now lives at /gy-no.
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
        nav={[
          { href: "/gy-no", label: "GY-NO!" },
          { href: "/chisel", label: "CHISEL" },
          { href: "/sharp", label: "SHARP" },
        ]}
        cta={{ href: "#products", label: "Pre-order" }}
      />
      <main>
        <HouseHero />
        <HouseProducts />
        <HouseStandard />
      </main>
      <Footer />
    </>
  );
}
