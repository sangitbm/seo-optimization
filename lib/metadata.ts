import { type Tool } from "./tools-data";

const SITE_URL = "https://seoopti.vercel.app";
const SITE_NAME = "SEO Utilities";

export function createMetadata({
  title,
  description,
  slug,
  noIndex = false,
  titleSuffix,
}: {
  title: string;
  description: string;
  slug?: string;
  noIndex?: boolean;
  /** Optional suffix appended as "Title — Suffix". The site name is added
   *  automatically once via the title template in app/layout.tsx, so it
   *  must never be included here. */
  titleSuffix?: string;
}) {
  const path = slug ? `/${slug}` : "";
  const url = `${SITE_URL}${path}`;
  const fullTitle = titleSuffix ? `${title} — ${titleSuffix}` : title;

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: "noindex, nofollow" }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export function createToolMetadata(tool: Tool) {
  return createMetadata({
    title: tool.name,
    description: tool.description,
    slug: tool.slug,
    titleSuffix: "Free Online Tool",
  });
}

export { SITE_URL, SITE_NAME };
