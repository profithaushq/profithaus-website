import Link from "next/link";
import Logo from "@/components/Logo";
import PH from "@/components/PH";

const LINKS = [
  { href: "/#elements", label: "The elements" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/faq", label: "FAQ and contact" },
  { href: "/apply", label: "Work with us" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-white px-6 py-20 text-oxblood sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" aria-label="profithaus home">
            <Logo className="text-[2.4rem]" />
          </Link>
          <p className="mt-3 font-sans font-medium text-[11px] tracking-[0.14em] uppercase">
            <PH /> 7.0 · E-commerce strategic partner
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-7 gap-y-0 font-sans font-medium text-xs tracking-[0.08em]"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="py-3 transition-colors duration-300 hover:text-burgundy"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="font-sans font-medium text-[11px] tracking-[0.1em] text-ink-soft uppercase">
            <a
              href="mailto:team@profithaus.co.uk"
              className="inline-block py-2 hover:text-burgundy"
            >
              team@profithaus.co.uk
            </a>{" "}
            · © {new Date().getFullYear()} profithaus
          </p>
        </div>
      </div>
    </footer>
  );
}
