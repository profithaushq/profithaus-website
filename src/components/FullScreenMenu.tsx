"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { useRoll } from "@/lib/interactions";
import Mark from "@/components/Mark";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply to work with us" },
  { href: "/about-us", label: "About Us" },
  { href: "/faq", label: "FAQ's & Contact Us" },
];

const MORPHS = [
  { r: 124, dx: 0, dy: 0, rot: 0 },
  { r: 146, dx: 22, dy: -6, rot: -8 },
  { r: 104, dx: -16, dy: 8, rot: 7 },
  { r: 136, dx: 30, dy: 4, rot: -12 },
];

function MenuLink({
  href,
  label,
  index,
  setRef,
  onHover,
  onClose,
}: {
  href: string;
  label: string;
  index: number;
  setRef: (index: number, el: HTMLAnchorElement | null) => void;
  onHover: (index: number) => void;
  onClose: () => void;
}) {
  const local = useRef<HTMLAnchorElement | null>(null);
  useRoll(local, label);

  return (
    <Link
      href={href}
      aria-label={label}
      ref={(el) => {
        local.current = el;
        setRef(index, el);
      }}
      onClick={onClose}
      onPointerEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      className="font-[family-name:var(--font-manrope)] text-4xl font-extrabold tracking-tight text-white/90 transition-colors hover:text-brand-red sm:text-6xl lg:text-7xl"
    >
      {label}
    </Link>
  );
}

export default function FullScreenMenu() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function setHeight() {
      if (!header) return;
      document.documentElement.style.setProperty(
        "--ph-header-h",
        `${header.offsetHeight}px`,
      );
    }

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    function handleScroll() {
      const header = headerRef.current;
      if (!header || open) return;
      const y = window.scrollY;
      const hasHero = !!document.querySelector("[data-ph-hero]");
      const hideAfter = hasHero ? window.innerHeight * 1.5 : 80;
      const goingDown = y > lastY.current && y > hideAfter;
      lastY.current = y;
      if (goingDown === hiddenRef.current) return;
      hiddenRef.current = goingDown;
      gsap.to(header, {
        yPercent: goingDown ? -100 : 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
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
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          delay: 0.15,
          ease: "power3.out",
        },
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

  function morphMark(index: number) {
    const mark = markRef.current;
    if (!mark) return;
    const m = MORPHS[index] ?? MORPHS[0];
    const q = gsap.utils.selector(mark);
    gsap.to(q(".ph-mark-bowl"), {
      attr: { r: m.r },
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(q(".ph-mark-dot"), {
      attr: { cx: 447 + m.dx, cy: 568 + m.dy },
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(mark, {
      rotate: m.rot,
      duration: 0.9,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function setLinkRef(index: number, el: HTMLAnchorElement | null) {
    linkRefs.current[index] = el;
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-brand-black/10 bg-white"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-5">
          <div className="flex items-center justify-start">
            <Link
              id="ph-header-mark"
              href="/"
              aria-label="profithaus. home"
              className="block h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setOpen(false)}
            >
              <Mark className="h-full w-full" />
            </Link>
          </div>

          <Link
            href="/"
            className="shrink-0 justify-self-center text-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="profithaus."
              width={200}
              height={50}
              priority
              className="mx-auto h-7 w-auto sm:h-8"
            />
            <p className="mt-1 font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.15em] text-brand-grey">
              Ecommerce partner for luxury brands
            </p>
          </Link>

          <div className="flex items-center justify-end gap-8">
            <Link
              href="/apply"
              aria-label="Book a call"
              className="hidden font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-brand-black underline decoration-brand-red decoration-2 underline-offset-4 transition-[text-underline-offset] duration-300 hover:underline-offset-8 sm:inline-block"
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

        <div className="grid flex-1 grid-cols-1 items-center gap-8 overflow-y-auto px-6 pb-8 lg:grid-cols-2 lg:px-16">
          <nav
            className="flex flex-col gap-2"
            onPointerLeave={() => morphMark(0)}
          >
            {NAV_LINKS.map((link, i) => (
              <MenuLink
                key={link.href}
                href={link.href}
                label={link.label}
                index={i}
                setRef={setLinkRef}
                onHover={morphMark}
                onClose={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className="flex items-center justify-center">
            <div
              ref={markRef}
              className="h-[min(26vh,55vw)] w-[min(26vh,55vw)] lg:h-[min(52vh,34vw)] lg:w-[min(52vh,34vw)]"
            >
              <Mark className="h-full w-full" />
            </div>
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
