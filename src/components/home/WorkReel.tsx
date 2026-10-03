"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { ReelItem } from "@/data/reel";

function ReelInner({ items }: { items: ReelItem[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Layout effect so cleanup reverts pin-spacers before React removes the nodes.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const videos = Array.from(
      stage.querySelectorAll<HTMLVideoElement>("video"),
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.55 },
    );
    videos.forEach((video) => io.observe(video));

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const skewTo = gsap.quickTo(track, "skewX", {
          duration: 0.4,
          ease: "power3",
        });

        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            refreshPriority: 3,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() / -300));
            },
            onLeave: () => skewTo(0),
            onLeaveBack: () => skewTo(0),
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      },
    );

    return () => {
      io.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
      aria-label="Work"
      className="bg-brand-black text-white"
      data-cursor="Drag"
    >
      <div
        ref={stageRef}
        className="relative flex flex-col justify-center overflow-hidden py-20 lg:h-svh lg:py-0"
      >
        <p className="px-6 pb-8 font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-white/50 sm:px-10 lg:absolute lg:top-24 lg:left-10 lg:pb-0">
          Work
        </p>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:w-max lg:snap-none lg:gap-10 lg:overflow-visible lg:px-10"
        >
          {items.map((item) => (
            <figure
              key={item.video}
              className="w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[52vw]"
            >
              <div className="overflow-hidden border border-white/15 bg-black">
                <div className="flex items-center gap-2 border-b border-white/15 px-4 py-3">
                  <span className="h-2 w-2 bg-white/25" />
                  <span className="h-2 w-2 bg-white/25" />
                  <span className="h-2 w-2 bg-white/25" />
                </div>
                <video
                  className="block aspect-[16/10] w-full object-cover"
                  src={item.video}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 font-[family-name:var(--font-manrope)]">
                <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {item.brand}
                </span>
                <span className="text-sm text-white/60">{item.did}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkReel({ items }: { items: ReelItem[] }) {
  if (items.length === 0) return null;
  return <ReelInner items={items} />;
}

