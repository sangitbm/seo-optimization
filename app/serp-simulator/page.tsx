import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SerpSimulator } from "@/components/tools/serp-simulator";

const tool = getToolBySlug("serp-simulator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function SerpSimulatorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <SerpSimulator />
    </>
  );
}
