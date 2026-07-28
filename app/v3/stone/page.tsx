import { ColosseumStone } from "@/components/colosseum/ColosseumStone";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="colosseum" surface="stone" crumb="STONE">
      <ColosseumStone />
    </RenditionShell>
  );
}
