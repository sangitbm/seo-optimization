import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { JSMinifierTool } from "@/components/tools/js-minifier";

const tool = getToolBySlug("js-minifier")!;
export const metadata = createToolMetadata(tool);

export default function JSMinifierPage() {
  return <JSMinifierTool />;
}
