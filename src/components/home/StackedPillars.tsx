"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PILLARS = [
  {
    number: "01",
    title: "In-Haus DNA",
    description:
      "Built from years in-house, we know how strong internal teams actually think and operate, because we've been there, done it, and made it work.",
  },
  {
    number: "02",
    title: "Senior Leadership",
    description:
      "We've been in leadership inside D2C giants, making the big calls, rolling up our sleeves and leading execution that actually moves the business forward.",
  },
  {
    number: "03",
    title: "Commercial & Creative Mindset",
    description:
      "We're all about performance, profitability, and industry reputation, not vanity metrics that look cute in reports but don't pay the bills.",
  },
  {
    number: "04",
    title: "360 Strategy",
    description:
      "From trading to website performance to the numbers behind it, we know the full picture, so if something's not converting or the margins don't add up, we've probably already spotted it.",
  },
];

export default function StackedPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(cards.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(card, { yPercent: 0, ease: "none" }, i - 1);
        tl.to(
          cards[i - 1],
          { scale: 0.92, filter: "brightness(0.7)", ease: "none" },
          i - 1,
        );
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white lg:h-screen">
      <div className="px-6 pt-20 lg:absolute lg:top-10 lg:left-1/2 lg:z-20 lg:-translate-x-1/2 lg:pt-0">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          How we&apos;re different
        </p>
      </div>

      <div className="relative flex flex-col gap-6 px-6 py-12 lg:h-full lg:gap-0 lg:overflow-hidden lg:p-0">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.number}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="relative flex flex-col justify-center overflow-hidden rounded-sm bg-white p-8 lg:absolute lg:inset-0 lg:rounded-none lg:p-16"
            style={{ zIndex: i + 1 }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-4 font-[family-name:var(--font-manrope)] text-[16rem] leading-none font-extrabold text-brand-black/5 select-none"
            >
              {pillar.number}
            </span>
            <div className="relative max-w-xl">
              <span className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-brand-red">
                {pillar.number}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-brand-black sm:text-5xl">
                {pillar.title}
              </h3>
              <p className="mt-4 text-brand-grey">{pillar.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
