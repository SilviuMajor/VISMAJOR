import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "V2 · Contact",
  robots: { index: false, follow: false },
};

export default function ContactV2() {
  return (
    <V2DocPage
      eyebrow="Change 32 · New page"
      title="Contact"
      intro="A real person reads these."
      draft="Add the registered office address and company number, both of which a UK limited company must display. Confirm the response-time promise is one you can actually keep."
    >
      <DocSection heading="Email">
        <p>
          <a href="mailto:hello@vismajor.co.uk" className="font-semibold text-ink-0 underline underline-offset-4">
            hello@vismajor.co.uk
          </a>
        </p>
        <p>We reply within one working day. If you are chasing an order, quote the reference from your confirmation email and it will be quicker.</p>
      </DocSection>
      <DocSection heading="Orders and returns">
        <p>Delivery times are on the shipping page. Returns and your cancellation rights are on the returns page. If the answer is not there, email us.</p>
      </DocSection>
      <DocSection heading="Company">
        <p>VIS MAJOR LTD, registered in England and Wales. Registered office and company number to be added.</p>
      </DocSection>
    </V2DocPage>
  );
}
