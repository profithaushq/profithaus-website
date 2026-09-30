"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

const FRAME_DURATION = 6000;

export default function CinematicHero({
  images,
  children,
  className = "",
}: {
  images: { src: string; alt: string }[];
  children: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, FRAME_DURATION);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section
      className={`relative flex min-h-[85vh] items-center overflow-hidden bg-ink text-white ${className}`}
    >
      {images.map((image, i) => (
        <div
          key={image.src}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === active ? "animate-ken-burns" : ""}`}
          />
        </div>
      ))}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"
      />

      <div className="relative z-10 w-full">{children}</div>

      {images.length > 1 && (
        <div className="absolute bottom-8 right-8 z-10 font-[family-name:var(--font-mono-accent)] text-xs tracking-[0.2em] text-white/70">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      )}
    </section>
  );
}
