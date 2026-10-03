"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BASE_SPEED = 1;

const VARIANTS = {
  logos:
    "whitespace-nowrap font-[family-name:var(--font-manrope)] text-sm font-medium text-brand-grey",
  phrase:
    "whitespace-nowrap font-[family-name:var(--font-manrope)] text-3xl font-extrabold uppercase tracking-tight sm:text-5xl",
  display:
    "whitespace-nowrap font-[family-name:var(--font-manrope)] text-[clamp(3rem,8vw,8rem)] leading-none font-extrabold uppercase tracking-tight",
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
        className={`marquee-track flex w-max items-center will-change-transform ${separator ? "gap-8" : "gap-16"}`}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span
              className={`${VARIANTS[variant]} ${
                variant === "display" && index % items.length % 2 === 1
                  ? "ph-outline"
                  : ""
              }`}
            >
              {item}
            </span>
            {separator && (
              <span
                aria-hidden
                className={
                  variant === "display"
                    ? "text-[clamp(2rem,6vw,6rem)] text-brand-red"
                    : variant === "phrase"
                      ? "text-3xl text-brand-red sm:text-5xl"
                      : "text-brand-red"
                }
              >
                {separator}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
