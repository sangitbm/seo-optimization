import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CodeGeneratorTool } from "@/components/tools/code-generator";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

const tool = getToolBySlug("code-generator")!;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

export default async function CodeGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <ToolStructuredData tool={tool} lang={lang} />
      <CodeGeneratorTool dict={dict} />
    </>
  );
}
