import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "7 Days Results Bootcamp with Coach Jerryminds — Launch Your First Affiliate Funnel in 7 Days",
  description:
    "A free 7-day bootcamp that hands beginners the exact daily system to build a working affiliate funnel, pick winning offers, and drive their first online commissions — no tech skills or audience required.",
  keywords: [
    "affiliate marketing",
    "make money online",
    "side hustle",
    "digital business",
    "affiliate funnel",
    "beginner affiliate marketing",
  ],
  openGraph: {
    title: "7 Days Results Bootcamp",
    description:
      "Launch your first working affiliate funnel in 7 days — even if you've never made a dollar online.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
