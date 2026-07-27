import type { Metadata } from "next";
import { ChiselComposition } from "@/components/chisel/ChiselComposition";
import { PRODUCT_SEO, ldJson, productLd, sharedOpenGraph } from "@/lib/seo";

const P = PRODUCT_SEO.sculpt;

export const metadata: Metadata = {
  title: "SCULPT: Contour & Recovery Cream",
  description:
    "SCULPT is a massage & recovery cream for men, worked into the body by hand or with optional steel tool, for skin that looks firmer, feels worked and reads sharper. Temporary, cosmetic, made in the UK by VIS MAJOR.",
  alternates: { canonical: P.path },
  openGraph: {
    ...sharedOpenGraph,
    url: P.path,
    title: "SCULPT: Contour & Recovery Cream",
    description:
      "A massage cream for men, worked into the body by hand or with optional steel tool. Looks firmer, feels worked: temporary, cosmetic.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCULPT: Contour & Recovery Cream",
    description:
      "A massage cream for men, worked into the body by hand or with optional steel tool. Looks firmer, feels worked: temporary, cosmetic.",
  },
};

export default function SculptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(productLd(P)) }}
      />
      <ChiselComposition />
    </>
  );
}
