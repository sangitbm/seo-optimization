import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools-data";
import { getBlogPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

const BASE_URL = "https://seoopti.vercel.app";

function getBlogPostLastModified(slug: string): Date {
  try {
    const filePath = path.join(process.cwd(), "content", "blog", "en", `${slug}.md`);
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Homepage
  routes.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // 2. Tools
  for (const tool of tools) {
    routes.push({
      url: `${BASE_URL}/${tool.slug}`,
      lastModified: new Date(tool.dateAdded),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // 3. Blog Index
  routes.push({
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // 4. Blog Posts — use actual file mtime for freshness signal
  const posts = getBlogPosts("en");
  for (const post of posts) {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: getBlogPostLastModified(post.slug),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // 5. Legal & Info Pages
  const infoPages = ["about", "contact", "privacy", "terms"];
  for (const page of infoPages) {
    routes.push({
      url: `${BASE_URL}/${page}`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return routes;
}
