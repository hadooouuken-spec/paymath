import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free hourly-to-salary, salary-to-hourly, overtime, and hours-to-earn calculators. Instant answers in your browser.",
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "XwnE3ZVW1jbWH593QG5A-RfyKLoO2lDKUrhOnj94zso",
  },
  other: {
    "google-adsense-account": "ca-pub-3262168417299323",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen font-sans">
        {adsense ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
              adsense,
            )}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
