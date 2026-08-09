import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SchemaGeneratorTool } from "@/components/tools/schema-generator";

const tool = getToolBySlug("schema-generator")!;
export const metadata = createToolMetadata(tool);

export default function SchemaGeneratorPage() {
  return <SchemaGeneratorTool />;
}
