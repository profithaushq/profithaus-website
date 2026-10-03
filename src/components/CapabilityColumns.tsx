"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Group = { category: string; items: string[] };

/**
 * What we cover, on black. Each column and its lines climb into place as the
 * section arrives.
 */
export default function CapabilityColumns({ groups }: { groups: Group[] }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>(".ph-cap-col").forEach((col) => {
          const lines = col.querySelectorAll(".ph-cap-line");
          gsap.from(col.querySelector(".ph-cap-title"), {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: col, start: "top 82%", once: true },
          });
          gsap.from(lines, {
            y: 26,
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: col, start: "top 78%", once: true },
          });
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-white py-24 text-brand-black sm:py-32"
      aria-label="What we cover"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-grey">
          What we cover
        </p>
        <div className="mt-12 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {groups.map((group) => (
            <div key={group.category} className="ph-cap-col">
              <h3 className="ph-cap-title font-[family-name:var(--font-manrope)] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1] font-extrabold tracking-tight text-brand-red">
                {group.category}
              </h3>
              <ul className="mt-8 divide-y divide-brand-black/10 border-t border-brand-black/10">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="ph-cap-line py-3 text-base text-brand-grey"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
