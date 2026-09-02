import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SlugGeneratorTool } from "@/components/tools/slug-generator";

const tool = getToolBySlug("slug-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function SlugGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <SlugGeneratorTool />
    </>
  );
}
