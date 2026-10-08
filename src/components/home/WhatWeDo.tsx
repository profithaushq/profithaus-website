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
      className="scroll-mt-20 px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <Label>What we do</Label>
        <h2
          id="approach-heading"
          className="mt-6 max-w-[24ch] text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.08] font-light tracking-[-0.04em]"
        >
          Four things that should work together, instead of four separate
          invoices.
        </h2>

        <div className="mt-14 border-b border-hairline md:mt-20">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="grid gap-4 border-t border-hairline py-8 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-12"
            >
              <h3 className="text-[clamp(2rem,4.6vw,4rem)] leading-none font-light tracking-[-0.045em]">
                {row.title}
              </h3>
              <p className="max-w-xl text-lg leading-relaxed text-brand-grey md:pt-2">
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
