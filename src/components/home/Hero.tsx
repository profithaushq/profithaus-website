import type { CSSProperties } from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import { BRAND_NAME } from "@/config/site";

const LINES = [
  "Growth for fashion",
  "and beauty brands",
  "that won't look",
  "cheap to get it.",
];

export default function Hero() {
  return (
    <section className="px-6 pt-14 pb-16 sm:px-10 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-[1280px]">
        <Label dot>
          Growth and marketing strategy for mid-luxury fashion and beauty
        </Label>

        <h1 className="mt-8 text-[clamp(2.15rem,8.4vw,8.25rem)] leading-[1] font-light tracking-[-0.05em]">
          {LINES.map((line, i) => (
            <span key={line} className="ph-line-mask">
              <span className="ph-line" style={{ "--i": i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <hr className="mt-12 border-hairline sm:mt-16" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
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

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <Button href="/apply">Apply to work with us</Button>
            <a
              href="#about"
              className="text-sm font-semibold underline decoration-brand-red decoration-2 underline-offset-[6px] transition-colors hover:text-brand-red"
            >
              Meet Heidi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
