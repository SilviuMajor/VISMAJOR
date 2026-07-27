import type { Metadata } from "next";
import { DocPage, DocPart, DocSection, DocLink } from "@/components/sections/DocPage";
import { sharedOpenGraph } from "@/lib/seo";

const DESCRIPTION =
  "What VIS MAJOR collects and why, and the terms you agree to when you order.";

export const metadata: Metadata = {
  title: "Legal: privacy & terms",
  description: DESCRIPTION,
  alternates: { canonical: "/legal" },
  openGraph: {
    ...sharedOpenGraph,
    url: "/legal",
    title: "Legal: privacy & terms",
    description: DESCRIPTION,
  },
};

/**
 * /legal — privacy and terms of sale on one page.
 *
 * Replaces the separate /privacy and /terms pages. Each keeps its own anchor:
 * #privacy, #terms.
 */
export default function Legal() {
  return (
    <DocPage
      eyebrow="VIS MAJOR"
      title="Legal"
      intro="What we collect and why, and the terms you agree to when you order."
      jump={[
        { id: "privacy", label: "Privacy" },
        { id: "terms", label: "Terms of sale" },
      ]}
    >
      <DocPart
        id="privacy"
        n="01"
        title="Privacy"
        intro="What we collect, why, and what you can ask us to do about it."
        signOff="Needs completing with the registered company address, the ICO registration number, the actual data processors in use (payment, email, hosting, analytics) and a retention schedule. Do not publish until those are real."
      >
        <DocSection heading="Who we are">
          <p>
            VIS MAJOR LTD, a company registered in England and Wales. Registered
            office and company number to be added. Contact:{" "}
            <DocLink href="mailto:hello@vismajor.co.uk">
              hello@vismajor.co.uk
            </DocLink>
            .
          </p>
        </DocSection>
        <DocSection heading="What we collect">
          <p>
            If you order: your name, email, delivery address and order contents.
            Card details are handled by our payment processor and never reach our
            servers.
          </p>
          <p>If you subscribe: your email address only.</p>
        </DocSection>
        <DocSection heading="Why">
          <p>
            To fulfil your order, which is performance of a contract. To send you
            occasional updates, where you have consented. To understand how the
            site is used, so we can improve it.
          </p>
        </DocSection>
        <DocSection heading="Your rights">
          <p>
            You can ask for a copy of your data, ask us to correct or delete it,
            object to how we use it, or withdraw consent to marketing at any
            time. Every newsletter carries an unsubscribe link.
          </p>
          <p>
            If you are unhappy with how we have handled your data you can
            complain to the Information Commissioner&rsquo;s Office.
          </p>
        </DocSection>
      </DocPart>

      <DocPart
        id="terms"
        n="02"
        title="Terms of sale"
        intro="The terms you agree to when you order from us."
        signOff="Template only. A solicitor should review this before it is published, particularly the liability and governing-law wording."
      >
        <DocSection heading="The contract">
          <p>
            Your order is an offer to buy. The contract forms when we send you an
            order confirmation email.
          </p>
        </DocSection>
        <DocSection heading="Price">
          <p>
            Prices are in pounds sterling and include VAT where applicable. If a
            price is obviously wrong we will contact you before dispatch rather
            than simply cancelling.
          </p>
        </DocSection>
        <DocSection heading="What these products are">
          <p>
            Everything we sell is a cosmetic product. The effects described are
            temporary and cosmetic. Nothing we sell treats, prevents or cures any
            medical condition, and nothing on this site should be read as a
            medical claim.
          </p>
        </DocSection>
        <DocSection heading="Delivery and cancellation">
          <p>
            Delivery terms are on the{" "}
            <DocLink href="/help#shipping">shipping section of the help page</DocLink>
            , and your cancellation rights are on the{" "}
            <DocLink href="/help#returns">returns section</DocLink>. Both form
            part of these terms.
          </p>
        </DocSection>
        <DocSection heading="Governing law">
          <p>These terms are governed by the law of England and Wales.</p>
        </DocSection>
      </DocPart>
    </DocPage>
  );
}
