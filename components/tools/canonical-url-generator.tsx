"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";
import { useAd } from "@/components/providers/ad-provider";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("canonical-url-generator")!;

const seoTips = [
  "Always use absolute URLs for canonical tags, not relative paths.",
  "Place the canonical tag in the <head> section of your HTML.",
  "Ensure canonical URLs use your preferred protocol (https://) and www preference.",
  "Self-referencing canonical tags (pointing to the same page) are recommended by Google.",
  "Canonical tags are hints, not directives — search engines may choose to ignore them.",
];

const faqs = [
  { question: "What is a canonical URL?", answer: "A canonical URL tells search engines which version of a page is the 'master' copy. It helps prevent duplicate content issues when the same content is accessible via multiple URLs." },
  { question: "When should I use canonical tags?", answer: "Use canonical tags when you have duplicate or very similar content accessible at different URLs, such as pages with URL parameters, www vs non-www versions, or HTTP vs HTTPS." },
  { question: "Can canonical tags point to a different domain?", answer: "Yes, cross-domain canonical tags are supported and can be used when content is syndicated across different domains." },
];

export function CanonicalUrlGeneratorTool({ dict }: { dict?: any }) {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const { showAd } = useAd();

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.canonical_url_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader><CardTitle className="text-lg">{t.configTitle || "Enter Your Canonical URL"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="canonical-url">{t.urlLabel || "Page URL"}</Label>
            <Input id="canonical-url" placeholder={t.urlPlaceholder || "https://example.com/my-page"} value={url} onChange={(e) => { setUrl(e.target.value); setOutput(""); }} className="h-12 text-base" />
            <p className="text-xs text-muted-foreground">{t.seoTips?.[1] || "Enter the preferred URL for this page. Use the full absolute URL including protocol."}</p>
          </div>
          <Button
            onClick={() => {
              if (!url.trim()) {
                toast.error(t.errorEmpty || "Please enter a URL first");
                return;
              }
              showAd(() => {
                setOutput(`<link rel="canonical" href="${url}">`);
                toast.success(t.generatedCode || "Canonical Tag generated!");
              });
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <Link2 className="h-5 w-5" /> {t.generateBtn || "Generate Canonical Tag"}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <div className="mt-6 space-y-4">
          <CodePreview code={output} language="html" label={t.generatedCode || "Canonical Tag"} />
          <div className="flex flex-wrap gap-2">
            <CopyButton text={output} label={ui.copy || "Copy HTML"} />
            <DownloadButton content={output} filename="canonical.html" mimeType="text/html" label={ui.download || "Download HTML"} />
            <ResetButton onReset={() => { setUrl(""); setOutput(""); }} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
