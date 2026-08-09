import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for SEO Utilities.",
  slug: "privacy",
});

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict?.legal?.privacy || {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{t.title || "Privacy Policy"}</h1>
      <p className="text-sm text-muted-foreground mb-8">Last Updated: August 9, 2026</p>
      
      <div className="prose prose-violet dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          {t.p1 || "At SEO Utilities, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SEO Utilities and how we use it."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.localTitle || "Local Processing & Client-Side Tools"}</h2>
        <p>
          {t.localText || "We do not collect or store your inputs. Almost all of the tools provided on SEO Utilities run entirely client-side (within your browser). The URLs, text, and settings you enter into our tools are processed locally and are never transmitted to our servers or stored in any database."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.logTitle || "Log Files"}</h2>
        <p>
          {t.logText || "SEO Utilities follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.adsTitle || "Google DoubleClick DART Cookie"}</h2>
        <p>
          {t.adsText || "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:"} <a href="https://policies.google.com/technologies/ads" className="text-violet-500 hover:underline">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.consentTitle || "Consent"}</h2>
        <p>
          {t.consentText || "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."}
        </p>
      </div>
    </div>
  );
}
