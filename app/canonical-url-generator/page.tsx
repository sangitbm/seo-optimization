import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CanonicalUrlGeneratorTool } from "@/components/tools/canonical-url-generator";

const tool = getToolBySlug("canonical-url-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function CanonicalUrlGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <CanonicalUrlGeneratorTool />
    </>
  );
}
