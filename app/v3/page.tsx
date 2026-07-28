import { ColosseumHome } from "@/components/colosseum/ColosseumHome";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="colosseum" surface="home" cta={null} heroDark>
      <ColosseumHome />
    </RenditionShell>
  );
}
