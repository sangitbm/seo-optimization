import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { HTMLMinifierTool } from "@/components/tools/html-minifier";

const tool = getToolBySlug("html-minifier")!;
export const metadata = createToolMetadata(tool);

export default function HTMLMinifierPage() {
  return <HTMLMinifierTool />;
}
