import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CanonicalUrlGeneratorTool } from "@/components/tools/canonical-url-generator";

const tool = getToolBySlug("canonical-url-generator")!;
export const metadata = createToolMetadata(tool);

export default function CanonicalUrlGeneratorPage() {
  return <CanonicalUrlGeneratorTool />;
}
