import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "V2 · Returns & cancellation",
  robots: { index: false, follow: false },
};

export default function ReturnsV2() {
  return (
    <V2DocPage
      eyebrow="Change 28 · Currently a dead link"
      title="Returns & cancellation"
      intro="Your legal cancellation right, and our own returns promise on top of it."
      draft="This needs a solicitor's review. In particular: confirm who pays return postage, and confirm the hygiene exemption position for opened cosmetics, which materially changes what you must accept back."
    >
      <DocSection heading="Your right to cancel">
        <p>Under the Consumer Contracts Regulations 2013 you may cancel your order within 14 days of receiving it, without giving a reason. You then have a further 14 days to send the goods back.</p>
        <p>We refund within 14 days of receiving the goods back, or of you showing proof of return, whichever is earlier. Standard delivery is refunded; if you paid for an upgrade, we refund the standard rate.</p>
      </DocSection>
      <DocSection heading="Our returns promise">
        <p>Beyond the statutory right, we accept returns for 30 days from delivery. This is in addition to your cancellation right, not instead of it.</p>
      </DocSection>
      <DocSection heading="Opened products">
        <p>Sealed cosmetic goods that have been opened may be exempt from the statutory cancellation right for hygiene reasons. If a product does not suit you, contact us anyway: we would rather resolve it than stand on the regulation.</p>
      </DocSection>
      <DocSection heading="Return postage">
        <p>You pay return postage unless the item is faulty or was sent in error, in which case we cover it.</p>
      </DocSection>
      <DocSection heading="How to start a return">
        <p>Email hello@vismajor.co.uk with your order reference. You may use the statutory model cancellation form, but you do not have to.</p>
      </DocSection>
    </V2DocPage>
  );
}
