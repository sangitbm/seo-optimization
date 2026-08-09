import { createMetadata } from "@/lib/metadata";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms of Service for SEO Utilities.",
  slug: "terms",
});

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict?.legal?.terms || {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">{t.title || "Terms of Service"}</h1>
      <p className="text-sm text-muted-foreground mb-8">Last Updated: August 9, 2026</p>
      
      <div className="prose prose-violet dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          {t.p1 || "Welcome to SEO Utilities! These terms and conditions outline the rules and regulations for the use of SEO Utilities's Website."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.licenseTitle || "License"}</h2>
        <p>
          {t.licenseText || "Unless otherwise stated, SEO Utilities and/or its licensors own the intellectual property rights for all material on SEO Utilities. You may use our free tools and the output they generate for both personal and commercial projects without restriction."}
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.userCommentsTitle || "Disclaimer"}</h2>
        <p>
          {t.userCommentsText || "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Our tools are provided 'as is' without any warranty."}
        </p>
      </div>
    </div>
  );
}
