import type { Metadata } from "next";
import { DocPage, DocPart, DocSection, DocLink } from "@/components/sections/DocPage";
import { sharedOpenGraph } from "@/lib/seo";

const DESCRIPTION =
  "How to reach VIS MAJOR, what UK delivery costs and how long it takes, and how to cancel or return an order.";

export const metadata: Metadata = {
  title: "Help: contact, shipping & returns",
  description: DESCRIPTION,
  alternates: { canonical: "/help" },
  openGraph: {
    ...sharedOpenGraph,
    url: "/help",
    title: "Help: contact, shipping & returns",
    description: DESCRIPTION,
  },
};

/**
 * /help — contact, shipping and returns on one page.
 *
 * Replaces the separate /shipping and /returns pages. Both are questions the
 * same buyer asks in the same minute, so they live together, each on its own
 * anchor: #contact, #shipping, #returns.
 */
export default function Help() {
  return (
    <DocPage
      eyebrow="VIS MAJOR"
      title="Help"
      intro="How to reach us, how an order travels, and how to send one back."
      jump={[
        { id: "contact", label: "Contact" },
        { id: "shipping", label: "Shipping & delivery" },
        { id: "returns", label: "Returns & cancellation" },
      ]}
    >
      <DocPart
        id="contact"
        n="01"
        title="Contact"
        intro="A real person reads these."
        signOff="Add the registered office address and company number, both of which a UK limited company must display. Confirm the one-working-day reply promise is one you can actually keep."
      >
        <DocSection heading="Email">
          <p>
            <DocLink href="mailto:hello@vismajor.co.uk">
              hello@vismajor.co.uk
            </DocLink>
          </p>
          <p>
            We reply within one working day. If you are chasing an order, quote
            the reference from your confirmation email and it will be quicker.
          </p>
        </DocSection>
        <DocSection heading="Before you write">
          <p>
            Delivery times are in <DocLink href="#shipping">shipping</DocLink>{" "}
            below. Your cancellation rights and our returns promise are in{" "}
            <DocLink href="#returns">returns</DocLink>. If the answer is not
            there, email us.
          </p>
        </DocSection>
        <DocSection heading="Company">
          <p>
            VIS MAJOR LTD, registered in England and Wales. Registered office and
            company number to be added.
          </p>
        </DocSection>
      </DocPart>

      <DocPart
        id="shipping"
        n="02"
        title="Shipping & delivery"
        intro="Where your order goes, how long it takes, and what it costs."
        signOff="Confirm the carrier, the real dispatch cut-off and the actual delivery windows before publishing. The figures below are placeholders shaped to the right structure."
      >
        <DocSection heading="Where we ship">
          <p>
            United Kingdom only at present. We are not yet set up for
            international orders; if you are outside the UK, join the newsletter
            and we will say when that changes.
          </p>
        </DocSection>
        <DocSection heading="What it costs">
          <p>Free standard delivery on every UK order.</p>
        </DocSection>
        <DocSection heading="How long it takes">
          <p>
            Orders placed before 2pm on a working day are dispatched the same
            day. Standard delivery arrives within 2 to 3 working days of
            dispatch.
          </p>
          <p>
            You will get a confirmation email when you order, and a second email
            with tracking when it ships.
          </p>
        </DocSection>
        <DocSection heading="If something goes wrong">
          <p>
            If your order has not arrived within 10 working days of dispatch,
            email{" "}
            <DocLink href="mailto:hello@vismajor.co.uk">
              hello@vismajor.co.uk
            </DocLink>{" "}
            with your order reference and we will resolve it.
          </p>
        </DocSection>
      </DocPart>

      <DocPart
        id="returns"
        n="03"
        title="Returns & cancellation"
        intro="Your legal cancellation right, and our own returns promise on top of it."
        signOff="This needs a solicitor's review. In particular: confirm who pays return postage, and confirm the hygiene exemption position for opened cosmetics, which materially changes what you must accept back."
      >
        <DocSection heading="Your right to cancel">
          <p>
            Under the Consumer Contracts Regulations 2013 you may cancel your
            order within 14 days of receiving it, without giving a reason. You
            then have a further 14 days to send the goods back.
          </p>
          <p>
            We refund within 14 days of receiving the goods back, or of you
            showing proof of return, whichever is earlier. Standard delivery is
            refunded; if you paid for an upgrade, we refund the standard rate.
          </p>
        </DocSection>
        <DocSection heading="Our returns promise">
          <p>
            Beyond the statutory right, we accept returns for 30 days from
            delivery. This is in addition to your cancellation right, not
            instead of it.
          </p>
        </DocSection>
        <DocSection heading="Opened products">
          <p>
            Sealed cosmetic goods that have been opened may be exempt from the
            statutory cancellation right for hygiene reasons. If a product does
            not suit you, contact us anyway: we would rather resolve it than
            stand on the regulation.
          </p>
        </DocSection>
        <DocSection heading="Return postage">
          <p>
            You pay return postage unless the item is faulty or was sent in
            error, in which case we cover it.
          </p>
        </DocSection>
        <DocSection heading="How to start a return">
          <p>
            Email{" "}
            <DocLink href="mailto:hello@vismajor.co.uk">
              hello@vismajor.co.uk
            </DocLink>{" "}
            with your order reference. You may use the statutory model
            cancellation form, but you do not have to.
          </p>
        </DocSection>
      </DocPart>
    </DocPage>
  );
}
