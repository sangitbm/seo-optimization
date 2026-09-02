import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { HreflangGeneratorTool } from "@/components/tools/hreflang-generator";

const tool = getToolBySlug("hreflang-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function HreflangGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <HreflangGeneratorTool />
    </>
  );
}
