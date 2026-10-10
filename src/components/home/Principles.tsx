import Reveal from "@/components/Reveal";

// Brand Book 01, "How we behave"
const PRINCIPLES = [
  {
    n: "01",
    title: "Balance over extremes",
    body: "Brands go wrong at the ends of the scale. We work in the middle.",
  },
  {
    n: "02",
    title: "Operators, not observers",
    body: "The team has run the P&L. It shows in what we recommend.",
  },
  {
    n: "03",
    title: "Taste with a target",
    body: "Every creative decision has a commercial job to do.",
  },
  {
    n: "04",
    title: "Say it plainly",
    body: "If it's true, say it. No sixty-slide decks for the sake of it.",
  },
];

export default function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="bg-white px-6 pb-24 text-oxblood sm:px-10 sm:pb-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
            How we behave
          </p>
          <h2 id="principles-heading" className="sr-only">
            How we behave
          </h2>
        </Reveal>

        <ol className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <li key={p.n}>
              <Reveal delay={i * 90}>
                <div className="group relative border-t border-line-strong pt-6">
                  {/* the rule fills in as you reach for it */}
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-oxblood transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <p className="font-mono text-xs text-burgundy">{p.n}</p>
                  <h3 className="mt-5 font-serif text-[2rem] leading-[1] tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-ink">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
