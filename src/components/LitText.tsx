"use client";

import {
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, SplitText } from "@/lib/gsap";

/**
 * Text whose words light up as you scroll through it. Plain, fully readable
 * text when motion is reduced or JS is off.
 */
export default function LitText({
  children,
  as: Tag = "p",
  className = "",
  dim = 0.2,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  dim?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(el, { type: "words" });
      const ctx = gsap.context(() => {
        gsap.set(split.words, { opacity: dim });
        gsap.to(split.words, {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }, el);
      return () => {
        ctx.revert();
        split.revert();
      };
    });

    return () => mm.revert();
  }, [dim]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
