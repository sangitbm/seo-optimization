import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RobotsTxtGeneratorTool } from "@/components/tools/robots-txt-generator";

const tool = getToolBySlug("robots-txt-generator")!;
export const metadata = createToolMetadata(tool);

export default function RobotsTxtGeneratorPage() {
  return <RobotsTxtGeneratorTool />;
}
