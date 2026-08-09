import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { KeywordDensityCheckerTool } from "@/components/tools/keyword-density-checker";

const tool = getToolBySlug("keyword-density-checker")!;
export const metadata = createToolMetadata(tool);

export default function KeywordDensityCheckerPage() {
  return <KeywordDensityCheckerTool />;
}
