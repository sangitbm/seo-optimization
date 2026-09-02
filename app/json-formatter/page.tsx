import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { JsonFormatter } from "@/components/tools/json-formatter";

const tool = getToolBySlug("json-formatter")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function JsonFormatterPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <JsonFormatter />
    </>
  );
}
