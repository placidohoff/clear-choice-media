import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { readSiteContent } from "@/lib/site-content";
import NavHeader from "@/app/components/NavHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clear Choice Media | Event Photography & Photo Booth Experiences",
  description:
    "Premium event photography, video production, and photo booth experiences for weddings, corporate events, and celebrations across Rhode Island and Southern New England.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await readSiteContent();
  const navItems = content.nav;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavHeader navItems={navItems} primaryCta={content.hero?.primaryCta} />

        <div role="main" className="pt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
