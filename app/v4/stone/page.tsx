import { SynthesisStone } from "@/components/synthesis/SynthesisStone";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="synthesis" surface="stone" crumb="STONE" heroDark cta={{ href: "#buy-top", label: "Buy" }}>
      <SynthesisStone />
    </RenditionShell>
  );
}
