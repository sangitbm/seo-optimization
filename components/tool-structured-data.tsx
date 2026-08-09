import { createBreadcrumbSchema, createWebApplicationSchema } from "@/lib/structured-data";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";
import type { Tool } from "@/lib/tools-data";

export function ToolStructuredData({ tool, lang }: { tool: Tool; lang: string }) {
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${lang}` },
    { name: "Tools", url: `${SITE_URL}/${lang}/#tools` },
    { name: tool.name, url: `${SITE_URL}/${lang}/${tool.slug}` },
  ]);

  const webApp = {
    ...createWebApplicationSchema(tool),
    url: `${SITE_URL}/${lang}/${tool.slug}`,
    inLanguage: lang,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
    </>
  );
}
