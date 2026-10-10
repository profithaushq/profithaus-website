"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const NOTE_SEGMENTS: { text: string; keyword?: boolean }[] = [
  { text: "We started profithaus because we were tired of watching " },
  { text: "good brands", keyword: true },
  { text: " get let down by agencies who'd never actually run one. We've been " },
  { text: "in-house,", keyword: true },
  { text: " made the calls, and lived with the results. That's the only way we work now: " },
  { text: "senior, hands-on,", keyword: true },
  { text: " and invested in your numbers like they're " },
  { text: "our own.", keyword: true },
];

export default function FounderNote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = Array.from(
      section.querySelectorAll<HTMLElement>(".note-word"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Each word lights up in turn; the haus words (the italic ones) arrive
      // in burgundy as they do.
      words.forEach((word, i) => {
        tl.to(word, { opacity: 1, duration: 1, ease: "none" }, i);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-32 text-oxblood"
    >
      {/* One divide, vertical and edge to edge, in oxblood on a light ground */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-3 w-px bg-oxblood sm:left-6"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
          A note from the founders
        </p>

        <p className="mt-8 font-serif text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.8rem]">
          {NOTE_SEGMENTS.map((segment, i) =>
            segment.text.split(" ").map((word, j) =>
              word === "" ? null : (
                <span key={`${i}-${j}`} className="note-word">
                  {segment.keyword ? (
                    <em className="text-burgundy">{word}</em>
                  ) : (
                    word
                  )}{" "}
                </span>
              ),
            ),
          )}
        </p>
      </div>
    </section>
  );
}
