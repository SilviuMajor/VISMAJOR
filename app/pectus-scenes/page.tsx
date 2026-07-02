import type { Metadata } from "next";
import { ScenesComposition } from "@/components/enhanced/ScenesComposition";

export const metadata: Metadata = {
  title: "PECTUS — Scenes mockup · VIS MAJOR",
  description: "Internal mockup: the PECTUS landing with a different classical scene behind each section.",
  robots: { index: false, follow: false },
};

export default function PectusScenesPage() {
  return <ScenesComposition />;
}
