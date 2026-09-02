import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { KeywordDensityCheckerTool } from "@/components/tools/keyword-density-checker";

const tool = getToolBySlug("keyword-density-checker")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function KeywordDensityCheckerPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <KeywordDensityCheckerTool />
    </>
  );
}
