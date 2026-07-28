import { AtelierHome } from "@/components/atelier/AtelierHome";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="atelier" surface="home" cta={null}>
      <AtelierHome />
    </RenditionShell>
  );
}
