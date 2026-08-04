import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { TwitterCardGeneratorTool } from "@/components/tools/twitter-card-generator";

const tool = getToolBySlug("twitter-card-generator")!;
export const metadata = createToolMetadata(tool);

export default function TwitterCardGeneratorPage() {
  return <TwitterCardGeneratorTool />;
}
