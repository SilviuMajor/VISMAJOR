import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Matte Finish",
  "Controls Shine",
  "Lightweight Hydration",
  "Use Every Morning",
  "Never Greasy",
  "The Look of Defined Features",
  "Made in the UK",
  "For Men",
];

export function SharpTicker() {
  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Marquee items={ITEMS} />
    </div>
  );
}
