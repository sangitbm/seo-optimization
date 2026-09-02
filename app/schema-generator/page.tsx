import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SchemaGeneratorTool } from "@/components/tools/schema-generator";

const tool = getToolBySlug("schema-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function SchemaGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <SchemaGeneratorTool />
    </>
  );
}
