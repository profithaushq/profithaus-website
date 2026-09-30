"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

const NAV_LINKS = [
  { href: "/", label: "Home", image: "/hero/frame-01.jpg" },
  { href: "/apply", label: "Apply to work with us", image: "/hero/frame-02.webp" },
  { href: "/about-us", label: "About Us", image: "/hero/frame-01.jpg" },
  { href: "/our-work", label: "Our Work & Testimonials", image: "/hero/frame-02.webp" },
  { href: "/faq", label: "FAQ's & Contact Us", image: "/hero/frame-01.jpg" },
];

export default function FullScreenMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(NAV_LINKS[0].image);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function handleScroll() {
      const header = headerRef.current;
      if (!header || open) return;
      const y = window.scrollY;
      const goingDown = y > lastY.current && y > 80;
      gsap.to(header, {
        yPercent: goingDown ? -100 : 0,
        duration: 0.4,
        ease: "power3.out",
      });
      lastY.current = y;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(
        linkRefs.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.15, ease: "power3.out" },
      );
      linkRefs.current[0]?.focus();
    } else {
      getLenis()?.start();
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const focusable = linkRefs.current.filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-brand-black/10 bg-white"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="profithaus."
              width={200}
              height={50}
              priority
              className="h-7 w-auto sm:h-8"
            />
            <p className="mt-1 font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.15em] text-brand-grey">
              Ecommerce partner for luxury brands
            </p>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/apply"
              className="hidden font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-brand-black underline decoration-brand-red decoration-2 underline-offset-4 sm:inline-block"
            >
              Book a call
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span
                className={`h-0.5 w-6 bg-brand-black transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-6 bg-brand-black transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden flex-col bg-brand-black text-white"
        style={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-white/60">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="h-0.5 w-6 translate-y-1 rotate-45 bg-white" />
            <span className="h-0.5 w-6 -translate-y-1 -rotate-45 bg-white" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto px-6 pb-8 lg:grid-cols-2 lg:items-center lg:px-16">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHovered(link.image)}
                className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold tracking-tight text-white/90 transition-colors hover:text-brand-red sm:text-6xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
            {Array.from(new Set(NAV_LINKS.map((link) => link.image))).map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                fill
                sizes="40vw"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: hovered === image ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 lg:px-16">
          <a
            href="mailto:team@profithaus.co.uk"
            className="font-[family-name:var(--font-manrope)] text-sm text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            team@profithaus.co.uk
          </a>
          <div className="flex gap-6 font-[family-name:var(--font-manrope)] text-sm text-white/50">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </>
  );
}
