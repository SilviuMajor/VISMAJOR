import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "V2 · Terms",
  robots: { index: false, follow: false },
};

export default function TermsV2() {
  return (
    <V2DocPage
      eyebrow="Change 30 · Currently a dead link"
      title="Terms of sale"
      intro="The terms you agree to when you order from us."
      draft="Template only. A solicitor should review this before it is published, particularly the liability and governing-law wording."
    >
      <DocSection heading="The contract">
        <p>Your order is an offer to buy. The contract forms when we send you an order confirmation email.</p>
      </DocSection>
      <DocSection heading="Price">
        <p>Prices are in pounds sterling and include VAT where applicable. If a price is obviously wrong we will contact you before dispatch rather than simply cancelling.</p>
      </DocSection>
      <DocSection heading="What these products are">
        <p>Everything we sell is a cosmetic product. The effects described are temporary and cosmetic. Nothing we sell treats, prevents or cures any medical condition, and nothing on this site should be read as a medical claim.</p>
      </DocSection>
      <DocSection heading="Cancellation">
        <p>See our returns and cancellation page, which forms part of these terms.</p>
      </DocSection>
      <DocSection heading="Governing law">
        <p>These terms are governed by the law of England and Wales.</p>
      </DocSection>
    </V2DocPage>
  );
}
