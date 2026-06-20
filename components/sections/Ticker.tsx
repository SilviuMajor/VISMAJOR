import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Works in Minutes",
  "Up to One Hour",
  "With Caffeine & Menthol",
  "Matte Finish",
  "Undetectable Under a Shirt",
  "Made in the UK",
  "Temporary by Design",
  "For Men",
];

export function Ticker() {
  return (
    <div className="bg-ink-0 py-3.5 text-paper-0">
      <Marquee items={ITEMS} />
    </div>
  );
}
