import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "Privacy",
  
};

export default function Privacy() {
  return (
    <V2DocPage
      eyebrow="VIS MAJOR"
      title="Privacy"
      intro="What we collect, why, and what you can ask us to do about it."
      draft="Needs completing with the registered company address, the ICO registration number, the actual data processors in use (payment, email, hosting, analytics) and a retention schedule. Do not publish until those are real."
    >
      <DocSection heading="Who we are">
        <p>VIS MAJOR LTD, a company registered in England and Wales. Registered office and company number to be added. Contact: hello@vismajor.co.uk.</p>
      </DocSection>
      <DocSection heading="What we collect">
        <p>If you order: your name, email, delivery address and order contents. Card details are handled by our payment processor and never reach our servers.</p>
        <p>If you subscribe: your email address only.</p>
      </DocSection>
      <DocSection heading="Why">
        <p>To fulfil your order, which is performance of a contract. To send you occasional updates, where you have consented. To understand how the site is used, so we can improve it.</p>
      </DocSection>
      <DocSection heading="Your rights">
        <p>You can ask for a copy of your data, ask us to correct or delete it, object to how we use it, or withdraw consent to marketing at any time. Every newsletter carries an unsubscribe link.</p>
        <p>If you are unhappy with how we have handled your data you can complain to the Information Commissioner&rsquo;s Office.</p>
      </DocSection>
    </V2DocPage>
  );
}
