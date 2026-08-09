import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RedirectGeneratorTool } from "@/components/tools/redirect-generator";

const tool = getToolBySlug("redirect-generator")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function RedirectGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <RedirectGeneratorTool dict={dict} />;
}
