import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/config/site";
import Button from "@/components/Button";

const NAV = [
  { href: "/#approach", label: "Approach" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 sm:px-10">
        <nav aria-label="Main" className="hidden items-center gap-9 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="caps transition-colors hover:text-brand-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="sm:hidden" />

        <Link
          href="/"
          aria-label={`${BRAND_NAME} home`}
          className="justify-self-center"
        >
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={200}
            height={50}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <div className="justify-self-end">
          <Button href="/apply">Apply</Button>
        </div>
      </div>
    </header>
  );
}
