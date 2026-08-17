import { createMetadata } from "@/lib/metadata";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Have a question or feedback? Get in touch with the SEO Utilities team. We reply within 24 hours.",
  slug: "contact",
});

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict?.legal?.contact || {};

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title || "Contact Us"}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.desc || "Have a question, suggestion, or encountered an issue with one of our tools? We'd love to hear from you."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.emailTitle || "Email Us"}</h3>
            <p className="text-muted-foreground text-sm mb-3">
              {t.emailDesc || "For support or general inquiries, email us directly."}
            </p>
            <a href="mailto:seoopti654@gmail.com" className="text-violet-600 dark:text-violet-400 font-medium hover:underline text-sm">
              seoopti654@gmail.com
            </a>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <MapPin className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.locationTitle || "Location"}</h3>
            <p className="text-muted-foreground text-sm">
              Kathmandu<br />Nepal
            </p>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Response Time</h3>
            <p className="text-muted-foreground text-sm">
              We aim to reply to all inquiries within <strong>24 hours</strong> during business days.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border/50 bg-card p-8">
            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
