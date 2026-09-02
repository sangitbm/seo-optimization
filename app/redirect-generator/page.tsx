import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RedirectGeneratorTool } from "@/components/tools/redirect-generator";

const tool = getToolBySlug("redirect-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function RedirectGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <RedirectGeneratorTool />
    </>
  );
}
