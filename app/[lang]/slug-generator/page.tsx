import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SlugGeneratorTool } from "@/components/tools/slug-generator";

const tool = getToolBySlug("slug-generator")!;
export const metadata = createToolMetadata(tool);

export default function SlugGeneratorPage() {
  return <SlugGeneratorTool />;
}
