"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";
import Mark from "@/components/Mark";

const STEPS = Array.from({ length: 15 }, (_, i) => i);

function zoneLabel(v: number) {
  if (v === 7) return "Neutral";
  if (v <= 2) return "All profit, no pull";
  if (v >= 12) return "All haus, no sales";
  return v < 7 ? "Leaning profit" : "Leaning haus";
}

/**
 * The homepage opening, after the 5c concept: oxblood ground, the reading
 * (7.0) set huge and bleeding off the edge, the divide, and the line set
 * straight onto the oxblood. Motion lives on the elements themselves: the
 * reading counts up, the divide draws, the copy rises in. Once it has
 * settled, running a cursor along the scale previews other readings.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const intRef = useRef<HTMLSpanElement>(null);
  const decRef = useRef<HTMLElement>(null);
  const played = useRef(false);
  const live = useRef(false);
  const needle = useRef({ v: 7 });
  const tween = useRef<gsap.core.Tween | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  function write(v: number) {
    const whole = Math.floor(v + 1e-6);
    if (intRef.current) intRef.current.textContent = String(whole);
    if (decRef.current)
      decRef.current.textContent =
        "." + String(Math.round((v - whole) * 10) % 10);
  }

  function preview(n: number) {
    if (!live.current) return;
    tween.current?.kill();
    tween.current = gsap.to(needle.current, {
      v: n,
      duration: 0.6,
      ease: "lux",
      onUpdate: () => write(needle.current.v),
    });
    setHover(n === 7 ? null : n);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      live.current = true;
    }
    return () => {
      tween.current?.kill();
    };
  }, []);

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
        .to(".ph-h-stage", { opacity: 1, duration: 0.2 }, 1.2)
        .fromTo(
          ".ph-h-seal",
          { scale: 1.4 },
          { scale: 1, duration: 0.7, ease: "power4.out" },
          1.2,
        )
        .to(
          reading,
          {
            v: 7,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => write(reading.v),
            onComplete: () => {
              write(7);
              needle.current.v = 7;
              live.current = true;
            },
          },
          0.1,
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

      {/* The seal, stamped onto the divide */}
      <div className="ph-h-stage pointer-events-none absolute top-[7%] left-[51.4%] z-10 hidden -translate-x-1/2 lg:block">
        <div className="ph-h-seal rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.35)] ring-2 ring-pink ring-offset-[7px] ring-offset-oxblood">
          <Mark
            className="size-36 xl:size-44"
            style={
              {
                "--mark-disc": "var(--porcelain)",
                "--mark-glyph": "var(--oxblood)",
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <p className="ph-h-item absolute top-7 right-6 z-10 font-sans font-medium text-xs tracking-[0.12em] text-powder uppercase sm:right-10">
        {hover === null ? "Neutral · 7.0" : `${zoneLabel(hover)} · ${hover}.0`}
      </p>

      {/* The reading, cropped by the edge of the frame */}
      <p
        aria-label="pH 7.0"
        className="pointer-events-none absolute top-16 right-[-0.04em] font-serif leading-[0.8] tracking-[-0.05em] text-white select-none lg:top-auto lg:bottom-[11%]"
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
        className="ph-h-divide absolute top-0 left-[72%] h-[34%] w-[2px] origin-top bg-pink sm:h-full lg:left-[51.4%]"
      />

      <div className="absolute right-6 bottom-8 left-6 z-10 flex flex-col gap-6 text-white sm:right-auto sm:bottom-24 sm:left-12 sm:w-[min(40rem,calc(51.4%-4.5rem))]">
        <p className="ph-h-item text-[11px] tracking-[0.2em] text-powder uppercase">
          E-commerce strategic partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">
          Making brands harder to ignore and{" "}
          <em className="text-powder">easier to buy from.</em>
        </h1>
        <p className="ph-h-item max-w-md text-[15px] leading-relaxed text-white/80">
          Your e-commerce director, without the ridiculous salary. Senior advice
          for small and medium brands, from people who have done the job
          in-house. We advise first, and can build it too.
        </p>
        <p className="ph-h-item">
          <Link
            href="/apply"
            className="group inline-flex items-center gap-3 border-b border-pink pb-2 text-xs tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:text-powder"
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

      {/* The scale: run a cursor along it and the reading follows */}
      <div
        role="presentation"
        onPointerLeave={() => preview(7)}
        className="ph-h-item absolute inset-x-0 bottom-0 z-10 hidden h-20 grid-cols-15 border-t border-white/15 sm:grid"
        style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
      >
        {STEPS.map((n) => (
          <div
            key={n}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") preview(n);
            }}
            className="group flex cursor-crosshair flex-col items-center justify-end gap-2 pb-4"
          >
            <span
              aria-hidden
              className={`block w-px transition-[height,background-color] duration-300 ease-out group-hover:h-7 group-hover:bg-white ${
                n === 7 ? "h-5 bg-pink" : "h-3 bg-white/35"
              }`}
            />
            <span
              aria-hidden
              className={`text-[10px] tracking-[0.12em] transition-colors duration-300 group-hover:text-white ${
                n === 0 || n === 7 || n === 14
                  ? "text-powder"
                  : "text-transparent"
              }`}
            >
              {n}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
