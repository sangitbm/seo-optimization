import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { AdSlot } from "./ad-slot";
import { SEOTips } from "./seo-tips";
import { ToolFAQ } from "./tool-faq";
import type { Tool } from "@/lib/tools-data";
import { createToolBreadcrumb, createWebApplicationSchema, createFAQSchema } from "@/lib/structured-data";
import { safeJsonLd } from "@/lib/utils";

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  seoTips?: string[];
  faqs?: { question: string; answer: string }[];
}

export function ToolLayout({ tool, children, seoTips, faqs }: ToolLayoutProps) {
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

        {/* Top Ad — below page title, clearly separated from navigation */}
        <AdSlot variant="banner" className="mb-8" />

        {/* Content + Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            {/* Tool UI */}
            {children}

            {/* In-content Ad */}
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Advertisement</p>
              <AdSlot variant="in-content" />
            </div>

            {/* SEO Tips */}
            {seoTips && seoTips.length > 0 && <SEOTips tips={seoTips} />}

            {/* FAQ */}
            {faqs && faqs.length > 0 && <ToolFAQ faqs={faqs} />}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot variant="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
