import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CSSMinifierTool } from "@/components/tools/css-minifier";

const tool = getToolBySlug("css-minifier")!;
export const metadata = createToolMetadata(tool);

export default function CSSMinifierPage() {
  return <CSSMinifierTool />;
}
