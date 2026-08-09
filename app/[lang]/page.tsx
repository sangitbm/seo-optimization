import { Hero } from "@/components/hero";
import { ToolSearch } from "@/components/tool-search";
import { ToolGrid } from "@/components/tool-grid";
import { FAQSection } from "@/components/faq-section";
import { AdSlot } from "@/components/ad-slot";
import { getPopularTools, getRecentTools } from "@/lib/tools-data";
import { createWebsiteSchema, createFAQSchema } from "@/lib/structured-data";
import { safeJsonLd } from "@/lib/utils";
import { Shield, Zap, Globe } from "lucide-react";

const websiteSchema = createWebsiteSchema();
const faqSchema = createFAQSchema([
  {
    question: "Are these SEO tools really free?",
    answer:
      "Yes! All tools on SEO Utilities are completely free to use with no sign-up required.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All tools run entirely in your browser. We never send your data to any server.",
  },
  {
    question: "What SEO tools are available?",
    answer:
      "We offer 17+ tools including Meta Tag Generator, Schema Markup Generator, Sitemap Generator, and more.",
  },
]);

export default function HomePage() {
  const popularTools = getPopularTools();
  const recentTools = getRecentTools(6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />

      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Popular Tools */}
        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Popular Tools
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Our most-used SEO utilities
            </p>
          </div>
          <ToolGrid tools={popularTools} />
        </section>

        <AdSlot variant="banner" className="my-4" />

        {/* All Tools */}
        <section id="tools" className="scroll-mt-20 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All Tools
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Search and filter our complete collection of SEO tools
            </p>
          </div>
          <ToolSearch />
        </section>

        <AdSlot variant="in-content" className="my-4" />

        {/* Recently Added */}
        <section className="py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Recently Added
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The latest additions to our toolkit
            </p>
          </div>
          <ToolGrid tools={recentTools} />
        </section>

        {/* Features / About */}
        <section id="about" className="scroll-mt-20 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why SEO Utilities?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Built for speed, privacy, and developer experience
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "All tools run in your browser with zero server round-trips. Get instant results without waiting.",
              },
              {
                icon: Shield,
                title: "100% Private",
                description:
                  "Your data never leaves your browser. No tracking, no storage, no server-side processing.",
              },
              {
                icon: Globe,
                title: "SEO Optimized",
                description:
                  "Every tool follows SEO best practices and generates standards-compliant output ready for production.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border/50 bg-card p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10">
                  <feature.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <FAQSection />
        </section>
      </div>
    </>
  );
}
