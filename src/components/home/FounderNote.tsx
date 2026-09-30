"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
  const signatureRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll(".note-word");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(words, { color: "var(--color-brand-black)" });
      if (signatureRef.current) gsap.set(signatureRef.current, { strokeDashoffset: 0 });
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

      const path = signatureRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        ScrollTrigger.create({
          trigger: section,
          start: "bottom 85%",
          once: true,
          onEnter: () =>
            gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }),
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-32 text-brand-black">
      <div className="mx-auto max-w-4xl px-6">
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

        <svg viewBox="0 0 200 50" className="mt-10 h-12 w-48" fill="none" aria-hidden>
          <path
            ref={signatureRef}
            d="M4 40C20 10 30 45 45 25C55 12 60 35 75 30C90 25 95 10 110 20C125 30 135 8 150 15C165 22 175 38 196 18"
            stroke="var(--color-brand-black)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
