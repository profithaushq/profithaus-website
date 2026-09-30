"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const BACKGROUNDS = {
  dark: "bg-ink text-white",
  light: "bg-cream text-ink",
  maroon: "bg-maroon text-white",
};

export default function KineticStatement({
  eyebrow,
  segments,
  background = "dark",
  className = "",
}: {
  eyebrow?: string;
  segments: { text: string; accent?: boolean }[];
  background?: keyof typeof BACKGROUNDS;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const words = section.querySelectorAll(".kinetic-word");

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(words, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(words, { opacity: 0, y: 28 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () =>
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.035,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen items-center ${BACKGROUNDS[background]} ${className}`}
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        {eyebrow && (
          <p className="mb-6 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <p className="font-[family-name:var(--font-heading)] text-3xl font-light leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
          {segments.map((segment, i) =>
            segment.text.split(" ").map((word, j) => (
              <span
                key={`${i}-${j}`}
                className={`kinetic-word inline-block ${
                  segment.accent ? "text-accent font-medium" : ""
                }`}
              >
                {word}
                &nbsp;
              </span>
            )),
          )}
        </p>
      </div>
    </section>
  );
}
