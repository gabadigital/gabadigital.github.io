import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Overpass_Mono, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@/components/analytics/analytics";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Used by the scroll-reveal intro and CTA sections, styled after mindraft.framer.ai.
const intro = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-intro",
  display: "swap",
});

const introMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-intro-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${intro.variable} ${introMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
