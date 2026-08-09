import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { RobotsTxtGeneratorTool } from "@/components/tools/robots-txt-generator";

const tool = getToolBySlug("robots-txt-generator")!;
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function RobotsTxtGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <ToolStructuredData tool={tool} lang={lang} />
      <RobotsTxtGeneratorTool dict={dict}  />
    </>
  );
}
