import type { Metadata } from "next";
import { EnhancedCompositionV2 } from "@/components/v2site/EnhancedCompositionV2";
import { V2Layer } from "@/components/v2site/V2Layer";

export const metadata: Metadata = {
  title: "V2 · PECTUS",
  robots: { index: false, follow: false },
};

export default function PectusV2() {
  return (
    <>
      <EnhancedCompositionV2 />
      <V2Layer route="/v2/pectus" />
    </>
  );
}
