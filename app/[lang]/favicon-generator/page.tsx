import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { FaviconGeneratorTool } from "@/components/tools/favicon-generator";

const tool = getToolBySlug("favicon-generator")!;
export const metadata = createToolMetadata(tool);

export default function FaviconGeneratorPage() {
  return <FaviconGeneratorTool />;
}
