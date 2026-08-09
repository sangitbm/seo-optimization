import { createMetadata } from "@/lib/metadata";
import { Mail, MapPin } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the SEO Utilities team.",
  slug: "contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Contact Us</h1>
      
      <div className="prose prose-violet dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          Have a question, suggestion, or encountered an issue with one of our tools? We'd love to hear from you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">
              For support or general inquiries, email us directly.
            </p>
            <a href="mailto:support@seo-utilities.com" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              support@seo-utilities.com
            </a>
          </div>
          
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 mb-4">
              <MapPin className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-muted-foreground">
              SEO Utilities<br />
              123 Tech Avenue, Suite 100<br />
              San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
