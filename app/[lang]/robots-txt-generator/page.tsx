import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RobotsTxtGeneratorTool } from "@/components/tools/robots-txt-generator";

const tool = getToolBySlug("robots-txt-generator")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function RobotsTxtGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <RobotsTxtGeneratorTool dict={dict} />;
}
