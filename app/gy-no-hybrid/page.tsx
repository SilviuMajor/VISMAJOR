import { EnhancedComposition } from "@/components/enhanced/EnhancedComposition";

export const metadata = {
  title: "GY-NO! · Serif-display mockup · VIS MAJOR",
};

/**
 * Hybrid font mockup of the GY-NO! page — the house serif (Cinzel) on the
 * display type, Hanken on body/UI. Same composition as /gy-no, just wrapped in
 * `.font-hybrid` (see globals.css) so nothing is duplicated.
 */
export default function GyNoHybridPage() {
  return (
    <div className="font-hybrid">
      <EnhancedComposition />
    </div>
  );
}
