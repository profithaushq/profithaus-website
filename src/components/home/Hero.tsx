"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";

/**
 * The homepage opening: oxblood ground, the line set straight onto it, and
 * the seal zoomed in and cropped by the frame. The copy rises in once and the
 * seal fades up.
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
      gsap.to(".ph-h-item", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "lux",
        delay: 0.2,
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative overflow-hidden bg-oxblood text-white sm:min-h-[40rem] lg:h-[calc(100svh-5.2rem)] lg:max-h-[52rem]"
    >
      {/* A quiet sheen in the oxblood, nothing more */}
      <LivingBackground className="absolute inset-0 opacity-30" />

      {/* The seal, zoomed in and cropped by the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden sm:-top-10 sm:right-[-8rem] sm:block sm:w-[30rem] lg:top-1/2 lg:right-[-12%] lg:w-[clamp(34rem,56vw,60rem)] lg:-translate-y-1/2"
      >
        <div className="ph-h-item">
          <Mark
            className="h-auto w-full"
            style={
              {
                "--mark-disc": "var(--burgundy)",
                "--mark-glyph": "var(--porcelain)",
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 px-6 py-16 sm:absolute sm:top-1/2 sm:right-auto sm:bottom-auto sm:left-12 sm:p-0 sm:w-[min(36rem,calc(72%-4rem))] sm:-translate-y-1/2 lg:w-[min(38rem,calc(51.4%-6rem))]">
        <p className="ph-h-item font-sans text-[11px] font-medium tracking-[0.2em] text-powder uppercase">
          E-commerce strategic partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(2.1rem,4vw,3.9rem)] leading-[0.97] tracking-[-0.03em]">
          Making brands harder to ignore and{" "}
          <em className="text-powder">easier to buy from.</em>
        </h1>
        <p className="ph-h-item text-base text-white/80">
          Your e-commerce director, without the ridiculous salary.
        </p>
        <p className="ph-h-item">
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
    </section>
  );
}
