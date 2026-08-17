import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

const tool = getToolBySlug("uuid-generator")!;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

export default async function UuidGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await getDictionary(lang as Locale);
  return <UuidGenerator />;
}
