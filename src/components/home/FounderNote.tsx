"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

const NOTE_SEGMENTS: { text: string; keyword?: boolean }[] = [
  { text: "We started profithaus because we were tired of watching " },
  { text: "good brands", keyword: true },
  { text: " get let down by agencies who'd never actually run one. We've been " },
  { text: "in-house", keyword: true },
  { text: ", made the calls, and lived with the results. That's the only way we work now: " },
  { text: "senior, hands-on", keyword: true },
  { text: ", and invested in your numbers like they're " },
  { text: "our own", keyword: true },
  { text: "." },
];

export default function FounderNote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll(".note-word");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(words, { color: "var(--color-brand-black)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      }).to(words, { color: "var(--color-brand-black)", stagger: 1, ease: "none" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-32 text-brand-black">
      <AmbientLines />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          A note from the founders
        </p>

        <p className="mt-8 font-[family-name:var(--font-manrope)] text-2xl leading-snug font-medium sm:text-4xl">
          {NOTE_SEGMENTS.map((segment, i) =>
            segment.text.split(" ").map((word, j) => (
              <span
                key={`${i}-${j}`}
                className={`note-word ${segment.keyword ? "font-extrabold" : ""}`}
                style={{ color: "var(--color-brand-grey)" }}
              >
                {word}{" "}
              </span>
            )),
          )}
        </p>
      </div>
    </section>
  );
}
