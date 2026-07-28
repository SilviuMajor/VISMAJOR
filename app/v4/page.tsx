import { SynthesisHome } from "@/components/synthesis/SynthesisHome";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="synthesis" surface="home" cta={null}>
      <SynthesisHome />
    </RenditionShell>
  );
}
