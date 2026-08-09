import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SitemapGeneratorTool } from "@/components/tools/sitemap-generator";

const tool = getToolBySlug("sitemap-generator")!;
export const metadata = createToolMetadata(tool);

export default function SitemapGeneratorPage() {
  return <SitemapGeneratorTool />;
}
