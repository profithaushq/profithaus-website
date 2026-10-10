import type { Metadata } from "next";
import FullScreenMenu from "@/components/FullScreenMenu";
import Footer from "@/components/FooterSignOff";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "profithaus | E-commerce partner",
  description:
    "profithaus is an e-commerce partner for small and medium brands, run by people who have done the job in-house. Making brands harder to ignore and easier to buy from.",
};

const PRELOAD_GATE = `try{var d=document.documentElement;d.classList.add('ph-js');if(!sessionStorage.getItem('ph-preloader-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('ph-preload')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRELOAD_GATE }} />
        {/* The fonts used above the fold, fetched early */}
        {[
          "InstrumentSerif-Regular",
          "InstrumentSerif-Italic",
          "Jost",
          "DMMono-Regular",
        ].map((name) => (
          <link
            key={name}
            rel="preload"
            href={`/fonts/${name}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider />
        <PageTransition />
        <div className="ph-page relative z-10 flex flex-1 flex-col bg-white">
          <FullScreenMenu />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
