"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { IMAGES, type ImageKey } from "@/config/images";

/**
 * A photograph slot. Until a file is set in src/config/images.ts it renders a
 * bone-coloured block with a small caption describing the intended shot.
 *
 * Each slot opens once with a slow clip-path as it scrolls into view, with a
 * very gentle parallax (never more than 40px of travel).
 */
export default function ImageSlot({
  slot,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
}: {
  slot: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const config = IMAGES[slot];
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "lux",
            scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
          },
        );
        // 20px up to 20px down: 40px of travel in total.
        gsap.fromTo(
          inner,
          { y: -20 },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, wrap);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`img-reveal relative overflow-hidden bg-bone-deep ${className}`}
    >
      <div ref={innerRef} className="absolute -inset-x-0 -inset-y-6">
        {config.src ? (
          <Image
            src={config.src}
            alt={config.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Image placeholder: ${config.caption}`}
            className="flex h-full w-full items-end bg-bone-deep p-5 sm:p-7"
          >
            <p className="caps max-w-[30ch] text-ink-soft">{config.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
