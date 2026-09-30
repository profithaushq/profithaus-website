"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    words: ["ECOMMERCE", "TRADING"],
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
    image: "/our-work/axis-01-gut-skin.png",
  },
  {
    words: ["WEBSITE", "BUILDS"],
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
    image: "/our-work/tso-ad-01.png",
  },
  {
    words: ["BUSINESS", "MANAGEMENT"],
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability.",
    image: "/our-work/axis-03-definition.png",
  },
];

export default function SplitServiceRows() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".service-row");
      rows.forEach((row) => {
        const left = row.querySelector(".word-left");
        const right = row.querySelector(".word-right");
        if (!left || !right) return;

        if (reduceMotion) {
          gsap.set([left, right], { x: 0, opacity: 1 });
          return;
        }

        gsap.set(left, { x: -60, opacity: 0 });
        gsap.set(right, { x: 60, opacity: 0 });
        ScrollTrigger.create({
          trigger: row,
          start: "top 75%",
          once: true,
          onEnter: () =>
            gsap.to([left, right], {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            }),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const float = floatRef.current;
    if (!float) return;
    gsap.to(float, { x: e.clientX + 24, y: e.clientY + 24, duration: 0.4, ease: "power3" });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative bg-white py-24 text-brand-black"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          What we do
        </p>

        <div className="mt-10 flex flex-col divide-y divide-brand-black/10">
          {SERVICES.map((service) => (
            <div
              key={service.words.join("-")}
              className="service-row group py-10"
              onMouseEnter={() => setActiveImage(service.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <h3 className="flex flex-wrap items-baseline gap-x-4 font-[family-name:var(--font-manrope)] text-4xl font-extrabold tracking-tight sm:text-6xl">
                <span className="word-left">{service.words[0]} /</span>
                <span className="word-right text-brand-grey transition-colors group-hover:text-brand-red">
                  {service.words[1]}
                </span>
              </h3>
              <p className="mt-4 max-w-xl text-brand-grey">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={floatRef}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-40 w-32 overflow-hidden rounded-sm opacity-0 transition-opacity duration-300 lg:block"
        style={{ opacity: activeImage ? 1 : 0 }}
      >
        {activeImage && (
          <Image src={activeImage} alt="" fill sizes="128px" className="object-cover" />
        )}
      </div>
    </section>
  );
}
