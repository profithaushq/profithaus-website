import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, CONTACT_EMAIL } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-6 py-14 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 text-center">
        <Link href="/" aria-label={`${BRAND_NAME} home`}>
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={200}
            height={50}
            className="h-7 w-auto"
          />
        </Link>

        <nav
          aria-label="Footer"
          className="caps flex flex-wrap justify-center gap-x-9 gap-y-3"
        >
          <Link
            href="/#approach"
            className="transition-colors hover:text-brand-red"
          >
            Approach
          </Link>
          <Link
            href="/#about"
            className="transition-colors hover:text-brand-red"
          >
            About
          </Link>
          <Link
            href="/apply"
            className="transition-colors hover:text-brand-red"
          >
            Apply
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-brand-red"
          >
            Contact
          </a>
        </nav>

        <p className="text-xs tracking-[0.08em] text-brand-grey">
          &copy; {new Date().getFullYear()} {BRAND_NAME}
        </p>
      </div>
    </footer>
  );
}
