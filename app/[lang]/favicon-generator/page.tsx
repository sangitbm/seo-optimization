import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { FaviconGeneratorTool } from "@/components/tools/favicon-generator";

const tool = getToolBySlug("favicon-generator")!;
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function FaviconGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <ToolStructuredData tool={tool} lang={lang} />
      <FaviconGeneratorTool dict={dict}  />
    </>
  );
}
