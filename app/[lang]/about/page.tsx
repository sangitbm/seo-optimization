import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn more about SEO Utilities and our mission.",
  slug: "about",
});

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict?.legal?.about || {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">{t.title || "About SEO Utilities"}</h1>
      
      <div className="prose prose-violet dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg">
          Welcome to <strong>SEO Utilities</strong>. {t.missionText1 || "Our passion for creating clean, developer-friendly SEO tools drove us to build a platform that runs entirely in your browser."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.mission || "Our Mission"}</h2>
        <p>
          {t.missionText2 || "We believe that essential webmaster tools should be free, fast, and accessible without requiring users to create accounts or sacrifice their privacy. Every tool processes your data locally."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.whyChooseUs || "Why Choose Us?"}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>{t.whyFast || "Lightning Fast: Our tools are built with modern web technologies to ensure instant results."}</strong></li>
          <li><strong>{t.whyPrivacy || "Privacy First: Your data never leaves your browser. Zero tracking."}</strong></li>
          <li><strong>{t.whyFree || "Always Free: We are committed to keeping our core tools 100% free forever."}</strong></li>
          <li><strong>{t.whyDev || "Developer Focused: Generated code is clean, semantic, and ready for production."}</strong></li>
        </ul>
      </div>
    </div>
  );
}
