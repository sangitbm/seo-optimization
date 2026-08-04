import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEO Utilities — Free Online SEO Tools",
    template: "%s | SEO Utilities",
  },
  description:
    "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, robots.txt, and more. No sign-up required.",
  metadataBase: new URL("https://seo-utilities.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SEO Utilities — Free Online SEO Tools",
    description:
      "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, and more.",
    url: "https://seo-utilities.com",
    siteName: "SEO Utilities",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Utilities — Free Online SEO Tools",
    description:
      "Free online SEO tools for developers and marketers. No sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-4705897632786514",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        {/* AdSense — must be outside <head> to avoid the data-nscript conflict */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4705897632786514"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
