import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { MetaTagPreviewTool } from "@/components/tools/meta-tag-preview";

const tool = getToolBySlug("meta-tag-preview")!;
export const metadata = createToolMetadata(tool);

export default function MetaTagPreviewPage() {
  return <MetaTagPreviewTool />;
}
