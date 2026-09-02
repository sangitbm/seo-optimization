import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RobotsTxtGeneratorTool } from "@/components/tools/robots-txt-generator";

const tool = getToolBySlug("robots-txt-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function RobotsTxtGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <RobotsTxtGeneratorTool />
    </>
  );
}
