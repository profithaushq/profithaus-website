import Label from "@/components/Label";

const ROWS = [
  {
    title: "Brand",
    body: "Positioning, proposition and tone. Getting clear on why someone pays full price for you, then making sure every channel protects it.",
  },
  {
    title: "Content",
    body: "What you say, where, and why it sells. Social, creators and campaigns planned around launches and drops, not posted to fill a grid.",
  },
  {
    title: "Channels",
    body: "Email, paid social, organic and marketplaces working off the same plan. We direct the specialists you already pay, so they stop taking credit for the same sale.",
  },
  {
    title: "Website",
    body: "The shop window and the till. Merchandising, product pages, promotions and the trading calendar, so the traffic you've paid for actually converts.",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Label>What we do</Label>
        <h2
          id="approach-heading"
          className="display mt-8 max-w-[20ch] text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.04]"
        >
          Four things that should work <em>together</em>, instead of four
          separate invoices.
        </h2>

        <div className="mt-16 border-b border-hairline md:mt-24">
          {ROWS.map((row, i) => (
            <div
              key={row.title}
              className="rule-row group grid gap-5 border-t border-hairline py-9 md:grid-cols-[4rem_1fr_1.1fr] md:items-baseline md:gap-10 md:py-14"
            >
              <p
                aria-hidden
                className="display text-xl text-brand-grey tabular-nums"
              >
                0{i + 1}
              </p>
              <h3 className="display text-[clamp(2.6rem,6.4vw,5.75rem)] leading-none transition-transform duration-500 ease-out group-hover:translate-x-2">
                {row.title}
              </h3>
              <p className="max-w-xl text-lg leading-relaxed text-brand-grey">
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
