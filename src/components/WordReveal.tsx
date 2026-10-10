"use client";

import { useEffect, useRef, useState } from "react";

export type Segment = { text: string; em?: boolean };

/**
 * A statement whose words settle into place, once, as the block comes into
 * view. Segments marked em are the italic (haus) words, in burgundy.
 */
export default function WordReveal({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  let i = 0;
  return (
    <p ref={ref} className={`word-reveal ${seen ? "is-in" : ""} ${className}`}>
      {segments.map((seg, s) =>
        seg.text
          .split(" ")
          .filter(Boolean)
          .map((word) => {
            const n = i++;
            const inner = (
              <span style={{ ["--i" as string]: n } as React.CSSProperties}>
                {word}
              </span>
            );
            return (
              <span key={`${s}-${n}`} className="word-reveal-w">
                {seg.em ? (
                  <em className="text-burgundy">{inner}</em>
                ) : (
                  inner
                )}{" "}
              </span>
            );
          }),
      )}
    </p>
  );
}
