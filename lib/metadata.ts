import { type Tool } from "./tools-data";

const SITE_URL = "https://seoopti.vercel.app";
const SITE_NAME = "SEO Utilities";

export function createMetadata({
  title,
  description,
  slug,
  noIndex = false,
}: {
  title: string;
  description: string;
  slug?: string;
  noIndex?: boolean;
}) {
  const path = slug ? `/${slug}` : "";
  const url = `${SITE_URL}${path}`;

  return {
    title: slug ? `${title} — Free Online Tool | ${SITE_NAME}` : title,
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
  });
}

export { SITE_URL, SITE_NAME };
