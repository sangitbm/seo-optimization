import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the SEO Utilities team for support, feedback, or inquiries.",
  slug: "contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-violet dark:prose-invert max-w-none">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We'd love to hear from you. Whether you have a question, feature request, or just want to say hi, feel free to reach out.
        </p>

        <h2>Get in Touch</h2>
        <p>
          You can reach our team via email at <strong>support@seoopti.vercel.app</strong> (Note: this is a placeholder email for demonstration purposes).
        </p>

        <h2>Support FAQ</h2>
        <ul>
          <li><strong>How much do the tools cost?</strong> They are 100% free forever.</li>
          <li><strong>Do I need an account?</strong> No sign-up is required to use any of our tools.</li>
          <li><strong>Can I suggest a new tool?</strong> Absolutely! Send us an email with your ideas.</li>
        </ul>
      </div>
    </div>
  );
}
