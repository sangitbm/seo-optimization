import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { OpenGraphGeneratorTool } from "@/components/tools/open-graph-generator";

const tool = getToolBySlug("open-graph-generator")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function OpenGraphGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <OpenGraphGeneratorTool dict={dict} />;
}
