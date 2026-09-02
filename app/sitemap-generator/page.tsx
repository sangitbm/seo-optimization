import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SitemapGeneratorTool } from "@/components/tools/sitemap-generator";

const tool = getToolBySlug("sitemap-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function SitemapGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <SitemapGeneratorTool />
    </>
  );
}
