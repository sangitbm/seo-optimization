import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RedirectGeneratorTool } from "@/components/tools/redirect-generator";

const tool = getToolBySlug("redirect-generator")!;
export const metadata = createToolMetadata(tool);

export default function RedirectGeneratorPage() {
  return <RedirectGeneratorTool />;
}
