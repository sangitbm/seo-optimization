import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home, Lightbulb, BookOpen } from "lucide-react";
import { SEOTips } from "./seo-tips";
import { ToolFAQ } from "./tool-faq";
import type { Tool } from "@/lib/tools-data";
import { createToolBreadcrumb, createWebApplicationSchema, createFAQSchema } from "@/lib/structured-data";
import { safeJsonLd } from "@/lib/utils";

export interface ToolContent {
  /** Introductory paragraphs explaining what the tool does, why it matters */
  introduction: string[];
  /** Step-by-step usage guide */
  howToUse: { step: string; description: string }[];
  /** Expert best practices */
  bestPractices: string[];
  /** Related blog post slugs */
  relatedPosts?: { title: string; slug: string }[];
}

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  content?: ToolContent;
  seoTips?: string[];
  faqs?: { question: string; answer: string }[];
}

export function ToolLayout({ tool, children, content, seoTips, faqs }: ToolLayoutProps) {
  const breadcrumbSchema = createToolBreadcrumb(tool);
  const appSchema = createWebApplicationSchema(tool);
  const faqSchema = faqs ? createFAQSchema(faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-foreground">{tool.name}</li>
          </ol>
        </nav>

        {/* Title & Description */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
              <tool.icon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {tool.name}
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Rich Introduction Content — Server Rendered for SEO */}
        {content && content.introduction.length > 0 && (
          <section className="mb-10 max-w-4xl">
            <div className="prose prose-violet dark:prose-invert max-w-none">
              {content.introduction.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Tool UI */}
        <div className="mb-12">
          {children}
        </div>

        {/* How to Use — Server Rendered */}
        {content && content.howToUse.length > 0 && (
          <section className="mb-12 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-2xl font-bold tracking-tight">How to Use This Tool</h2>
            </div>
            <ol className="space-y-4">
              {content.howToUse.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{item.step}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Best Practices — Server Rendered */}
        {content && content.bestPractices.length > 0 && (
          <section className="mb-12 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
            </div>
            <ul className="space-y-3">
              {content.bestPractices.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <p className="text-muted-foreground leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* SEO Tips */}
        {seoTips && seoTips.length > 0 && <SEOTips tips={seoTips} />}

        {/* FAQ — Server Rendered */}
        {faqs && faqs.length > 0 && (
          <section className="mb-12">
            <ToolFAQ faqs={faqs} />
          </section>
        )}

        {/* Related Articles */}
        {content?.relatedPosts && content.relatedPosts.length > 0 && (
          <section className="mb-12 max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-violet-500/30 hover:shadow-md"
                >
                  <h3 className="font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">Read article →</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
