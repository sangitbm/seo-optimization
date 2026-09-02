import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { UtmBuilder } from "@/components/tools/utm-builder";

const tool = getToolBySlug("utm-builder")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function UtmBuilderPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <UtmBuilder />
    </>
  );
}
