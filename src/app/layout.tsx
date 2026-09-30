import type { Metadata } from "next";
import { Inter, Poppins, Manrope } from "next/font/google";
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

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${heading.variable} ${mono.variable} ${manrope.variable} h-full antialiased`}
    >
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
