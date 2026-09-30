"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply to work with us" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-work", label: "Our Work & Testimonials" },
  { href: "/faq", label: "FAQ's & Contact Us" },
];

const CLOSING_LINE = "Run it like you own it.";

export default function FooterSignOff() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll(".signoff-word");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(words, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.06,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative z-0 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold tracking-tight sm:text-6xl">
          {CLOSING_LINE.split(" ").map((word, i) => (
            <span key={i} className="signoff-word mr-3 inline-block">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-16 flex flex-col gap-10 border-t border-white/10 pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="mailto:team@profithaus.co.uk"
              className="font-[family-name:var(--font-manrope)] text-lg underline decoration-white/30 underline-offset-4 hover:text-white/80"
            >
              team@profithaus.co.uk
            </a>
            <div className="mt-4 flex gap-6 font-[family-name:var(--font-manrope)] text-sm text-white/50">
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 sm:items-end">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-manrope)] text-sm text-white/70 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 font-[family-name:var(--font-manrope)] text-xs text-white/40">
          © {new Date().getFullYear()} profithaus.
        </p>
      </div>
    </footer>
  );
}
