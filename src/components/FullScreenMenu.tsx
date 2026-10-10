"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { useRoll } from "@/lib/interactions";
import Mark from "@/components/Mark";
import Logo from "@/components/Logo";
import PH from "@/components/PH";

// Same links as the concept's site header; the last one is the call to action
const BAR_LINKS = [
  { href: "/#elements", label: "The elements" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#elements", label: "The elements" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/apply", label: "Work with us" },
  { href: "/faq", label: "FAQ and contact" },
];

// How far the seal's p and H lean apart as each link is hovered: the divide
// opening and closing, like the scale tipping.
const MORPHS = [
  { gap: 0, lift: 1 },
  { gap: 7, lift: 1.12 },
  { gap: -4, lift: 0.94 },
  { gap: 10, lift: 1.2 },
  { gap: 3, lift: 1.05 },
  { gap: -7, lift: 0.9 },
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
      className="font-serif text-4xl leading-[1.04] tracking-[-0.02em] text-white transition-colors hover:text-powder sm:text-6xl lg:text-7xl"
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
    const overlay = overlayRef.current;
    if (!overlay) return;

    // A stale open/close tween must never finish after a newer one starts
    gsap.killTweensOf(overlay);

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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
          <Link
            href="/"
            aria-label="profithaus home"
            onClick={() => setOpen(false)}
          >
            <Logo className="text-[1.9rem] sm:text-[2.1rem]" />
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 font-sans font-medium text-xs tracking-[0.08em] md:flex"
          >
            {BAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-oxblood"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-pink transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              href="/apply"
              className="group relative py-1 text-burgundy transition-colors duration-300 hover:text-oxblood"
            >
              Work with us
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-pink transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
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
          <span className="font-sans font-medium text-xs tracking-[0.14em] text-powder uppercase">
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
            className="font-sans font-medium text-xs tracking-[0.1em] text-powder uppercase underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            team@profithaus.co.uk
          </a>
          <div className="flex gap-6 font-sans font-medium text-xs tracking-[0.1em] text-powder/60 uppercase">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </>
  );
}
