import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { OpenGraphGeneratorTool } from "@/components/tools/open-graph-generator";

const tool = getToolBySlug("open-graph-generator")!;
export const metadata = createToolMetadata(tool);

export default function OpenGraphGeneratorPage() {
  return <OpenGraphGeneratorTool />;
}
