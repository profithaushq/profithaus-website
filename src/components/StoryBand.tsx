"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import LitText from "@/components/LitText";

/**
 * One chapter of the About story: a full-width colour band with an oversized
 * number drifting behind, a title that rises letter by letter, and
 * paragraphs that light up as you read.
 */
export default function StoryBand({
  number,
  title,
  paragraphs,
  bg,
  fg,
  muted,
}: {
  number: string;
  title: string;
  paragraphs: string[];
  bg: string;
  fg: string;
  muted: string;
}) {
  const bandRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const band = bandRef.current;
    const num = numRef.current;
    const titleEl = titleRef.current;
    if (!band || !num || !titleEl) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(titleEl, {
        type: "words,chars",
        mask: "chars",
      });
      split.masks.forEach((m) => {
        const el = m as HTMLElement;
        el.style.overflow = "visible";
        el.style.clipPath = "inset(-0.3em -0.6em 0 -0.6em)";
      });

      const ctx = gsap.context(() => {
        gsap.fromTo(
          split.chars,
          { yPercent: 115 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.03,
            scrollTrigger: {
              trigger: band,
              start: "top 70%",
              end: "top 25%",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          num,
          { yPercent: 14 },
          {
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: band,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, band);

      return () => {
        ctx.revert();
        split.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={bandRef}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: bg, color: fg }}
    >
      <span
        ref={numRef}
        aria-hidden
        className="ph-outline pointer-events-none absolute -top-[4vw] -right-[2vw] font-[family-name:var(--font-manrope)] text-[42vw] leading-none font-extrabold tracking-tighter select-none lg:text-[30vw]"
        style={{ ["--ph-stroke" as string]: muted }}
      >
        {number}
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <h2
          ref={titleRef}
          className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.045em]"
        >
          {title}
        </h2>

        <div className="space-y-6">
          {paragraphs.map((paragraph) => (
            <LitText
              key={paragraph}
              className="text-lg leading-relaxed font-medium sm:text-xl"
            >
              {paragraph}
            </LitText>
          ))}
        </div>
      </div>
    </section>
  );
}
