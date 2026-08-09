import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CanonicalUrlGeneratorTool } from "@/components/tools/canonical-url-generator";

const tool = getToolBySlug("canonical-url-generator")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function CanonicalUrlGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <CanonicalUrlGeneratorTool dict={dict} />;
}
