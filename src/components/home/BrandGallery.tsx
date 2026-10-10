import Image from "next/image";

const SHOTS = [
  {
    src: "/images/brand/wax.jpg",
    label: "Wax seal",
    alt: "The pH seal pressed into silver wax",
  },
  {
    src: "/images/brand/tote.jpg",
    label: "Leather",
    alt: "A leather tote debossed with the pH seal",
  },
  {
    src: "/images/brand/glass.jpg",
    label: "Glass",
    alt: "The pH seal on a glass of water",
  },
  {
    src: "/images/brand/plaster.jpg",
    label: "Plaster",
    alt: "The profit|haus wordmark pressed into plaster",
  },
  {
    src: "/images/brand/seals.jpg",
    label: "Seals",
    alt: "Embossed pH seals on a roll of tape",
  },
  {
    src: "/images/brand/patch.jpg",
    label: "Patch",
    alt: "The pH seal as an embroidered patch",
  },
];

/**
 * The seal out in the world. A grid on phones; on desktop a row of panels
 * where the one you point at opens up.
 */
export default function BrandGallery() {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:h-[34rem]">
      {SHOTS.map((shot, i) => (
        <li
          key={shot.src}
          tabIndex={0}
          className="group relative aspect-[3/4] overflow-hidden bg-oxblood outline-offset-2 lg:aspect-auto lg:flex-1 lg:transition-[flex] lg:duration-700 lg:ease-[cubic-bezier(.2,.7,.1,1)] lg:hover:flex-[3.2] lg:focus-visible:flex-[3.2]"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 36vw, 50vw"
            className="object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
            priority={i === 0}
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-oxblood/80 to-transparent p-4 pt-10 font-sans text-[11px] font-medium tracking-[0.18em] text-white uppercase">
            {shot.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
