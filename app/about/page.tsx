import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn more about SEO Utilities and our mission to provide free, private SEO tools.",
  slug: "about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-violet dark:prose-invert max-w-none">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">About SEO Utilities</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to SEO Utilities. Our mission is to provide developers, marketers, and SEO professionals with high-quality, free tools to optimize their websites.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that essential SEO tools should be accessible to everyone without paywalls, sign-ups, or invasive tracking. Our tools run completely in your browser, meaning your data never touches our servers.
        </p>

        <h2>Our Tools</h2>
        <ul>
          <li><strong>Meta Tag Generator:</strong> Create perfect HTML meta tags for SEO and social sharing.</li>
          <li><strong>Schema Markup Generator:</strong> Add structured data to help Google understand your content.</li>
          <li><strong>Sitemap & Robots.txt:</strong> Essential technical SEO files generated instantly.</li>
          <li><strong>And many more...</strong> All built with modern web technologies.</li>
        </ul>

        <h2>Privacy First</h2>
        <p>
          Unlike many other online tools, we don't save your content or sell your data. Every tool on this site processes data client-side, right in your web browser. This ensures complete privacy and lightning-fast results.
        </p>
      </div>
    </div>
  );
}
