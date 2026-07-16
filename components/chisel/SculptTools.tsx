import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ToolPhoto } from "@/components/steel/ToolPhoto";

/** "The Tool (optional)" — the steel tool is an add-on, never the product. */
export function SculptTools() {
  return (
    <section
      className="border-t bg-paper-0 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              The Tool · Optional
            </span>
          </div>
          <h2
            className="mt-5 max-w-2xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(28px, 4.2vw, 56px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            Add steel, if you want more.
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
            The cream is the product. The SCULPT steel tool is an optional
            add-on for anyone who wants more from the ritual: one weighted blade
            with several edges, made for massage and for working the cream in. Not
            medical, not a treatment.
          </p>
        </Reveal>

        {/* the steel blade — the optional tool */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <div className="relative h-[22vh] max-h-[190px] w-[min(560px,88vw)]">
              <ToolPhoto tool="sword" sizes="(max-width: 768px) 88vw, 560px" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Link
            href="/steel"
            className="caps group mt-12 inline-flex items-center gap-2 border-t pt-6 text-[11px] font-medium text-ink-0"
            style={{ borderColor: "var(--hair)" }}
          >
            See STEEL
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
