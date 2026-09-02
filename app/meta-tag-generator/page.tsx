import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { MetaTagGeneratorTool } from "@/components/tools/meta-tag-generator";

const tool = getToolBySlug("meta-tag-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function MetaTagGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <MetaTagGeneratorTool />
    </>
  );
}
