"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import PH from "@/components/PH";

/**
 * The homepage opening, after the 5c concept: oxblood ground, the reading
 * (7.0) set huge and bleeding off the edge, the divide, and a white card
 * carrying the line. Motion lives on the blocks themselves: the reading
 * counts up, the divide draws, the card wipes open.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const intRef = useRef<HTMLSpanElement>(null);
  const decRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  // Start from 0.0 so the count has somewhere to climb from
  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    if (intRef.current) intRef.current.textContent = "0";
    if (decRef.current) decRef.current.textContent = ".0";
  }, []);

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
      const reading = { v: 0 };
      const tl = gsap.timeline();

      tl.to(".ph-h-divide", {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.inOut",
      })
        .to(
          reading,
          {
            v: 7,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              const whole = Math.floor(reading.v + 1e-6);
              if (intRef.current) intRef.current.textContent = String(whole);
              if (decRef.current)
                decRef.current.textContent =
                  "." + String(Math.round((reading.v - whole) * 10) % 10);
            },
            onComplete: () => {
              if (intRef.current) intRef.current.textContent = "7";
              if (decRef.current) decRef.current.textContent = ".0";
            },
          },
          0.1,
        )
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

      <p className="ph-h-item absolute top-7 right-6 z-10 font-mono text-xs tracking-[0.12em] text-powder uppercase sm:right-10">
        Neutral · 7.0
      </p>

      {/* The reading, cropped by the edge of the frame */}
      <p
        aria-label="pH 7.0"
        className="pointer-events-none absolute top-16 right-[-0.04em] font-serif leading-[0.8] tracking-[-0.05em] text-white select-none lg:top-auto lg:bottom-[6%]"
        style={{ fontSize: "clamp(9.5rem, 36vw, 34rem)" }}
      >
        <span ref={intRef} aria-hidden>
          7
        </span>
        <em ref={decRef} aria-hidden>
          .0
        </em>
      </p>

      {/* The divide: pink, vertical, edge to edge, one per layout */}
      <span
        aria-hidden
        className="ph-h-divide absolute inset-y-0 left-[72%] w-[3px] origin-top bg-pink lg:left-[51.4%]"
      />

      <div className="ph-h-card absolute right-4 bottom-4 left-4 z-10 flex flex-col gap-5 bg-white p-7 text-oxblood sm:right-auto sm:bottom-12 sm:left-12 sm:w-[min(40rem,calc(51.4%-4.5rem))] sm:p-10">
        <p className="ph-h-item font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
          E-commerce partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(2.4rem,4.4vw,4.1rem)] leading-[0.95] tracking-[-0.03em]">
          Making brands harder to ignore and <em>easier to buy from.</em>
        </h1>
        <span aria-hidden className="ph-h-item block h-[2px] bg-pink" />
        <p className="ph-h-item max-w-md text-[15px] leading-relaxed text-ink">
          An e-commerce consultancy for small and medium brands, run by people
          who have done the job in-house.
        </p>
        <p className="ph-h-item">
          <Link
            href="/apply"
            className="inline-block bg-oxblood px-6 py-3.5 font-mono text-xs tracking-[0.1em] text-white uppercase transition-colors duration-300 hover:bg-burgundy"
          >
            Test your <PH />
          </Link>
        </p>
      </div>
    </section>
  );
}
