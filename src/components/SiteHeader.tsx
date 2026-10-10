"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/Wordmark";

const NAV = [
  { href: "/#approach", label: "Approach" },
  { href: "/#about", label: "About" },
  { href: "/apply", label: "Apply" },
];

/**
 * A thin top bar. Over the homepage hero it is transparent; once you scroll
 * (and on every other page) it sits on white with a hairline.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const solid = pathname !== "/" || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-700 ease-out ${
        solid
          ? "border-b border-hairline bg-white"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-14">
        <Link href="/" aria-label="Profithaus home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="caps transition-colors duration-300 hover:text-brand-red max-sm:text-[0.625rem] max-sm:tracking-[0.08em]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
