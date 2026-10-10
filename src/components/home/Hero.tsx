"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";
/**
 * The homepage opening, after the 5c concept: oxblood ground, the divide,
 * a white card carrying the line, and the seal zoomed in and cropped by the
 * frame. Motion lives on the blocks themselves: the divide draws, the card
 * wipes open, the seal fades up.
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
      className="relative min-h-[40rem] overflow-hidden bg-oxblood text-white lg:h-[calc(100svh-5.2rem)] lg:max-h-[52rem]"
    >
      {/* A quiet sheen in the oxblood, nothing more */}
      <LivingBackground className="absolute inset-0 opacity-30" />

      {/* The seal, zoomed in and cropped by the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-24 w-[22rem] sm:-right-32 sm:w-[30rem] lg:top-1/2 lg:right-[-12%] lg:w-[clamp(34rem,56vw,60rem)] lg:-translate-y-1/2"
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
