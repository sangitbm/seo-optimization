import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { JSMinifierTool } from "@/components/tools/js-minifier";

const tool = getToolBySlug("js-minifier")!;
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function JsMinifierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <ToolStructuredData tool={tool} lang={lang} />
      <JSMinifierTool dict={dict}  />
    </>
  );
}
