import { Marquee } from "@/components/ui/Marquee";

const ITEMS = [
  "Clay & Charcoal",
  "Lifts Oil & Grime",
  "Clean, Fresh, Matte",
  "Morning or Night",
  "Non-Stripping",
  "A Clean Slate",
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
