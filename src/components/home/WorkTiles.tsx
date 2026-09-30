"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CASE_STUDIES = [
  {
    slug: "axisbiotix",
    name: "AxisBiotix",
    meta: "Paid social creative",
    primary: "/our-work/axis-01-gut-skin.png",
    hover: "/our-work/axis-02-benefit-led.png",
  },
  {
    slug: "the-studio-online",
    name: "The Studio Online",
    meta: "Branding, build & paid social",
    primary: "/our-work/tso-ad-01.png",
    hover: "/our-work/tso-ad-02.png",
  },
];

function Tile({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(tile, { clipPath: "inset(0 0 0% 0)" });
      return;
    }

    gsap.set(tile, { clipPath: "inset(0 0 100% 0)" });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: tile,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(tile, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "expo.inOut",
          }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={tileRef}
      href="/our-work"
      data-cursor="View"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (window.matchMedia("(pointer: coarse)").matches && !tapped) {
          e.preventDefault();
          setTapped(true);
        }
      }}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-ink/5"
    >
      <Image
        src={study.primary}
        alt={study.name}
        fill
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="object-cover transition-opacity duration-500"
        style={{ opacity: hovered || tapped ? 0 : 1 }}
      />
      <Image
        src={study.hover}
        alt=""
        fill
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="object-cover transition-opacity duration-500"
        style={{ opacity: hovered || tapped ? 1 : 0 }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <p className="font-[family-name:var(--font-manrope)] text-xl font-extrabold text-white">
          {study.name}
        </p>
        <p className="mt-1 font-[family-name:var(--font-manrope)] text-sm text-white/70">
          {study.meta}
        </p>
      </div>
    </Link>
  );
}

export default function WorkTiles() {
  return (
    <section className="bg-white py-24 text-brand-black">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Work
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <Tile key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
