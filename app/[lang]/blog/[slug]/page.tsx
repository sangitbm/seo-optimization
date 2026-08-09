import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";
import { i18n } from "@/i18n-config";

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
    slug: `blog/${slug}`,
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

  return (
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
    </article>
  );
}
