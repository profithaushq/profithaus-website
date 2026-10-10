"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BASE_SPEED = 1;

const VARIANTS = {
  logos:
    "whitespace-nowrap font-sans text-sm font-medium text-brand-grey",
  phrase:
    "whitespace-nowrap font-serif text-4xl tracking-[-0.02em] sm:text-6xl",
  display:
    "whitespace-nowrap font-serif text-[clamp(3.2rem,9vw,9rem)] leading-none tracking-[-0.03em]",
};

export default function Marquee({
  items,
  variant = "logos",
  duration = 60,
  separator,
  repeat = 4,
}: {
  items: string[];
  variant?: keyof typeof VARIANTS;
  duration?: number;
  separator?: string;
  repeat?: number;
}) {
  const repeated = Array.from({ length: repeat * 2 }).flatMap(() => items);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    track.style.animation = "none";

    const tween = gsap.to(track, {
      xPercent: -50,
      duration,
      ease: "none",
      repeat: -1,
    });
    // The type is smaller on phones, so the track is shorter and the same
    // duration reads as slower. Compensate to keep a similar pace.
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const baseSpeed = isPhone ? BASE_SPEED * 2 : BASE_SPEED;
    tween.timeScale(baseSpeed);

    let lastY = window.scrollY;
    let resetTimeout: ReturnType<typeof setTimeout>;

    function handleScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      const velocityBoost = gsap.utils.clamp(-3, 3, delta * 0.15);
      const direction = delta < 0 ? -1 : 1;
      tween.timeScale(direction * (baseSpeed + Math.abs(velocityBoost)));

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => tween.timeScale(baseSpeed), 250);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(resetTimeout);
      tween.kill();
    };
  }, [duration]);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className={`marquee-track flex w-max items-center ${separator ? "gap-8" : "gap-16"}`}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span
              className={`${VARIANTS[variant]} ${
                variant === "display" && index % items.length % 2 === 1
                  ? "italic"
                  : ""
              }`}
            >
              {item}
            </span>
            {separator && (
              <span
                aria-hidden
                className={`inline-block bg-pink ${
                  variant === "display"
                    ? "h-[clamp(2.4rem,7vw,7rem)] w-[2px]"
                    : "h-8 w-[2px] sm:h-12"
                }`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
