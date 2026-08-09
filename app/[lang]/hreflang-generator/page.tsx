import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { HreflangGeneratorTool } from "@/components/tools/hreflang-generator";

const tool = getToolBySlug("hreflang-generator")!;
export const metadata = createToolMetadata(tool);

export default function HreflangGeneratorPage() {
  return <HreflangGeneratorTool />;
}
