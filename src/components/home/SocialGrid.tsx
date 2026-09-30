"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const IMAGES = [
  { src: "/hero/frame-01.jpg", speed: 0.15, offset: "mt-0" },
  { src: "/our-work/axis-02-benefit-led.png", speed: -0.1, offset: "mt-12" },
  { src: "/hero/frame-02.webp", speed: 0.2, offset: "mt-4" },
  { src: "/our-work/tso-ad-03.png", speed: -0.15, offset: "mt-16" },
  { src: "/our-work/axis-04-lifestyle.png", speed: 0.1, offset: "mt-2" },
  { src: "/our-work/tso-ad-04.png", speed: -0.2, offset: "mt-10" },
];

export default function SocialGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>(".social-item");
      items.forEach((item) => {
        const speed = Number(item.dataset.speed);
        gsap.to(item, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white py-24 text-brand-black"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between">
          <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Social
          </p>
          <span className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-brand-black underline decoration-brand-red decoration-2 underline-offset-4">
            Follow along
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {IMAGES.map((image) => (
            <div
              key={image.src}
              data-speed={image.speed}
              className={`social-item relative aspect-square overflow-hidden rounded-sm bg-ink/5 ${image.offset}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 640px) 30vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
