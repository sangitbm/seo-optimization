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
  Link2,
  Type,
  KeyRound,
  FileJson,
  AlignLeft,
  MousePointerClick,
  Terminal,
  Contact
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
  | "Utilities"
  | "Developer Tools";

export const categories: ToolCategory[] = [
  "Meta Tags",
  "Structured Data",
  "Technical SEO",
  "Social Media",
  "Content",
  "Code",
  "Utilities",
  "Developer Tools",
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
  {
    name: "UTM Link Builder",
    slug: "utm-builder",
    description:
      "Generate custom Google Analytics UTM tracking links to track your marketing campaigns accurately. Build links for social media, email, and CPC campaigns.",
    shortDescription:
      "Create Google Analytics UTM tracking URLs.",
    icon: Link2,
    category: "Utilities",
    keywords: ["utm builder", "utm tracking", "google analytics link", "campaign url builder"],
    dateAdded: "2026-08-09",
    popular: true,
  },
  {
    name: "Word & Character Counter",
    slug: "word-counter",
    description:
      "A fast, free online word counter, character counter, and keyword density analyzer. Perfect for writing meta descriptions, tweets, and SEO-optimized blog content.",
    shortDescription:
      "Count words, characters, and analyze keyword density.",
    icon: Type,
    category: "Content",
    keywords: ["word counter", "character count", "letter counter", "text length"],
    dateAdded: "2026-08-09",
    popular: false,
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    description:
      "Generate secure, random passwords instantly. Customize length, include symbols, numbers, and uppercase letters. Keep your online accounts safe from hackers.",
    shortDescription:
      "Create strong, secure random passwords instantly.",
    icon: KeyRound,
    category: "Utilities",
    keywords: ["password generator", "strong password", "random password", "secure password"],
    dateAdded: "2026-08-09",
    popular: true,
  },
  {
    name: "JSON Formatter & Validator",
    slug: "json-formatter",
    description:
      "Beautify, format, and validate your JSON code. Catch syntax errors quickly before deploying your Structured Data (JSON-LD) or API payloads.",
    shortDescription:
      "Beautify, format, and validate JSON code.",
    icon: FileJson,
    category: "Code",
    keywords: ["json formatter", "json validator", "json beautifier", "format json"],
    dateAdded: "2026-08-10",
    popular: true,
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description:
      "Generate dummy text for your website mockups, designs, and templates. Customize the number of paragraphs, words, or lists you need instantly.",
    shortDescription:
      "Generate dummy text for your website mockups.",
    icon: AlignLeft,
    category: "Content",
    keywords: ["lorem ipsum", "dummy text", "placeholder text", "text generator"],
    dateAdded: "2026-08-10",
    popular: true,
  },
  {
    name: "Google SERP Simulator",
    slug: "serp-simulator",
    description:
      "Preview how your web page will look in Google's search results. See if your title tag or meta description is too long and will get truncated on Desktop or Mobile.",
    shortDescription:
      "Preview your web page in Google's search results.",
    icon: MousePointerClick,
    category: "Meta Tags",
    keywords: ["serp simulator", "google snippet preview", "meta description preview"],
    dateAdded: "2026-08-10",
    popular: true,
  },
  {
    name: "Code Generator",
    slug: "code-generator",
    description:
      "Generate production-ready code snippets for CRUD operations, authentication, file handling, API calls, database queries, and more. Supports Python, Django, FastAPI, Node.js, Express, Laravel, and Rails.",
    shortDescription:
      "Generate CRUD, Auth & more code in Python, Django, Node.js and others.",
    icon: Terminal,
    category: "Developer Tools",
    keywords: ["code generator", "crud generator", "python code", "django code", "fastapi", "nodejs", "express", "laravel", "developer tools"],
    dateAdded: "2026-08-12",
    popular: true,
  },
  {
    name: "Link in Bio Generator",
    slug: "social-profile-generator",
    description:
      "Create a beautiful, mobile-friendly Link in Bio page with all your social profiles. Generates a single QR code you can share anywhere. 100% free and hosted entirely in the QR code.",
    shortDescription:
      "Create a Link in Bio page and share it via a single QR code.",
    icon: Contact,
    category: "Social Media",
    keywords: ["link in bio", "social profile", "multiple links qr code", "linktree alternative", "qr code bio"],
    dateAdded: "2026-08-12",
    popular: true,
  }
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
