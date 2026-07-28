import { ColosseumPectus } from "@/components/colosseum/ColosseumPectus";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="colosseum" surface="pectus" crumb="PECTUS">
      <ColosseumPectus />
    </RenditionShell>
  );
}
