"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";

const PROOF = [
  "Nearly 10 years in the industry",
  "£50m+ in revenue managed",
  "Previously THG, Known Nutrition and LookFantastic",
];

/**
 * The homepage opening: type first. The line is set large on the oxblood, a
 * short note under it, and the track record along the bottom. The copy rises
 * in once, then it is left alone.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".ph-h-item", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.09,
        ease: "lux",
        delay: 0.1,
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative flex min-h-[30rem] flex-col overflow-hidden bg-oxblood px-6 pt-8 text-white sm:min-h-[33rem] sm:px-10 sm:pt-10"
    >
      {/* A quiet sheen in the oxblood, nothing more */}
      <LivingBackground className="absolute inset-0 opacity-15" />

      <p className="ph-h-item relative z-10 text-[11px] font-medium tracking-[0.2em] text-powder uppercase">
        E-commerce strategic partner
      </p>

      <div className="relative z-10 my-auto py-10 sm:py-12">
        <h1 className="ph-h-item font-serif text-[clamp(2.2rem,4.6vw,4.7rem)] leading-[0.95] tracking-[-0.03em]">
          Making brands harder to ignore and{" "}
          <em className="text-powder">easier to buy from.</em>
        </h1>

        <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-14">
          <p className="ph-h-item max-w-xl text-base leading-relaxed text-white/80 sm:text-[17px]">
            Your e-commerce director, without the ridiculous salary. Senior
            advice for small and medium brands, from people who have done the
            job in-house.
          </p>
          <p className="ph-h-item shrink-0">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-3 border-b border-pink pb-2 text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:text-powder"
            >
              Apply to work with us
              <span
                aria-hidden
                className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* The track record, kept quiet */}
      <ul className="ph-h-item relative z-10 -mx-6 flex flex-col gap-1.5 border-t border-white/15 px-6 py-5 text-[11px] font-medium tracking-[0.16em] text-powder/80 uppercase sm:-mx-10 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-1 sm:px-10">
        {PROOF.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
