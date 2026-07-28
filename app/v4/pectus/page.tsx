import { SynthesisPectus } from "@/components/synthesis/SynthesisPectus";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="synthesis" surface="pectus" crumb="PECTUS" heroDark cta={{ href: "#reveal", label: "Buy" }}>
      <SynthesisPectus />
    </RenditionShell>
  );
}
