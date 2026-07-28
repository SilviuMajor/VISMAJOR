import { AtelierPectus } from "@/components/atelier/AtelierPectus";
import { RenditionShell } from "@/components/renditions/RenditionShell";

export default function Page() {
  return (
    <RenditionShell rendition="atelier" surface="pectus" crumb="PECTUS">
      <AtelierPectus />
    </RenditionShell>
  );
}
