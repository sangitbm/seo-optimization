import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { SocialProfileGenerator } from "@/components/tools/social-profile-generator";
import { toolContent } from "@/lib/tool-content";

const tool = getToolBySlug("social-profile-generator")!;

export async function generateMetadata() {
  return createToolMetadata(tool);
}

export default function SocialProfileGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <SocialProfileGenerator content={toolContent["social-profile-generator"]} />
    </>
  );
}
