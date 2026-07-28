import { AtelierStone } from "@/components/atelier/AtelierStone";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="atelier" surface="stone" crumb="STONE">
      <AtelierStone />
    </RenditionShell>
  );
}
