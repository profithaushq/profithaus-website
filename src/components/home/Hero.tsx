import type { CSSProperties, ReactNode } from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import LineMotif from "@/components/LineMotif";
import { BRAND_NAME } from "@/config/site";

const LINES: ReactNode[] = [
  "Growth for fashion",
  <>
    and <em>beauty</em> brands
  </>,
  "that won't look",
  <>
    <em>cheap</em> to get it.
  </>,
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-32">
      <LineMotif className="top-1/2 right-0 h-[130%] -translate-y-1/2 translate-x-[28%] text-brand-black/[0.09] max-sm:h-[90%]" />

      <div className="relative mx-auto max-w-[1280px]">
        <Label dot>
          Growth and marketing strategy for mid-luxury fashion and beauty
        </Label>

        <h1 className="display mt-10 text-[clamp(2.85rem,9.8vw,10rem)] leading-[0.96]">
          {LINES.map((line, i) => (
            <span key={i} className="ph-line-mask">
              <span className="ph-line" style={{ "--i": i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <hr className="mt-14 border-hairline sm:mt-20" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xl leading-snug font-medium sm:text-2xl">
              {BRAND_NAME} is the senior growth partner for mid-luxury fashion
              and beauty brands.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-grey">
              Brand, content, channels and the website, run as one plan by
              people who&apos;ve done it in-house.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 lg:justify-end">
            <Button href="/apply">Apply to work with us</Button>
            <a href="#about" className="caps link-rule hover:text-brand-red">
              Meet Heidi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
