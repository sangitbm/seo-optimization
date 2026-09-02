import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { OpenGraphGeneratorTool } from "@/components/tools/open-graph-generator";

const tool = getToolBySlug("open-graph-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function OpenGraphGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <OpenGraphGeneratorTool />
    </>
  );
}
