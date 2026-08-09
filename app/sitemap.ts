import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools-data";
import { i18n } from "@/i18n-config";
import { getBlogPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

const BASE_URL = "https://seoopti.vercel.app";

function getBlogPostLastModified(slug: string, locale: string): Date {
  try {
    const filePath = path.join(process.cwd(), "content", "blog", locale, `${slug}.md`);
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    // 1. Homepage
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    // 2. Tools
    for (const tool of tools) {
      routes.push({
        url: `${BASE_URL}/${locale}/${tool.slug}`,
        lastModified: new Date(tool.dateAdded),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // 3. Blog Index
    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // 4. Blog Posts — use actual file mtime for freshness signal
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      routes.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: getBlogPostLastModified(post.slug, locale),
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }

    // 5. Legal Pages
    const legalPages = ["about", "contact", "privacy", "terms"];
    for (const page of legalPages) {
      routes.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date("2026-08-09"),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return routes;
}

