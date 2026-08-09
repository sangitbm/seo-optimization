import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdProvider } from "@/components/providers/ad-provider";
import { CookieConsent } from "@/components/cookie-consent";
import "../globals.css";
import { i18n } from "../../i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  
  const languages = i18n.locales.reduce((acc, locale) => {
    acc[locale] = `/${locale}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: {
      default: "SEO Utilities — Free Online SEO Tools",
      template: "%s | SEO Utilities",
    },
    description:
      "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, robots.txt, and more. No sign-up required.",
    metadataBase: new URL("https://seo-utilities.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: languages,
    },
    openGraph: {
      title: "SEO Utilities — Free Online SEO Tools",
      description:
        "Free online SEO tools for developers and marketers. Generate meta tags, schema markup, sitemaps, and more.",
      url: `https://seo-utilities.com/${lang}`,
      siteName: "SEO Utilities",
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
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
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <AdProvider>
            <Header dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer dict={dict} lang={lang} />
            <Toaster richColors position="bottom-right" />
            <CookieConsent />
          </AdProvider>
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
        {/* AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4705897632786514"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
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
                  "@id": "https://seo-utilities.com/#website",
                  "url": "https://seo-utilities.com",
                  "name": "SEO Utilities",
                  "description": "Free online SEO tools for developers and marketers.",
                  "publisher": {
                    "@id": "https://seo-utilities.com/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://seo-utilities.com/#organization",
                  "name": "SEO Utilities",
                  "url": "https://seo-utilities.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://seo-utilities.com/favicon.ico"
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
