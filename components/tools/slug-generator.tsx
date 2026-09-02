"use client";

import { useState, useMemo } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { CopyButton } from "@/components/copy-button";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("slug-generator")!;

function generateSlug(text: string, separator: string, lowercase: boolean, maxLength: number): string {
  let slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, separator);

  if (lowercase) slug = slug.toLowerCase();
  if (maxLength > 0) slug = slug.substring(0, maxLength).replace(new RegExp(`${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), "");

  return slug;
}

const seoTips = [
  "Keep URLs short and descriptive — under 60 characters is ideal.",
  "Use hyphens (-) as word separators, not underscores.",
  "Include your target keyword in the URL slug.",
  "Avoid stop words (the, a, and, is) in slugs unless they add meaning.",
  "Use lowercase letters only to avoid duplicate URL issues.",
];

const faqs = [
  { question: "What is a URL slug?", answer: "A URL slug is the part of a URL that identifies a page in human-readable form. For example, in /my-awesome-page, 'my-awesome-page' is the slug." },
  { question: "Why are SEO-friendly URLs important?", answer: "Clean, descriptive URLs help search engines understand your content and improve click-through rates from search results." },
];

export function SlugGeneratorTool() {
  const dict: any = {};
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [maxLength, setMaxLength] = useState(0);
  const [slug, setSlug] = useState("");


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.slug_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const handleChange = () => setSlug("");

  return (
    <ToolLayout tool={tool} content={toolContent["slug-generator"]} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader><CardTitle className="text-lg">{t.configTitle || "Input"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.inputLabel || "Title or Text"}</Label>
            <Input value={text} onChange={(e) => { setText(e.target.value); handleChange(); }} placeholder={t.inputPlaceholder || "How to Generate SEO-Friendly URLs"} className="h-12 text-base" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Separator</Label>
              <Select value={separator} onValueChange={(v) => { setSeparator(v); handleChange(); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">Hyphen (-)</SelectItem>
                  <SelectItem value="_">Underscore (_)</SelectItem>
                  <SelectItem value=".">Dot (.)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Length (0 = unlimited)</Label>
              <Input type="number" min="0" value={maxLength} onChange={(e) => { setMaxLength(parseInt(e.target.value) || 0); handleChange(); }} />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <Switch checked={lowercase} onCheckedChange={(v) => { setLowercase(v); handleChange(); }} id="lowercase-switch" />
              <Label htmlFor="lowercase-switch">Lowercase</Label>
            </div>
          </div>
            <Button
            onClick={() => {
              if (!text.trim()) {
                toast.error(t.errorEmpty || "Please enter some text to generate a slug");
                return;
              }
              setSlug(generateSlug(text, separator, lowercase, maxLength));
              toast.success(t.successGenerate || "Slug generated successfully!");
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <Wand2 className="h-5 w-5" /> {t.generateBtn || "Generate Slug"}
          </Button>
        </CardContent>
      </Card>

      {slug && (
        <Card className="mt-6">
          <CardHeader><CardTitle className="text-lg">{t.outputLabel || "Generated Slug"}</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4 font-mono text-lg break-all">{slug}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t.fullUrlExample || "Full URL example"}: https://example.com/{slug}</p>
            <div className="mt-4 flex gap-2">
              <CopyButton text={slug} label={ui.copy || "Copy Slug"} />
              <CopyButton text={`https://example.com/${slug}`} label={t.copyUrl || "Copy Full URL"} variant="outline" />
              <ResetButton onReset={() => { setText(""); setSlug(""); }} />
            </div>
          </CardContent>
        </Card>
      )}
    </ToolLayout>
  );
}
