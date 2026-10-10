import Reveal from "@/components/Reveal";

const LINE =
  "The finished website looks fantastic, functions seamlessly, and has received great feedback from our team and customers alike.";

const FULL_REVIEW =
  "We had the pleasure of working with profithaus. on the redesign of our Oceans Alive website, and we couldn't be happier with the result. From start to finish, they were professional, responsive, and incredibly easy to work with. They took the time to understand our vision and transformed it into a modern, user-friendly website that truly reflects our brand and mission. Their attention to detail, creativity, and technical expertise were evident throughout the entire project. The finished website looks fantastic, functions seamlessly, and has received great feedback from our team and customers alike. Heidi kept us informed at every stage, delivered on time, and went above and beyond to ensure everything was exactly as we wanted. We'd highly recommend them to anyone looking for a talented and reliable web designer.";

const PREVIOUSLY = [
  "LookFantastic",
  "Coggles",
  "Known Nutrition",
  "DMR Jewellery",
  "Myvitamins",
];

/** Case-study tiles, from real material: a client's words, and where the team has operated. */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-20 bg-white px-6 pb-24 text-oxblood sm:px-10 sm:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
            Work
          </p>
          <h2 id="work-heading" className="sr-only">
            Work
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <figure className="group flex h-full min-h-[22rem] flex-col justify-between bg-oxblood p-7 text-white transition-[transform,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:bg-burgundy sm:p-10">
              <figcaption className="font-mono text-xs tracking-[0.12em] text-powder uppercase">
                What clients say
              </figcaption>
              <blockquote className="mt-10 font-serif text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
                &ldquo;{LINE}&rdquo;
              </blockquote>
              <div className="mt-10">
                <p className="font-mono text-[11px] tracking-[0.1em] text-powder uppercase">
                  Miriam, Director at Oceans Alive
                </p>
                <details className="mt-5 max-w-2xl">
                  <summary className="inline-flex cursor-pointer list-none font-mono text-[11px] tracking-[0.1em] uppercase underline decoration-pink underline-offset-[6px] [&::-webkit-details-marker]:hidden">
                    Read the full review
                  </summary>
                  <p className="ph-swap mt-5 text-[15px] leading-relaxed text-white/90">
                    &ldquo;{FULL_REVIEW}&rdquo;
                  </p>
                </details>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full min-h-[22rem] flex-col justify-between bg-porcelain p-7 sm:p-10">
              <p className="font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
                Previously operated
              </p>
              <ul className="mt-10">
                {PREVIOUSLY.map((name, i) => (
                  <li
                    key={name}
                    className="group border-t border-line-strong py-3 first:border-t-0"
                  >
                    <span
                      className={`inline-block font-serif text-[2rem] leading-none tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-2 ${
                        i % 2 ? "italic" : ""
                      }`}
                    >
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-mono text-[11px] tracking-[0.1em] uppercase">
                Across the THG group and Known Nutrition
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
