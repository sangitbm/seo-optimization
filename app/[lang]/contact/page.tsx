import { createMetadata } from "@/lib/metadata";
import { Mail, MapPin } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the SEO Utilities team.",
  slug: "contact",
});

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict?.legal?.contact || {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">{t.title || "Contact Us"}</h1>
      
      <div className="prose prose-violet dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          {t.desc || "Have a question, suggestion, or encountered an issue with one of our tools? We'd love to hear from you."}
        </p>

        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.emailTitle || "Email Us"}</h3>
            <p className="text-muted-foreground mb-4">
              {t.emailDesc || "For support or general inquiries, email us directly."}
            </p>
            <a href="mailto:seoopti654@gmail.com" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              seoopti654@gmail.com
            </a>
          </div>
          
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <MapPin className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.locationTitle || "Location"}</h3>
            <p className="text-muted-foreground">
              Kathmandu<br />
              Nepal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
