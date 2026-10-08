import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/config/site";
import Button from "@/components/Button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3.5 sm:px-10">
        <Link href="/" aria-label={`${BRAND_NAME} home`} className="shrink-0">
          <Image
            src="/logo.png"
            alt={BRAND_NAME}
            width={200}
            height={50}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-6 sm:gap-9">
          <Link
            href="/#approach"
            className="hidden text-sm font-medium transition-colors hover:text-brand-red sm:inline"
          >
            Approach
          </Link>
          <Link
            href="/#about"
            className="hidden text-sm font-medium transition-colors hover:text-brand-red sm:inline"
          >
            About
          </Link>
          <Button href="/apply">Apply</Button>
        </nav>
      </div>
    </header>
  );
}
