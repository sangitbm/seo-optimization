import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we protect your data.",
  slug: "privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-violet dark:prose-invert max-w-none">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: September 2, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          SEO Utilities is designed with privacy in mind. We do not require you to create an account, and we do not collect personally identifiable information (PII) unless you explicitly provide it (e.g., by contacting us).
        </p>
        <p>
          We use Google Analytics to collect anonymous usage data (such as page views and interactions) to help us improve our tools.
        </p>

        <h2>2. How Our Tools Work</h2>
        <p>
          All data processing for our tools happens client-side, directly in your web browser. When you use tools like the JSON Formatter or Meta Tag Generator, your text or code is never sent to our servers.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We use cookies primarily for analytics and necessary site functionality. You can manage your cookie preferences using the consent banner on our website.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          We use Google AdSense to serve advertisements, which may use cookies to serve ads based on your prior visits to our website or other websites.
        </p>
      </div>
    </div>
  );
}
