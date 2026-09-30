"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = section.querySelectorAll(".testimonial-item");

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 32 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 text-brand-black">
      <AmbientLines />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="testimonial-item font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          What clients say
        </p>

        <blockquote className="testimonial-item mt-8 font-[family-name:var(--font-manrope)] text-lg leading-relaxed font-medium sm:text-xl">
          &ldquo;We had the pleasure of working with profithaus. on the
          redesign of our Oceans Alive website, and we couldn&apos;t be
          happier with the result. From start to finish, they were
          professional, responsive, and incredibly easy to work with. They
          took the time to understand our vision and transformed it into a
          modern, user-friendly website that truly reflects our brand and
          mission. Their attention to detail, creativity, and technical
          expertise were evident throughout the entire project. The finished
          website looks fantastic, functions seamlessly, and has received
          great feedback from our team and customers alike. Heidi kept us
          informed at every stage, delivered on time, and went above and
          beyond to ensure everything was exactly as we wanted. We&apos;d
          highly recommend them to anyone looking for a talented and reliable
          web designer.&rdquo;
        </blockquote>

        <p className="testimonial-item mt-6 text-sm text-brand-grey">
          Miriam, Director at Oceans Alive
        </p>
      </div>
    </section>
  );
}
