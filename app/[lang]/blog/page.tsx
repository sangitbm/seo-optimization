import { getBlogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Calendar } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createMetadata({
    title: "SEO Blog & Resources",
    description: "Read the latest articles on SEO best practices, meta tags, structured data, and technical search engine optimization.",
    slug: "blog",
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = getBlogPosts(lang);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">SEO Blog & Resources</h1>
        <p className="text-xl text-muted-foreground">
          Expert insights, guides, and tutorials to help you master technical SEO.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">No posts found for this language yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
              <article className="group h-full rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(lang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="mb-3 text-2xl font-bold group-hover:text-violet-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-violet-500">
                  Read article &rarr;
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
