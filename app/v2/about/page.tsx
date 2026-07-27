import type { Metadata } from "next";
import { V2DocPage, DocSection } from "@/components/v2site/V2DocPage";

export const metadata: Metadata = {
  title: "V2 · About",
  robots: { index: false, follow: false },
};

export default function AboutV2() {
  return (
    <V2DocPage
      eyebrow="Change 31 · New page"
      title="The house"
      intro="Who makes this, where, and why it is built the way it is."
      draft="Structure and argument are here; the specifics are placeholders. Replace with the real founding story, the real manufacturing partner, and a real photograph. A story page only works if it is true and specific."
    >
      <DocSection heading="Why this exists">
        <p>Men&rsquo;s grooming mostly sells one of two things: a twelve-step routine nobody keeps, or a joke about not caring. We wanted a third option. A small number of products that each do exactly one thing, made properly, and described honestly.</p>
      </DocSection>
      <DocSection heading="One job, done well">
        <p>Every product here has a single purpose. PECTUS cools and firms the look of the chest for an hour. STONE takes the day off your face. SCULPT is worked into muscle after training. STEEL is the tool that does it.</p>
        <p>Nothing claims to be a treatment. Everything is cosmetic and temporary by design, and we say so on the label.</p>
      </DocSection>
      <DocSection heading="Made in the UK">
        <p>Formulated and filled in the United Kingdom, in small runs, to UK cosmetic regulation. Details of the manufacturing partner to be added.</p>
      </DocSection>
      <DocSection heading="The name">
        <p><span className="italic">Vis major</span> is the Roman legal term for an unstoppable force: a power beyond resistance. It seemed the right register for a house that would rather be plain than loud.</p>
      </DocSection>
    </V2DocPage>
  );
}
