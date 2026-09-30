import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import FullScreenMenu from "@/components/FullScreenMenu";
import Footer from "@/components/FooterSignOff";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const heading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const mono = Poppins({
  variable: "--font-mono-accent",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "profithaus. | Ecommerce Partner for Luxury Brands",
  description:
    "profithaus. is an ecommerce partner for luxury brands, making brands harder to ignore and easier to buy from.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout applies site-wide, not per-page */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider />
        <CustomCursor />
        <FullScreenMenu />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
