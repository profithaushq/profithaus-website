"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { useRoll } from "@/lib/interactions";
import Mark from "@/components/Mark";
import Logo from "@/components/Logo";
import PH from "@/components/PH";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Test your pH" },
  { href: "/about-us", label: "About" },
  { href: "/faq", label: "FAQ and contact" },
];

// How far the seal's p and H lean apart as each link is hovered: the divide
// opening and closing, like the scale tipping.
const MORPHS = [
  { gap: 0, lift: 1 },
  { gap: 7, lift: 1.12 },
  { gap: -4, lift: 0.94 },
  { gap: 10, lift: 1.2 },
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
      className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-white transition-colors hover:text-powder sm:text-7xl lg:text-8xl"
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
    gsap.to(q(".ph-mark-p"), {
      x: -m.gap,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(q(".ph-mark-h"), {
      x: m.gap,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(q(".ph-mark-divide"), {
      scaleY: m.lift,
      svgOrigin: "50 50",
      duration: 0.8,
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
        className="sticky top-0 z-40 border-b border-line bg-white"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
          <div className="flex items-center justify-start">
            <Link
              id="ph-header-mark"
              href="/"
              aria-label="profithaus home"
              className="block h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => setOpen(false)}
            >
              <Mark className="h-full w-full" />
            </Link>
          </div>

          <Link
            href="/"
            aria-label="profithaus home"
            className="shrink-0 justify-self-center text-center"
            onClick={() => setOpen(false)}
          >
            <Logo className="text-[1.65rem] sm:text-[1.9rem]" />
            <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-oxblood uppercase sm:text-[10px]">
              E-commerce partner
            </p>
          </Link>

          <div className="flex items-center justify-end gap-8">
            <Link
              href="/apply"
              aria-label="Test your pH"
              className="hidden font-mono text-xs tracking-[0.1em] text-burgundy uppercase underline decoration-pink decoration-1 underline-offset-[6px] transition-[text-underline-offset,color] duration-300 hover:text-oxblood hover:underline-offset-[10px] sm:inline-block"
            >
              Test your <PH />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span
                className={`h-px w-6 bg-oxblood transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-oxblood transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden flex-col bg-oxblood text-white"
        style={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-mono text-xs tracking-[0.14em] text-powder uppercase">
            Menu · <PH /> 7.0
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="h-px w-6 translate-y-[3.5px] rotate-45 bg-white" />
            <span className="h-px w-6 -translate-y-[3.5px] -rotate-45 bg-white" />
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
              style={{ ["--mark-disc" as string]: "var(--burgundy)" }}
            >
              <Mark className="h-full w-full" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 py-6 lg:px-16">
          <a
            href="mailto:team@profithaus.co.uk"
            className="font-mono text-xs tracking-[0.1em] text-powder uppercase underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            team@profithaus.co.uk
          </a>
          <div className="flex gap-6 font-mono text-xs tracking-[0.1em] text-powder/60 uppercase">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </>
  );
}
