"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

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
      gsap.set(section.querySelectorAll(".note-kw-live"), { fontWeight: 800 });
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

      words.forEach((word, i) => {
        tl.to(word, { opacity: 1, duration: 1, ease: "none" }, i);
        const live = word.querySelector(".note-kw-live");
        if (live) {
          tl.fromTo(
            live,
            { fontWeight: 500 },
            { fontWeight: 800, duration: 1.4, ease: "none" },
            i,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-32 text-brand-black"
    >
      <AmbientLines />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          A note from the founders
        </p>

        <p className="mt-8 font-[family-name:var(--font-manrope)] text-3xl leading-[1.15] font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {NOTE_SEGMENTS.map((segment, i) =>
            segment.text.split(" ").map((word, j) =>
              word === "" ? null : (
                <span
                  key={`${i}-${j}`}
                  className="note-word"
                >
                  {segment.keyword ? (
                    <span className="inline-grid">
                      <span
                        aria-hidden
                        className="invisible col-start-1 row-start-1 font-extrabold"
                      >
                        {word}
                      </span>
                      <span className="note-kw-live col-start-1 row-start-1">
                        {word}
                      </span>
                    </span>
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
