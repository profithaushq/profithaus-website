"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const BACKGROUNDS = {
  dark: "bg-ink text-white",
  light: "bg-cream text-ink",
  maroon: "bg-maroon text-white",
};

export default function Scene({
  children,
  background = "light",
  parallaxLabel,
  className = "",
}: {
  children: ReactNode;
  background?: keyof typeof BACKGROUNDS;
  parallaxLabel?: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".scene-item");

      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 56 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.14,
          }),
      });

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen items-center overflow-hidden py-24 ${BACKGROUNDS[background]} ${className}`}
    >
      {parallaxLabel && (
        <div
          ref={labelRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="font-[family-name:var(--font-heading)] text-[22vw] font-light leading-none tracking-tight text-current opacity-[0.04] whitespace-nowrap">
            {parallaxLabel}
          </span>
        </div>
      )}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
