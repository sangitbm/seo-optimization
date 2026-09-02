import { createBreadcrumbSchema, createWebApplicationSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/metadata";
import type { Tool } from "@/lib/tools-data";

export function ToolStructuredData({ tool }: { tool: Tool }) {
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/#tools` },
    { name: tool.name, url: `${SITE_URL}/${tool.slug}` },
  ]);

  const webApp = {
    ...createWebApplicationSchema(tool),
    url: `${SITE_URL}/${tool.slug}`,
    inLanguage: "en",
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
