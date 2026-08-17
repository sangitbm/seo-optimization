import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { CronJobGenerator } from "@/components/tools/cron-job-generator";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

const tool = getToolBySlug("cron-job-generator")!;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createToolMetadata(tool, lang);
}

export default async function CronJobGeneratorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await getDictionary(lang as Locale);
  return <CronJobGenerator />;
}
