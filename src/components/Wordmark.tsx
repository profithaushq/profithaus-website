import { BRAND_NAME, FOUNDER_FULL_NAME } from "@/config/site";

/**
 * The typed wordmark. The full stop is the one place red appears in the
 * identity itself.
 */
export default function Wordmark({ byline = true }: { byline?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className="text-[1.5rem] font-extrabold sm:text-[1.7rem] tracking-[-0.06em] text-brand-black">
        {BRAND_NAME.toLowerCase()}
        <span className="text-brand-red">.</span>
      </span>
      {byline && (
        <span className="mt-1.5 text-[0.5625rem] font-medium tracking-[0.18em] text-brand-black uppercase">
          by {FOUNDER_FULL_NAME}
        </span>
      )}
    </span>
  );
}
