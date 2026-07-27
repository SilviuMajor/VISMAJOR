import type { Metadata } from "next";
import { SharpComposition } from "@/components/sharp/SharpComposition";
import { V2Layer } from "@/components/v2site/V2Layer";

export const metadata: Metadata = {
  title: "V2 · STONE",
  robots: { index: false, follow: false },
};

export default function StoneV2() {
  return (
    <>
      <SharpComposition />
      <V2Layer route="/v2/stone" />
    </>
  );
}
