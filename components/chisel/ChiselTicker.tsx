import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Warming, Not Cooling",
  "Cream + Steel Tool",
  "Worked In, Not Smeared On",
  "A More Defined Look",
  "Firmer-Looking Skin",
  "Made in the UK",
  "Temporary by Design",
  "For Men",
];

export function ChiselTicker() {
  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Marquee items={ITEMS} />
    </div>
  );
}
