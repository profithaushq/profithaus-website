import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply to work with us" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-work", label: "Our Work & Testimonials" },
  { href: "/faq", label: "FAQ's & Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-maroon text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-[family-name:var(--font-heading)] text-xl font-bold">
          profithaus. Ecommerce Partner
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} profithaus.</p>
          <Link href="/faq" className="hover:text-white/80">
            Contact us
          </Link>
        </div>
      </div>
    </footer>
  );
}
