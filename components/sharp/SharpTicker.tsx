import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Clay · Charcoal · Mint",
  "Lifts Oil & Grime",
  "Clean, Fresh, Matte",
  "Sulphate-Free",
  "Lathers & Rinses Off",
  "Cool Mint Finish",
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
