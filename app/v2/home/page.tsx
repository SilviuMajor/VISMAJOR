import type { Metadata } from "next";
import { HomeComposition } from "@/components/house/HomeComposition";
import { V2Layer } from "@/components/v2site/V2Layer";

export const metadata: Metadata = {
  title: "V2 · Home",
  robots: { index: false, follow: false },
};

export default function HomeV2() {
  return (
    <>
      <HomeComposition />
      <V2Layer route="/v2/home" />
    </>
  );
}
