import Link from "next/link";
import { BRAND_NAME, CONTACT_EMAIL, LINKEDIN_URL } from "@/config/site";
import Wordmark from "@/components/Wordmark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-6 py-14 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Link href="/" aria-label={`${BRAND_NAME} home`}>
          <Wordmark byline={false} />
        </Link>

        <div className="caps flex flex-wrap items-center gap-x-9 gap-y-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors duration-300 hover:text-brand-red"
          >
            {CONTACT_EMAIL}
          </a>
          {LINKEDIN_URL && (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-brand-red"
            >
              LinkedIn
            </a>
          )}
          <span className="text-ink-soft">
            &copy; {BRAND_NAME} {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
