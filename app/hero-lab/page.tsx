import type { Metadata } from "next";
import { HeroNiche } from "@/components/herolab/HeroNiche";
import { HeroTypeWindow } from "@/components/herolab/HeroTypeWindow";
import { HeroPlate } from "@/components/herolab/HeroPlate";
import { HeroOculus } from "@/components/herolab/HeroOculus";
import { HeroColossus } from "@/components/herolab/HeroColossus";
import { HeroDiorama } from "@/components/herolab/HeroDiorama";

export const metadata: Metadata = {
  title: "PECTUS — hero concepts",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  { n: "02", name: "The Niche", el: <HeroNiche /> },
  { n: "03", name: "Type Window", el: <HeroTypeWindow /> },
  { n: "04", name: "The Plate", el: <HeroPlate /> },
  { n: "05", name: "The Oculus", el: <HeroOculus /> },
  { n: "06", name: "Kinetic Name", el: <HeroColossus /> },
  { n: "07", name: "The Diorama", el: <HeroDiorama /> },
];

/**
 * A private lab to compare PECTUS hero directions side by side (stacked).
 * Not linked or indexed — used to pick a direction, then folded into /pectus.
 */
export default function HeroLab() {
  return (
    <main className="bg-paper-0">
      {CONCEPTS.map((c) => (
        <div key={c.n} className="relative">
          <div className="pointer-events-none absolute left-5 top-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink-0 px-3.5 py-1.5 ring-1 ring-paper-0/25">
            <span className="caps text-[10px] font-semibold text-paper-0">
              {c.n} · {c.name}
            </span>
          </div>
          {c.el}
        </div>
      ))}
    </main>
  );
}
