"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BASE_SPEED = 1;

export default function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 8 }).flatMap(() => items);
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
      duration: 24,
      ease: "none",
      repeat: -1,
    });
    tween.timeScale(BASE_SPEED);

    let lastY = window.scrollY;
    let resetTimeout: ReturnType<typeof setTimeout>;

    function handleScroll() {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      const velocityBoost = gsap.utils.clamp(-3, 3, delta * 0.15);
      const direction = delta < 0 ? -1 : 1;
      tween.timeScale(direction * (BASE_SPEED + Math.abs(velocityBoost)));

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => tween.timeScale(BASE_SPEED), 250);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(resetTimeout);
      tween.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="marquee-track flex w-max gap-16">
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap font-[family-name:var(--font-manrope)] text-sm font-medium text-brand-grey"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
