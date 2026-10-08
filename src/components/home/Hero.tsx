import type { CSSProperties, ReactNode } from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import LivingBackground from "@/components/LivingBackground";
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
    <section className="on-dark relative flex min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-brand-black px-6 py-20 text-white sm:px-10 sm:py-28">
      <LivingBackground className="absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <Label dot onDark>
          Growth and marketing strategy for mid-luxury fashion and beauty
        </Label>

        <h1 className="display mt-10 text-[clamp(2.4rem,calc(9.8vw+0.3rem),10rem)] leading-[0.96]">
          {LINES.map((line, i) => (
            <span key={i} className="ph-line-mask">
              <span className="ph-line" style={{ "--i": i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <hr className="mt-14 border-white/20 sm:mt-20" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xl leading-snug font-medium sm:text-2xl">
              {BRAND_NAME} is the senior growth partner for mid-luxury fashion
              and beauty brands.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Brand, content, channels and the website, run as one plan by
              people who&apos;ve done it in-house.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 lg:justify-end">
            <Button href="/apply" variant="white">
              Apply to work with us
            </Button>
            <a href="#about" className="caps link-rule hover:text-white/80">
              Meet Heidi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
