"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";

const PROOF = [
  { value: "Nearly 10", caption: "years in the industry" },
  { value: "£50m+", caption: "in revenue managed" },
  { value: "THG, Known Nutrition", caption: "LookFantastic, Coggles and more" },
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
      className="relative flex flex-col overflow-hidden bg-oxblood px-6 pt-6 text-white sm:px-10"
    >
      {/* A quiet sheen in the oxblood, nothing more */}
      <LivingBackground className="absolute inset-0 opacity-30" />

      <p className="ph-h-item relative z-10 text-[11px] font-medium tracking-[0.2em] text-powder uppercase">
        E-commerce strategic partner
      </p>

      <div className="relative z-10 py-8 sm:py-10">
        <h1 className="ph-h-item font-serif text-[clamp(2.7rem,6.4vw,6.6rem)] leading-[0.92] tracking-[-0.035em]">
          Making brands harder to ignore and{" "}
          <em className="text-powder">easier to buy from.</em>
        </h1>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-14">
          <p className="ph-h-item max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Your e-commerce director, without the ridiculous salary. Senior
            advice for small and medium brands, from people who have done the
            job in-house. We advise first, and can build it too.
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

      {/* The track record */}
      <ul className="ph-h-item relative z-10 -mx-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 px-6 py-5 sm:-mx-10 sm:px-10 md:grid-cols-[1fr_1fr_1.6fr] md:gap-x-10">
        {PROOF.map((item, i) => (
          <li
            key={item.value}
            className={i === PROOF.length - 1 ? "col-span-2 md:col-span-1" : ""}
          >
            <p className="font-serif text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none tracking-[-0.02em]">
              {item.value}
            </p>
            <p className="mt-2 text-[11px] font-medium tracking-[0.16em] text-powder uppercase">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
