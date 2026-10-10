"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const LINE =
  "The finished website looks fantastic, functions seamlessly, and has received great feedback from our team and customers alike.";

const FULL_REVIEW =
  "We had the pleasure of working with profithaus. on the redesign of our Oceans Alive website, and we couldn't be happier with the result. From start to finish, they were professional, responsive, and incredibly easy to work with. They took the time to understand our vision and transformed it into a modern, user-friendly website that truly reflects our brand and mission. Their attention to detail, creativity, and technical expertise were evident throughout the entire project. The finished website looks fantastic, functions seamlessly, and has received great feedback from our team and customers alike. Heidi kept us informed at every stage, delivered on time, and went above and beyond to ensure everything was exactly as we wanted. We'd highly recommend them to anyone looking for a talented and reliable web designer.";

export default function TestimonialLine() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = Array.from(
      section.querySelectorAll<HTMLElement>(".tl-word"),
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
          start: "top 65%",
          end: "bottom 70%",
          scrub: true,
        },
      });
      words.forEach((word, i) => {
        tl.to(word, { opacity: 1, duration: 1, ease: "none" }, i);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-burgundy py-28 text-white sm:py-44"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs tracking-[0.12em] text-powder uppercase">
          What clients say
        </p>

        <blockquote className="mt-8 font-serif text-[clamp(2.3rem,6vw,6.25rem)] leading-[1.02] tracking-[-0.02em]">
          <span aria-hidden>&ldquo;</span>
          {LINE.split(" ").map((word, i) => (
            <span key={i} className="tl-word">
              {word}{" "}
            </span>
          ))}
          <span aria-hidden>&rdquo;</span>
        </blockquote>

        <p className="mt-10 font-mono text-xs tracking-[0.12em] text-powder uppercase">
          Miriam, Director at Oceans Alive
        </p>

        <details className="group mt-10 max-w-3xl">
          <summary className="inline-flex cursor-pointer list-none items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase underline decoration-white underline-offset-[7px] [&::-webkit-details-marker]:hidden">
            Read the full review
            <span
              aria-hidden
              className="no-underline transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
            &ldquo;{FULL_REVIEW}&rdquo;
          </p>
        </details>
      </div>
    </section>
  );
}
