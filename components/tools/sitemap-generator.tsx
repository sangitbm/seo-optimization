"use client";

import { useState } from "react";
import { Plus, Trash2, FileCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("sitemap-generator")!;

interface SitemapEntry {
  url: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

const defaultEntry: SitemapEntry = {
  url: "",
  priority: "0.5",
  changefreq: "monthly",
  lastmod: new Date().toISOString().split("T")[0],
};

/**
 * Returns true only for http:// or https:// URLs to prevent javascript: or
 * data: URIs being injected into the generated sitemap files.
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Escapes characters that have special meaning in XML so that user-supplied
 * URLs cannot break out of XML element/attribute context.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function generateXML(entries: SitemapEntry[]): string {
  const urls = entries
    .filter((e) => e.url && isValidUrl(e.url))
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.url)}</loc>
    <lastmod>${escapeXml(e.lastmod)}</lastmod>
    <changefreq>${escapeXml(e.changefreq)}</changefreq>
    <priority>${escapeXml(e.priority)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateHTML(entries: SitemapEntry[]): string {
  const links = entries
    .filter((e) => e.url && isValidUrl(e.url))
    .map((e) => `  <li><a href="${escapeXml(e.url)}">${escapeXml(e.url)}</a></li>`)
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head><title>Sitemap</title></head>
<body>
<h1>Sitemap</h1>
<ul>
${links}
</ul>
</body>
</html>`;
}

const seoTips = [
  "Submit your sitemap to Google Search Console and Bing Webmaster Tools.",
  "Keep your sitemap under 50,000 URLs and 50MB uncompressed.",
  "Update the lastmod date whenever page content changes significantly.",
  "Set higher priority (0.8-1.0) for your most important pages.",
  "Reference your sitemap in robots.txt with: Sitemap: https://yoursite.com/sitemap.xml",
];

const faqs = [
  { question: "What is a sitemap?", answer: "A sitemap is an XML file that lists all important pages on your website. It helps search engines discover and crawl your content more efficiently." },
  { question: "How often should I update my sitemap?", answer: "Update your sitemap whenever you add, remove, or significantly modify pages. Most CMS platforms generate sitemaps automatically." },
  { question: "Where should I place my sitemap?", answer: "Place your sitemap.xml in the root of your domain (e.g., https://example.com/sitemap.xml) and reference it in your robots.txt file." },
];

export function SitemapGeneratorTool() {
  const [entries, setEntries] = useState<SitemapEntry[]>([{ ...defaultEntry }]);

  const addEntry = () => setEntries([...entries, { ...defaultEntry }]);

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, key: keyof SitemapEntry, value: string) => {
    setEntries(entries.map((e, i) => (i === index ? { ...e, [key]: value } : e)));
  };

  const xmlOutput = generateXML(entries);
  const htmlOutput = generateHTML(entries);

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">URL Entries</CardTitle>
          <Button onClick={addEntry} size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add URL
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">URL #{index + 1}</span>
                {entries.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeEntry(index)} className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                  <Label>URL</Label>
                  <Input placeholder="https://example.com/page" value={entry.url} onChange={(e) => updateEntry(index, "url", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Priority</Label>
                  <Select value={entry.priority} onValueChange={(v) => updateEntry(index, "priority", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Change Frequency</Label>
                  <Select value={entry.changefreq} onValueChange={(v) => updateEntry(index, "changefreq", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Last Modified</Label>
                  <Input type="date" value={entry.lastmod} onChange={(e) => updateEntry(index, "lastmod", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              if (!entries.some((e) => e.url.trim())) {
                toast.error("Please enter at least one URL");
                return;
              }
              toast.success("XML & HTML Sitemaps generated successfully!");
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <FileCode className="h-5 w-5" /> Generate Sitemap
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-6">
        <CodePreview code={xmlOutput} language="xml" label="XML Sitemap" />
        <div className="flex flex-wrap gap-2">
          <CopyButton text={xmlOutput} label="Copy XML" />
          <DownloadButton content={xmlOutput} filename="sitemap.xml" mimeType="application/xml" label="Download XML" />
          <DownloadButton content={htmlOutput} filename="sitemap.html" mimeType="text/html" label="Download HTML" />
          <ResetButton onReset={() => setEntries([{ ...defaultEntry }])} />
        </div>
      </div>
    </ToolLayout>
  );
}
