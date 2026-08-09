"use client";

import { useState } from "react";
import { Plus, Trash2, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("hreflang-generator")!;

interface HreflangEntry { lang: string; url: string; }

const seoTips = [
  "Always include an x-default hreflang for users whose language isn't explicitly targeted.",
  "Use ISO 639-1 language codes (e.g., en, fr, de) and optionally ISO 3166-1 region codes (e.g., en-US, en-GB).",
  "Hreflang annotations should be reciprocal — each page must reference all other versions.",
  "Place hreflang tags in the <head> section or HTTP headers.",
];

const faqs = [
  { question: "What are hreflang tags?", answer: "Hreflang tags tell search engines which language and regional version of a page to show to users in different countries or languages." },
  { question: "When should I use hreflang?", answer: "Use hreflang when you have the same content in multiple languages or regional variations (e.g., English for US vs UK)." },
];

export function HreflangGeneratorTool({ dict }: { dict?: any }) {
  const [entries, setEntries] = useState<HreflangEntry[]>([
    { lang: "en", url: "" },
    { lang: "x-default", url: "" },
  ]);

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.hreflang_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const add = () => setEntries([...entries, { lang: "", url: "" }]);
  const remove = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));
  const update = (i: number, key: keyof HreflangEntry, value: string) => {
    setEntries(entries.map((e, idx) => idx === i ? { ...e, [key]: value } : e));
  };

  const output = entries
    .filter((e) => e.lang && e.url)
    .map((e) => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}">`)
    .join("\n");

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t.urlsTitle || "Language Versions"}</CardTitle>
          <Button onClick={add} size="sm" className="gap-1"><Plus className="h-4 w-4" /> {t.addUrl || "Add"}</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-32 space-y-1">
                <Label>{t.languageLabel || "Language"}</Label>
                <Input placeholder="en-US" value={entry.lang} onChange={(e) => update(i, "lang", e.target.value)} />
              </div>
              <div className="flex-1 space-y-1">
                <Label>{t.urlLabel || "URL"}</Label>
                <Input placeholder="https://example.com/en/" value={entry.url} onChange={(e) => update(i, "url", e.target.value)} />
              </div>
              {entries.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => remove(i)} className="text-destructive h-10 w-10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              if (!entries.some((e) => e.url.trim())) {
                toast.error(t.errorEmpty || "Please enter at least one URL");
                return;
              }
              toast.success(t.generatedCode || "Hreflang Tags generated!");
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <Globe className="h-5 w-5" /> {t.generateBtn || "Generate Hreflang Tags"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <div className="mt-6 space-y-4">
          <CodePreview code={output} language="html" label={t.generatedCode || "Hreflang Tags"} />
          <div className="flex flex-wrap gap-2">
            <CopyButton text={output} label={ui.copy || "Copy HTML"} />
            <DownloadButton content={output} filename="hreflang-tags.html" mimeType="text/html" label={ui.download || "Download HTML"} />
            <ResetButton onReset={() => setEntries([{ lang: "en", url: "" }, { lang: "x-default", url: "" }])} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
