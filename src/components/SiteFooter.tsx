import { BRAND_NAME, CONTACT_EMAIL } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-brand-grey sm:px-10">
        <p>
          &copy; {new Date().getFullYear()} {BRAND_NAME}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="transition-colors hover:text-brand-red"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
