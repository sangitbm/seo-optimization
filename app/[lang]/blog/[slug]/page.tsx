import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { createMetadata, SITE_URL, SITE_NAME } from "@/lib/metadata";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ChevronLeft, Calendar, User, ArrowRight } from "lucide-react";
import { i18n } from "@/i18n-config";
import { getToolBySlug, tools } from "@/lib/tools-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    });
  }

  return createMetadata({
    title: post.meta.title,
    description: post.meta.description,
    slug: `${lang}/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  const paths = [];

  for (const locale of i18n.locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      paths.push({
        lang: locale,
        slug: post.slug,
      });
    }
  }

  return paths;
}

// Extract tool slug from blog slug like "how-to-use-meta-tag-generator"
function getRelatedToolSlug(blogSlug: string): string | null {
  const match = blogSlug.match(/^how-to-use-(.+)$/);
  return match ? match[1] : null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    notFound();
  }

  const relatedToolSlug = getRelatedToolSlug(slug);
  const relatedTool = relatedToolSlug ? getToolBySlug(relatedToolSlug) : null;

  // Pick 3 other tools as "related"
  const otherTools = tools
    .filter((t) => t.slug !== relatedToolSlug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    author: {
      "@type": "Person",
      name: post.meta.author || "SEO Utilities Team",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href={`/${lang}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:leading-tight">
            {post.meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.meta.author}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-violet dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-a:text-violet-600 dark:prose-a:text-violet-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Try the Tool CTA */}
        {relatedTool && (
          <div className="mt-16 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-indigo-600/5 p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">Try the {relatedTool.name}</h2>
            <p className="mb-6 text-muted-foreground">{relatedTool.shortDescription}</p>
            <Link
              href={`/${lang}/${relatedTool.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-violet-500/40"
            >
              Open {relatedTool.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Explore More SEO Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${lang}/${tool.slug}`}
                className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-violet-500/40 hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/10 to-indigo-600/10">
                  <tool.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {tool.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

