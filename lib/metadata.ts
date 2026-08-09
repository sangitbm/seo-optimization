import { type Tool, tools } from "./tools-data";

const SITE_URL = "https://seoopti.vercel.app";
const SITE_NAME = "SEO Utilities";

export function createMetadata({
  title,
  description,
  slug,
  noIndex = false,
  lang,
}: {
  title: string;
  description: string;
  slug?: string;
  noIndex?: boolean;
  lang?: string;
}) {
  const path = slug ? (lang ? `/${lang}/${slug}` : `/${slug}`) : (lang ? `/${lang}` : "");
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
      locale: lang === "es" ? "es_ES" : lang === "fr" ? "fr_FR" : lang === "de" ? "de_DE" : lang === "it" ? "it_IT" : lang === "pt" ? "pt_PT" : "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export function createToolMetadata(tool: Tool, lang: string) {
  return createMetadata({
    title: tool.name,
    description: tool.description,
    slug: tool.slug,
    lang,
  });
}

export { SITE_URL, SITE_NAME };
