"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const IMAGES = [
  { src: "/our-work/axis-01-gut-skin.png", caption: "AxisBiotix, 2024" },
  { src: "/our-work/axis-02-benefit-led.png", caption: "AxisBiotix, 2024" },
  { src: "/our-work/axis-03-definition.png", caption: "AxisBiotix, 2024" },
  { src: "/our-work/axis-04-lifestyle.png", caption: "AxisBiotix, 2024" },
  { src: "/our-work/tso-ad-01.png", caption: "The Studio Online, 2024" },
  { src: "/our-work/tso-ad-02.png", caption: "The Studio Online, 2024" },
  { src: "/our-work/tso-ad-03.png", caption: "The Studio Online, 2024" },
  { src: "/our-work/tso-ad-04.png", caption: "The Studio Online, 2024" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const mainTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        },
      });

      const items = track.querySelectorAll(".gallery-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.86 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: mainTween,
              start: "left 85%",
              end: "center center",
              scrub: true,
            },
          },
        );
      });

      return () => mainTween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cursor="Drag"
      className="relative overflow-hidden bg-white py-24 lg:h-screen lg:py-0"
    >
      <div className="mx-auto max-w-6xl px-6 pb-8 lg:absolute lg:top-16 lg:left-1/2 lg:z-10 lg:-translate-x-1/2 lg:pb-0">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          The work
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex w-max gap-6 overflow-x-auto px-6 snap-x snap-mandatory lg:h-full lg:items-center lg:overflow-visible lg:px-16 lg:snap-none"
      >
        {IMAGES.slice(0, 4).map((image) => (
          <figure
            key={image.src}
            className="gallery-item w-[75vw] shrink-0 snap-center sm:w-[45vw] lg:w-[26vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink/5">
              <Image
                src={image.src}
                alt={image.caption}
                fill
                sizes="(min-width: 1024px) 26vw, 60vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-[family-name:var(--font-manrope)] text-xs uppercase tracking-wide text-brand-grey">
              {image.caption}
            </figcaption>
          </figure>
        ))}

        <div className="gallery-item flex w-[75vw] shrink-0 snap-center items-center rounded-sm bg-brand-black px-8 py-10 text-white sm:w-[45vw] lg:w-[26vw]">
          <blockquote className="font-[family-name:var(--font-manrope)] text-lg leading-snug">
            &ldquo;They took the time to understand our vision and
            transformed it into a modern, user-friendly website that truly
            reflects our brand and mission.&rdquo;
            <footer className="mt-4 text-sm text-white/60">
              Miriam, Director
            </footer>
          </blockquote>
        </div>

        {IMAGES.slice(4).map((image) => (
          <figure
            key={image.src}
            className="gallery-item w-[75vw] shrink-0 snap-center sm:w-[45vw] lg:w-[26vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink/5">
              <Image
                src={image.src}
                alt={image.caption}
                fill
                sizes="(min-width: 1024px) 26vw, 60vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-[family-name:var(--font-manrope)] text-xs uppercase tracking-wide text-brand-grey">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
