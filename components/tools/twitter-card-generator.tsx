"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("twitter-card-generator")!;

const defaultState = { card: "summary_large_image", site: "", title: "", description: "", image: "" };

function generateMeta(s: typeof defaultState): string {
  const lines = [];
  if (s.card) lines.push(`<meta name="twitter:card" content="${s.card}">`);
  if (s.site) lines.push(`<meta name="twitter:site" content="${s.site}">`);
  if (s.title) lines.push(`<meta name="twitter:title" content="${s.title}">`);
  if (s.description) lines.push(`<meta name="twitter:description" content="${s.description}">`);
  if (s.image) lines.push(`<meta name="twitter:image" content="${s.image}">`);
  return lines.join("\n");
}

const seoTips = [
  "Use Summary Large Image for maximum visual impact on Twitter.",
  "Twitter card images should be at least 300x157 pixels, ideally 1200x628.",
  "Include your @username in the twitter:site tag for brand attribution.",
];

const faqs = [
  { question: "What are Twitter Cards?", answer: "Twitter Cards are meta tags that control how your content appears when shared on Twitter, including the image, title, and description." },
  { question: "How do I validate my Twitter Card?", answer: "Use the Twitter Card Validator at cards-dev.twitter.com/validator to preview and debug your card markup." },
];

export function TwitterCardGeneratorTool({ dict }: { dict?: any }) {
  const [state, setState] = useState(defaultState);
  const [output, setOutput] = useState("");


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.twitter_card_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;
  const update = (k: string, v: string) => { setState((p) => ({ ...p, [k]: v })); setOutput(""); };

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t.configTitle || "Card Settings"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.cardTypeLabel || "Card Type"}</Label>
              <Select value={state.card} onValueChange={(v) => update("card", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="summary_large_image">Summary with Large Image</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.usernameLabel || "@Username"}</Label>
              <Input placeholder="@yourusername" value={state.site} onChange={(e) => update("site", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t.titleLabel || "Title"}</Label>
              <Input placeholder="Page title" value={state.title} onChange={(e) => update("title", e.target.value)} />
              <p className="text-xs text-muted-foreground">{state.title.length}/70 characters</p>
            </div>
            <div className="space-y-2">
              <Label>{t.descLabel || "Description"}</Label>
              <Textarea placeholder="Page description" value={state.description} onChange={(e) => update("description", e.target.value)} rows={3} />
              <p className="text-xs text-muted-foreground">{state.description.length}/200 characters</p>
            </div>
            <div className="space-y-2">
              <Label>{t.imageLabel || "Image URL"}</Label>
              <Input placeholder="https://example.com/image.jpg" value={state.image} onChange={(e) => update("image", e.target.value)} />
            </div>
            <Button
              onClick={() => {
                if (!state.title.trim() && !state.description.trim()) {
                  toast.error(t.errorEmpty || "Please enter a title or description first");
                  return;
                }
                setOutput(generateMeta(state));
                  toast.success(t.successGenerate || "Twitter Card tags generated successfully!");
              }}
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
            >
              <Share2 className="h-5 w-5" /> {t.generateBtn || "Generate Twitter Card"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">{t.previewTitle || "Twitter Preview"}</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900">
                {state.image && state.card === "summary_large_image" && (
                  <div className="aspect-[2/1] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground text-sm">
                    Image Preview
                  </div>
                )}
                <div className="flex gap-3 p-3">
                  {state.image && state.card === "summary" && (
                    <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-muted-foreground">
                      Img
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">example.com</p>
                    <p className="font-medium text-sm truncate">{state.title || "Title"}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{state.description || "Description"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {output && (
        <div className="mt-6 space-y-4">
          <CodePreview code={output} language="html" label={t.generatedCode || "Twitter Card Meta Tags"} />
          <div className="flex flex-wrap gap-2">
            <CopyButton text={output} label={ui.copy || "Copy HTML"} />
            <DownloadButton content={output} filename="twitter-cards.html" mimeType="text/html" label={ui.download || "Download HTML"} />
            <ResetButton onReset={() => { setState(defaultState); setOutput(""); }} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
