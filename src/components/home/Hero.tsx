"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";

const SHOTS = [
  { src: "/images/hero/wax.jpg", alt: "The pH seal pressed into silver wax" },
  {
    src: "/images/hero/tote.jpg",
    alt: "A leather tote debossed with the pH seal",
  },
  { src: "/images/hero/glass.jpg", alt: "The pH seal on a glass of water" },
  {
    src: "/images/hero/plaster.jpg",
    alt: "The profit|haus wordmark pressed into plaster",
  },
  { src: "/images/hero/seals.jpg", alt: "Embossed pH seals on a roll of tape" },
  { src: "/images/hero/patch.jpg", alt: "The pH seal as an embroidered patch" },
];

/**
 * The homepage opening, after the 5c concept: oxblood ground, the reading
 * (7.0) set huge and bleeding off the edge, the divide, and the line set
 * straight onto the oxblood. Motion lives on the elements themselves: the
 * reading counts up, the divide draws, the copy rises in.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const intRef = useRef<HTMLSpanElement>(null);
  const decRef = useRef<HTMLElement>(null);
  const played = useRef(false);
  const [shot, setShot] = useState(0);

  // The brand in the world: a slow crossfade through the mockups
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setShot((n) => (n + 1) % SHOTS.length),
      5600,
    );
    return () => window.clearInterval(id);
  }, [shot]);

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
        .to(".ph-h-stage", { opacity: 1, duration: 1.8, ease: "lux" }, 0.2)
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

      {/* Brand imagery, duotoned into the oxblood */}
      <div className="ph-h-stage absolute inset-0 isolate overflow-hidden bg-oxblood lg:left-[51.4%]">
        {SHOTS.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
              i === shot ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={i === shot ? s.alt : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover mix-blend-lighten brightness-[0.75] contrast-125 grayscale transition-transform duration-[7000ms] ease-out ${
                i === shot ? "scale-100" : "scale-[1.08]"
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-oxblood/80 lg:bg-oxblood/30" />
        <div
          role="group"
          aria-label="Brand imagery"
          className="absolute top-5 left-6 z-10 flex lg:left-8"
        >
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show image ${i + 1} of ${SHOTS.length}`}
              aria-pressed={i === shot}
              onClick={() => setShot(i)}
              className="group cursor-pointer px-1 py-3"
            >
              <span
                className={`block h-[2px] w-7 transition-colors duration-500 ${
                  i === shot
                    ? "bg-white"
                    : "bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <p className="ph-h-item absolute top-7 right-6 z-10 font-sans font-medium text-xs tracking-[0.12em] text-powder uppercase sm:right-10">
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
        className="ph-h-divide absolute top-0 left-[72%] h-[34%] w-[2px] origin-top bg-pink sm:h-full lg:left-[51.4%]"
      />

      <div className="absolute right-6 bottom-8 left-6 z-10 flex flex-col gap-6 text-white sm:right-auto sm:bottom-14 sm:left-12 sm:w-[min(40rem,calc(51.4%-4.5rem))]">
        <p className="ph-h-item flex items-center gap-4 text-[11px] tracking-[0.2em] text-powder uppercase">
          <span aria-hidden className="block h-px w-8 bg-pink" />
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
    </section>
  );
}
