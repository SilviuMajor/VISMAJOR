import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "Shipping & delivery",
  
};

export default function Shipping() {
  return (
    <V2DocPage
      eyebrow="VIS MAJOR"
      title="Shipping & delivery"
      intro="Where your order goes, how long it takes, and what it costs."
      draft="Confirm the carrier, the real dispatch cut-off and the actual delivery windows before publishing. The figures below are placeholders shaped to the right structure."
    >
      <DocSection heading="Where we ship">
        <p>United Kingdom only at present. We are not yet set up for international orders; if you are outside the UK, join the newsletter and we will say when that changes.</p>
      </DocSection>
      <DocSection heading="What it costs">
        <p>Free standard delivery on every UK order.</p>
      </DocSection>
      <DocSection heading="How long it takes">
        <p>Orders placed before 2pm on a working day are dispatched the same day. Standard delivery arrives within 2 to 3 working days of dispatch.</p>
        <p>You will get a confirmation email when you order, and a second email with tracking when it ships.</p>
      </DocSection>
      <DocSection heading="If something goes wrong">
        <p>If your order has not arrived within 10 working days of dispatch, email hello@vismajor.co.uk with your order reference and we will resolve it.</p>
      </DocSection>
    </V2DocPage>
  );
}
