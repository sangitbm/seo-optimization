import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SEO Utilities — Free Online SEO Tools",
    template: "%s | SEO Utilities",
  },
  applicationName: "SEO Utilities",
  description:
    "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, robots.txt, and more. No sign-up required.",
  metadataBase: new URL("https://seoopti.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SEO Utilities — Free Online SEO Tools",
    description:
      "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, and more.",
    url: "https://seoopti.vercel.app",
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
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
          <CookieConsent />
        </ThemeProvider>
        {/* Google Consent Mode v2 — defaults (before any cookie loads) */}
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 2000
            });
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VFWZTJQKC5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VFWZTJQKC5');
          `}
        </Script>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://seoopti.vercel.app/#website",
                  "url": "https://seoopti.vercel.app",
                  "name": "SEO Utilities",
                  "description": "Free online SEO tools for developers and marketers.",
                  "publisher": {
                    "@id": "https://seoopti.vercel.app/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://seoopti.vercel.app/#organization",
                  "name": "SEO Utilities",
                  "url": "https://seoopti.vercel.app",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://seoopti.vercel.app/favicon.ico"
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
