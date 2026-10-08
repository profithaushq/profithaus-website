"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WORDS = ["Brand", "Content", "Channels", "Website", "One plan."];
const LABEL = "Brand, Content, Channels, Website, One plan.";

/**
 * One oversized line of type that travels sideways as the section scrolls
 * through the viewport. No pinning, so the page scrolls normally.
 */
export default function ScrollBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -Math.max(0, track.scrollWidth - window.innerWidth * 0.82),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
      // The track is as wide as the web font makes it; measure again once
      // the font has loaded.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={LABEL}
      className="overflow-hidden border-b border-hairline py-16 sm:py-24"
    >
      <div
        ref={trackRef}
        aria-hidden="true"
        className="display flex w-max items-center px-6 text-[clamp(4rem,14vw,14rem)] leading-[0.95] whitespace-nowrap sm:px-10 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-y-2 motion-reduce:text-[clamp(2.5rem,9vw,6rem)]"
      >
        {WORDS.map((word, i) => (
          <span key={word} className="flex items-center">
            <span
              className={
                word === "One plan." ? "italic !font-medium" : undefined
              }
            >
              {word}
            </span>
            {i < WORDS.length - 1 && (
              <span className="mx-[0.28em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-brand-red" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
