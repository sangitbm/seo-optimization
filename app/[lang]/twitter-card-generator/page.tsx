import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { TwitterCardGeneratorTool } from "@/components/tools/twitter-card-generator";

const tool = getToolBySlug("twitter-card-generator")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function TwitterCardGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <TwitterCardGeneratorTool dict={dict} />;
}
