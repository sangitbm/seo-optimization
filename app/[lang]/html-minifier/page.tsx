import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { HTMLMinifierTool } from "@/components/tools/html-minifier";

const tool = getToolBySlug("html-minifier")!;
export const metadata = createToolMetadata(tool);

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function HTMLMinifierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return <HTMLMinifierTool dict={dict} />;
}
