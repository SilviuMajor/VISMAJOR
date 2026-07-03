import type { Metadata } from "next";
import Image from "next/image";
import { NavStandard } from "@/components/navlab/NavStandard";
import { NavCentered } from "@/components/navlab/NavCentered";
import { NavInscription } from "@/components/navlab/NavInscription";
import { NavPill } from "@/components/navlab/NavPill";
import { NavMinimal } from "@/components/navlab/NavMinimal";

export const metadata: Metadata = {
  title: "VIS·MAJOR — nav concepts",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  { n: "01", name: "Standard", el: <NavStandard /> },
  { n: "02", name: "Centered mark", el: <NavCentered /> },
  { n: "03", name: "Inscription", el: <NavInscription /> },
  { n: "04", name: "Floating pill", el: <NavPill /> },
  { n: "05", name: "Minimal", el: <NavMinimal /> },
];

/**
 * A private lab to compare nav-bar directions, each shown over a faint hint of
 * page. Not linked or indexed.
 */
export default function NavLab() {
  return (
    <main className="bg-paper-0">
      {CONCEPTS.map((c) => (
        <section key={c.n} className="relative border-b border-[var(--hair)]" style={{ minHeight: 260 }}>
          {/* faint page hint behind the bar */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <Image src="/scenes/pectus.png" alt="" fill sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.09 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.9))" }} />
          </div>

          <div className="relative z-10">{c.el}</div>

          <span className="pointer-events-none absolute bottom-4 left-5 z-20 inline-flex items-center gap-2 rounded-full bg-ink-0 px-3.5 py-1.5 ring-1 ring-paper-0/25">
            <span className="caps text-[10px] font-semibold text-paper-0">
              {c.n} · {c.name}
            </span>
          </span>
        </section>
      ))}
    </main>
  );
}
