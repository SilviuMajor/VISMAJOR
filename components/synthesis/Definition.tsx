/**
 * The name, defined.
 *
 * Set as a dictionary entry rather than as brand copy: headword, pronunciation,
 * part of speech, then the sense. It does two jobs at once. It explains a name
 * most people will not have met, and it earns the classical imagery by
 * grounding it in the actual Latin rather than in atmosphere.
 *
 * The legal sense is the useful one. Vis major is a term of art for a force
 * nothing could have guarded against, which is a better fit for the house than
 * a literal "greater force" reading.
 */
export function Definition() {
  return (
    <section className="bg-paper-0 pt-[clamp(56px,7vw,104px)]" data-mark="112">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div
          className="border-y py-9 md:py-12"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <h2
                className="serif text-ink-0"
                style={{
                  fontSize: "clamp(30px,3.6vw,50px)",
                  lineHeight: 1.04,
                  letterSpacing: "0.01em",
                }}
              >
                vis major
              </h2>
              <p
                className="mt-3 font-mono text-[11px] text-ink-3"
                style={{ letterSpacing: "0.04em" }}
              >
                /vɪs ˈmeɪdʒə/ &nbsp;·&nbsp; noun &nbsp;·&nbsp; Latin
              </p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <ol className="flex flex-col gap-4">
                <li className="flex gap-4">
                  <span className="num shrink-0 text-[13px] font-semibold tabular-nums text-ink-3">
                    1.
                  </span>
                  <span className="text-[16.5px] leading-[1.62] text-ink-1">
                    Superior force. The greater of two forces acting on the
                    same body.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="num shrink-0 text-[13px] font-semibold tabular-nums text-ink-3">
                    2.
                  </span>
                  <span className="text-[16.5px] leading-[1.62] text-ink-1">
                    <span className="italic text-ink-2">Law.</span> An
                    irresistible force that no foresight could guard against,
                    and for which no one can be held answerable.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
