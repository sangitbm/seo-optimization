import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { JSMinifierTool } from "@/components/tools/js-minifier";

const tool = getToolBySlug("js-minifier")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function JsMinifierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <JSMinifierTool dict={dict} />;
}
