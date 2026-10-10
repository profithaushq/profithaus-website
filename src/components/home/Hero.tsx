"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";

const PROOF = [
  { value: "Nearly 10", caption: "years in the industry", big: true },
  { value: "£50m+", caption: "in revenue managed", big: true },
  {
    value: "THG, Known Nutrition",
    caption: "LookFantastic, Coggles and more",
    big: false,
  },
];

/**
 * The homepage opening, after the 5c concept: oxblood ground, the divide,
 * a white card carrying the line, and the track record set large on the
 * other side. Motion lives on the blocks themselves: the divide draws, the
 * card wipes open, the proof rises in.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".ph-h-divide", {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.inOut",
      })
        .to(
          ".ph-h-card",
          { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "lux" },
          0.45,
        )
        .to(
          ".ph-h-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "lux",
          },
          1.0,
        );
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative min-h-[47rem] overflow-hidden sm:min-h-[40rem] bg-oxblood text-white lg:h-[calc(100svh-5.2rem)] lg:max-h-[52rem]"
    >
      {/* A quiet sheen in the oxblood, nothing more */}
      <LivingBackground className="absolute inset-0 opacity-30" />

      {/* The track record, on the far side of the divide */}
      <ul className="absolute top-8 right-6 left-6 z-10 grid grid-cols-[1fr] gap-4 pr-[34%] sm:right-10 sm:left-auto sm:pr-0 lg:top-0 lg:bottom-0 lg:left-[calc(51.4%+4rem)] lg:flex lg:flex-col lg:justify-center lg:gap-0">
        {PROOF.map((item) => (
          <li
            key={item.value}
            className="ph-h-item lg:border-t lg:border-white/20 lg:py-9 lg:first:border-t-0"
          >
            <p
              className={`font-serif leading-none tracking-[-0.03em] ${
                item.big
                  ? "text-[clamp(1.7rem,7vw,2.2rem)] lg:text-[clamp(3.4rem,6.2vw,6rem)]"
                  : "text-[clamp(1.3rem,5.4vw,1.7rem)] lg:text-[clamp(1.8rem,3vw,3rem)]"
              }`}
            >
              {item.value}
            </p>
            <p className="mt-2 font-sans text-[10px] font-medium tracking-[0.16em] text-powder uppercase lg:mt-3 lg:text-xs">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>

      {/* The divide: pink, vertical, edge to edge, one per layout */}
      <span
        aria-hidden
        className="ph-h-divide absolute inset-y-0 left-[72%] w-[3px] origin-top bg-pink lg:left-[51.4%]"
      />

      <div className="ph-h-card absolute right-4 bottom-4 left-4 z-10 flex flex-col gap-5 bg-white p-7 text-oxblood sm:right-auto sm:bottom-12 sm:left-12 sm:w-[min(40rem,calc(51.4%-4.5rem))] sm:p-10">
        <p className="ph-h-item font-sans text-xs font-medium tracking-[0.12em] text-burgundy uppercase">
          E-commerce strategic partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(2.4rem,4.4vw,4.1rem)] leading-[0.95] tracking-[-0.03em]">
          Making brands harder to ignore and <em>easier to buy from.</em>
        </h1>
        <span aria-hidden className="ph-h-item block h-[2px] bg-pink" />
        <p className="ph-h-item max-w-md text-[15px] leading-relaxed text-ink">
          Your e-commerce director, without the ridiculous salary. Senior advice
          for small and medium brands, from people who have done the job
          in-house. We advise first, and can build it too.
        </p>
        <p className="ph-h-item">
          <Link
            href="/apply"
            className="inline-block bg-oxblood px-6 py-3.5 font-sans text-xs font-medium tracking-[0.1em] text-white uppercase transition-colors duration-300 hover:bg-burgundy"
          >
            Apply to work with us
          </Link>
        </p>
      </div>
    </section>
  );
}
