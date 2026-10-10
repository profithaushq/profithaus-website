import Reveal from "@/components/Reveal";
import Mark from "@/components/Mark";
import { ELEMENTS } from "@/data/elements";

const SIDES = [
  {
    key: "profit" as const,
    name: <>profit</>,
    blurb:
      "Profitability. The side that reads the P&L and runs the trading calendar.",
  },
  {
    key: "haus" as const,
    name: <em>haus</em>,
    blurb:
      "Aesthetics and brand creative. The side that makes people want it in the first place.",
  },
];

/** "The pH balance formula": what pH means here, and the two sides of the logo. */
export default function Idea() {
  return (
    <section
      aria-labelledby="idea-heading"
      className="bg-porcelain px-6 py-32 text-oxblood sm:px-10 sm:py-44"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 border-t border-line-strong pt-14 lg:grid-cols-2 lg:gap-24 lg:pt-16">
        <Reveal>
          <p className="flex items-center gap-2.5 font-sans text-xs font-medium tracking-[0.12em] text-burgundy uppercase">
            <span>The</span>
            <Mark className="size-8" />
            <span className="sr-only">pH</span>
            <span>balance formula</span>
          </p>
          <h2
            id="idea-heading"
            className="mt-5 font-serif text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.1] tracking-[-0.01em] text-balance"
          >
            pH measures balance. Too much focus on profit and a brand goes cold.
            Too much focus on building the haus and nothing sells. We test where
            a brand sits and bring it back to <em>7.</em>
          </h2>
        </Reveal>

        <Reveal delay={140} className="flex flex-col justify-end gap-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {SIDES.map((side) => {
              const profit = side.key === "profit";
              const els = ELEMENTS.filter((e) => e.side === side.key);
              return (
                <div
                  key={side.key}
                  className={`group p-6 transition-[transform,background-color] duration-500 ease-out hover:-translate-y-1.5 ${
                    profit
                      ? "bg-oxblood text-white hover:bg-burgundy"
                      : "bg-white shadow-[inset_0_0_0_1px_var(--line)] hover:bg-white"
                  }`}
                >
                  <p className="font-serif text-4xl leading-none tracking-[-0.03em]">
                    {side.name}
                  </p>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      profit ? "text-white/90" : "text-ink"
                    }`}
                  >
                    {side.blurb}
                  </p>
                  <p
                    className={`mt-5 font-sans font-medium text-[10px] tracking-[0.1em] uppercase ${
                      profit ? "text-powder" : "text-burgundy"
                    }`}
                  >
                    {els.map((e) => e.title).join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="max-w-lg text-[15px] leading-relaxed text-ink">
            Each service is an element. Brand positioning, content and marketing
            pull a brand towards haus. Trading, CRO and CRM pull it towards
            profit. The line between profit and haus is neutral: 7.0.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
