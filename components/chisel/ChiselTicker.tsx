import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "A Massage & Recovery Cream",
  "Worked In, Not Smeared On",
  "Glide, Work, Recover",
  "A More Defined Look",
  "Firmer-Looking Skin",
  "Optional Steel Tools",
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
