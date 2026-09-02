import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { MetaTagPreviewTool } from "@/components/tools/meta-tag-preview";

const tool = getToolBySlug("meta-tag-preview")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function MetaTagPreviewPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <MetaTagPreviewTool />
    </>
  );
}
