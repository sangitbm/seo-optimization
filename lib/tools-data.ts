import {
  Code,
  FileCode,
  FileText,
  Globe,
  Hash,
  Image,
  Languages,
  Link,
  type LucideIcon,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Tag,
  MessageSquareShare,
} from "lucide-react";

export interface Tool {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: LucideIcon;
  category: ToolCategory;
  keywords: string[];
  dateAdded: string;
  popular: boolean;
}

export type ToolCategory =
  | "Meta Tags"
  | "Structured Data"
  | "Technical SEO"
  | "Social Media"
  | "Content"
  | "Code"
  | "Utilities";

export const categories: ToolCategory[] = [
  "Meta Tags",
  "Structured Data",
  "Technical SEO",
  "Social Media",
  "Content",
  "Code",
  "Utilities",
];

export const tools: Tool[] = [
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description:
      "Generate comprehensive HTML meta tags for your website including title, description, keywords, Open Graph, Twitter Cards, and more. Preview how your page appears in search results.",
    shortDescription:
      "Generate title, description, OG tags, Twitter cards and more.",
    icon: Tag,
    category: "Meta Tags",
    keywords: ["meta tags", "seo tags", "html meta", "head tags"],
    dateAdded: "2025-01-15",
    popular: true,
  },
  {
    name: "Schema Markup Generator",
    slug: "schema-generator",
    description:
      "Create structured data markup in JSON-LD format for Google rich results. Supports Organization, Person, Product, Article, FAQ, Event, LocalBusiness, Recipe, and more.",
    shortDescription:
      "Create JSON-LD structured data for rich snippets.",
    icon: Code,
    category: "Structured Data",
    keywords: ["schema markup", "json-ld", "structured data", "rich snippets"],
    dateAdded: "2025-01-20",
    popular: true,
  },
  {
    name: "Sitemap Generator",
    slug: "sitemap-generator",
    description:
      "Generate XML sitemaps for your website. Add URLs with priority, change frequency, and last modified date. Download the sitemap file ready for submission to search engines.",
    shortDescription:
      "Create XML sitemaps with priority and frequency settings.",
    icon: Globe,
    category: "Technical SEO",
    keywords: ["xml sitemap", "sitemap generator", "sitemap.xml"],
    dateAdded: "2025-02-01",
    popular: true,
  },
  {
    name: "Robots.txt Generator",
    slug: "robots-txt-generator",
    description:
      "Create a robots.txt file visually. Add user-agent rules, allow/disallow directives, sitemap references, and crawl delay settings. Download the file instantly.",
    shortDescription:
      "Build robots.txt visually with allow/disallow rules.",
    icon: Settings,
    category: "Technical SEO",
    keywords: ["robots.txt", "crawlers", "web crawling", "bot directives"],
    dateAdded: "2025-02-10",
    popular: true,
  },
  {
    name: "Open Graph Image Generator",
    slug: "open-graph-generator",
    description:
      "Design and export Open Graph images for social media sharing. Customize background colors, gradients, titles, and subtitles. Export as PNG for Facebook, LinkedIn, and more.",
    shortDescription:
      "Design OG images with custom colors, text, and gradients.",
    icon: Image,
    category: "Social Media",
    keywords: ["og image", "social image", "open graph image", "share image"],
    dateAdded: "2025-02-15",
    popular: false,
  },
  {
    name: "Twitter Card Generator",
    slug: "twitter-card-generator",
    description:
      "Generate Twitter Card meta tags with live preview. Support for Summary and Summary with Large Image card types. Copy the HTML instantly.",
    shortDescription:
      "Create Twitter Card meta tags with live preview.",
    icon: MessageSquareShare,
    category: "Social Media",
    keywords: ["twitter card", "twitter meta tags", "twitter seo"],
    dateAdded: "2025-02-20",
    popular: false,
  },
  {
    name: "Canonical URL Generator",
    slug: "canonical-url-generator",
    description:
      "Generate canonical link tags to prevent duplicate content issues. Enter your preferred URL and get the HTML tag ready to paste into your page head.",
    shortDescription:
      "Generate canonical link tags for duplicate content prevention.",
    icon: Link,
    category: "Meta Tags",
    keywords: ["canonical url", "canonical tag", "duplicate content"],
    dateAdded: "2025-03-01",
    popular: false,
  },
  {
    name: "Hreflang Generator",
    slug: "hreflang-generator",
    description:
      "Generate hreflang alternate link tags for multilingual websites. Add language and region codes with their corresponding URLs to help search engines serve the right content.",
    shortDescription:
      "Create hreflang tags for multilingual SEO.",
    icon: Languages,
    category: "Meta Tags",
    keywords: ["hreflang", "multilingual seo", "language tags", "international seo"],
    dateAdded: "2025-03-10",
    popular: false,
  },
  {
    name: "Redirect Generator",
    slug: "redirect-generator",
    description:
      "Generate redirect configurations for Apache (.htaccess), Nginx, Vercel, and Netlify. Support for 301 permanent and 302 temporary redirects.",
    shortDescription:
      "Generate redirect rules for Apache, Nginx, Vercel & Netlify.",
    icon: RefreshCw,
    category: "Technical SEO",
    keywords: ["redirects", "301 redirect", "htaccess", "nginx redirect"],
    dateAdded: "2025-03-15",
    popular: false,
  },
  {
    name: "Keyword Density Checker",
    slug: "keyword-density-checker",
    description:
      "Analyze the keyword density of your content. Get word count, keyword frequency, density percentages, and a table of the most frequently used words.",
    shortDescription:
      "Analyze word count, keyword frequency, and density.",
    icon: Search,
    category: "Content",
    keywords: ["keyword density", "word count", "content analysis", "seo analysis"],
    dateAdded: "2025-03-20",
    popular: true,
  },
  {
    name: "Meta Tag Preview",
    slug: "meta-tag-preview",
    description:
      "Preview how your page will appear on Google Search, Facebook, and Twitter. Enter your title, description, and URL to see realistic previews across platforms.",
    shortDescription:
      "Preview your page on Google, Facebook, and Twitter.",
    icon: Share2,
    category: "Meta Tags",
    keywords: ["serp preview", "google preview", "social preview"],
    dateAdded: "2025-04-01",
    popular: true,
  },
  {
    name: "Favicon Generator",
    slug: "favicon-generator",
    description:
      "Upload an image and generate all the favicon sizes you need: favicon.ico, PNG sizes (16x16 to 512x512), and Apple Touch icons. Download everything as a ZIP file.",
    shortDescription:
      "Generate all favicon sizes from a single image.",
    icon: Sparkles,
    category: "Utilities",
    keywords: ["favicon", "favicon generator", "icon generator", "apple touch icon"],
    dateAdded: "2025-04-10",
    popular: false,
  },
  {
    name: "Slug Generator",
    slug: "slug-generator",
    description:
      "Convert page titles and text into SEO-friendly URL slugs. Removes special characters, handles multiple languages, and creates clean, readable URLs.",
    shortDescription:
      "Convert titles into clean, SEO-friendly URL slugs.",
    icon: Hash,
    category: "Utilities",
    keywords: ["url slug", "slug generator", "seo url", "friendly url"],
    dateAdded: "2025-04-15",
    popular: false,
  },
  {
    name: "HTML Minifier",
    slug: "html-minifier",
    description:
      "Minify HTML code to reduce file size and improve page load speed. Also includes an HTML beautifier to format minified code for readability.",
    shortDescription:
      "Minify and beautify HTML code for better performance.",
    icon: FileCode,
    category: "Code",
    keywords: ["html minifier", "html beautifier", "html compress", "minify html"],
    dateAdded: "2025-05-01",
    popular: false,
  },
  {
    name: "CSS Minifier",
    slug: "css-minifier",
    description:
      "Minify CSS code to reduce stylesheet file size. Includes a CSS beautifier to format compressed CSS into readable, well-indented code.",
    shortDescription:
      "Minify and beautify CSS stylesheets.",
    icon: SlidersHorizontal,
    category: "Code",
    keywords: ["css minifier", "css beautifier", "css compress", "minify css"],
    dateAdded: "2025-05-05",
    popular: false,
  },
  {
    name: "JavaScript Minifier",
    slug: "js-minifier",
    description:
      "Minify JavaScript code to reduce script file size and improve performance. Includes a JS beautifier to make minified code readable again.",
    shortDescription:
      "Minify and beautify JavaScript code.",
    icon: FileText,
    category: "Code",
    keywords: ["js minifier", "javascript minifier", "js beautifier", "minify js"],
    dateAdded: "2025-05-10",
    popular: false,
  },
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description:
      "Generate QR codes from any URL or text. Customize colors and size. Download as PNG or SVG for print and digital use.",
    shortDescription:
      "Generate customizable QR codes in PNG and SVG.",
    icon: QrCode,
    category: "Utilities",
    keywords: ["qr code", "qr generator", "qr code maker"],
    dateAdded: "2025-05-15",
    popular: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function getRecentTools(count = 6): Tool[] {
  return [...tools]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, count);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return tools;
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}
