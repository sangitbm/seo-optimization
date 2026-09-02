import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { TwitterCardGeneratorTool } from "@/components/tools/twitter-card-generator";

const tool = getToolBySlug("twitter-card-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function TwitterCardGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <TwitterCardGeneratorTool />
    </>
  );
}
