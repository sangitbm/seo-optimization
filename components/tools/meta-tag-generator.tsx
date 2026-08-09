"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";
import { useAd } from "@/components/providers/ad-provider";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("meta-tag-generator")!;

interface MetaState {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
  charset: string;
  viewport: string;
  themeColor: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: string;
  ogSiteName: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
}

const defaultState: MetaState = {
  title: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  robots: "index, follow",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#6d28d9",
  ogTitle: "",
  ogDescription: "",
  ogUrl: "",
  ogImage: "",
  ogType: "website",
  ogSiteName: "",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  twitterSite: "",
};

function generateHTML(state: MetaState): string {
  const lines: string[] = [];

  if (state.charset) lines.push(`<meta charset="${state.charset}">`);
  if (state.viewport) lines.push(`<meta name="viewport" content="${state.viewport}">`);
  if (state.title) lines.push(`<title>${state.title}</title>`);
  if (state.description) lines.push(`<meta name="description" content="${state.description}">`);
  if (state.keywords) lines.push(`<meta name="keywords" content="${state.keywords}">`);
  if (state.robots) lines.push(`<meta name="robots" content="${state.robots}">`);
  if (state.themeColor) lines.push(`<meta name="theme-color" content="${state.themeColor}">`);
  if (state.canonicalUrl) lines.push(`<link rel="canonical" href="${state.canonicalUrl}">`);

  // Open Graph
  if (state.ogTitle || state.title)
    lines.push(`<meta property="og:title" content="${state.ogTitle || state.title}">`);
  if (state.ogDescription || state.description)
    lines.push(`<meta property="og:description" content="${state.ogDescription || state.description}">`);
  if (state.ogUrl || state.canonicalUrl)
    lines.push(`<meta property="og:url" content="${state.ogUrl || state.canonicalUrl}">`);
  if (state.ogImage) lines.push(`<meta property="og:image" content="${state.ogImage}">`);
  if (state.ogType) lines.push(`<meta property="og:type" content="${state.ogType}">`);
  if (state.ogSiteName) lines.push(`<meta property="og:site_name" content="${state.ogSiteName}">`);

  // Twitter
  if (state.twitterCard)
    lines.push(`<meta name="twitter:card" content="${state.twitterCard}">`);
  if (state.twitterTitle || state.title)
    lines.push(`<meta name="twitter:title" content="${state.twitterTitle || state.title}">`);
  if (state.twitterDescription || state.description)
    lines.push(`<meta name="twitter:description" content="${state.twitterDescription || state.description}">`);
  if (state.twitterImage || state.ogImage)
    lines.push(`<meta name="twitter:image" content="${state.twitterImage || state.ogImage}">`);
  if (state.twitterSite)
    lines.push(`<meta name="twitter:site" content="${state.twitterSite}">`);

  return lines.join("\n");
}

const seoTips = [
  "Keep your title tag between 50-60 characters for optimal display in search results.",
  "Write meta descriptions of 150-160 characters that include your target keyword.",
  "Use unique title and description tags for every page on your site.",
  "Include your primary keyword near the beginning of your title tag.",
  "Always set a canonical URL to prevent duplicate content issues.",
  "Use descriptive, keyword-rich Open Graph titles for better social sharing.",
];

const faqs = [
  {
    question: "What are meta tags and why are they important?",
    answer:
      "Meta tags are HTML elements that provide metadata about a web page. They help search engines understand your content and influence how your page appears in search results and social media shares.",
  },
  {
    question: "How long should my meta title be?",
    answer:
      "Google typically displays the first 50-60 characters of a title tag. Keep your titles concise, descriptive, and include your primary keyword.",
  },
  {
    question: "What is the optimal meta description length?",
    answer:
      "Meta descriptions should be between 150-160 characters. Google may show up to 160 characters, but shorter descriptions are more likely to be displayed in full.",
  },
  {
    question: "What are Open Graph tags?",
    answer:
      "Open Graph tags control how your content appears when shared on social media platforms like Facebook and LinkedIn. They specify the title, description, image, and URL for shared links.",
  },
  {
    question: "Do meta keywords still matter for SEO?",
    answer:
      "Google has officially stated they do not use the meta keywords tag for ranking purposes. However, some other search engines may still consider them. Including relevant keywords won't hurt.",
  },
];

export function MetaTagGeneratorTool({ dict }: { dict?: any }) {
  const [state, setState] = useState<MetaState>(defaultState);
  const [output, setOutput] = useState("");
  const { showAd } = useAd();
  
  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.meta_tag_generator || {};
  
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const update = (key: keyof MetaState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setOutput("");
  };

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">{t.basic || "Basic"}</TabsTrigger>
          <TabsTrigger value="opengraph">{t.openGraph || "Open Graph"}</TabsTrigger>
          <TabsTrigger value="twitter">{t.twitterCard || "Twitter Card"}</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.basicTitle || "Basic Meta Tags"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">{t.titleLabel || "Title"}</Label>
                  <Input
                    id="meta-title"
                    placeholder={t.titlePlaceholder || "My Website Title"}
                    value={state.title}
                    onChange={(e) => update("title", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {state.title.length}/60 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-canonical">{t.canonicalLabel || "Canonical URL"}</Label>
                  <Input
                    id="meta-canonical"
                    placeholder={t.canonicalPlaceholder || "https://example.com/page"}
                    value={state.canonicalUrl}
                    onChange={(e) => update("canonicalUrl", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">{t.descriptionLabel || "Description"}</Label>
                <Textarea
                  id="meta-description"
                  placeholder={t.descriptionPlaceholder || "A brief description of your page..."}
                  value={state.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {state.description.length}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">{t.keywordsLabel || "Keywords"}</Label>
                <Input
                  id="meta-keywords"
                  placeholder={t.keywordsPlaceholder || "seo, tools, generator"}
                  value={state.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meta-robots">{t.robotsLabel || "Robots"}</Label>
                  <Select
                    value={state.robots}
                    onValueChange={(v) => update("robots", v)}
                  >
                    <SelectTrigger id="meta-robots">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index, follow">index, follow</SelectItem>
                      <SelectItem value="noindex, follow">noindex, follow</SelectItem>
                      <SelectItem value="index, nofollow">index, nofollow</SelectItem>
                      <SelectItem value="noindex, nofollow">noindex, nofollow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-theme-color">Theme Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={state.themeColor}
                      onChange={(e) => update("themeColor", e.target.value)}
                      className="h-10 w-10 cursor-pointer rounded border border-border"
                    />
                    <Input
                      id="meta-theme-color"
                      value={state.themeColor}
                      onChange={(e) => update("themeColor", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opengraph" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.openGraph || "Open Graph Tags"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="og-title">{t.ogTitleLabel || "OG Title"}</Label>
                  <Input
                    id="og-title"
                    placeholder={t.ogTitlePlaceholder || "Leave empty to use page title"}
                    value={state.ogTitle}
                    onChange={(e) => update("ogTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="og-type">{t.ogTypeLabel || "OG Type"}</Label>
                  <Select
                    value={state.ogType}
                    onValueChange={(v) => update("ogType", v)}
                  >
                    <SelectTrigger id="og-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">website</SelectItem>
                      <SelectItem value="article">article</SelectItem>
                      <SelectItem value="product">product</SelectItem>
                      <SelectItem value="profile">profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-description">{t.ogDescriptionLabel || "OG Description"}</Label>
                <Textarea
                  id="og-description"
                  placeholder={t.ogDescriptionPlaceholder || "Leave empty to use page description"}
                  value={state.ogDescription}
                  onChange={(e) => update("ogDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="og-url">{t.ogUrlLabel || "OG URL"}</Label>
                  <Input
                    id="og-url"
                    placeholder={t.ogUrlPlaceholder || "https://example.com"}
                    value={state.ogUrl}
                    onChange={(e) => update("ogUrl", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="og-site-name">{t.siteNameLabel || "Site Name"}</Label>
                  <Input
                    id="og-site-name"
                    placeholder={t.siteNamePlaceholder || "My Website"}
                    value={state.ogSiteName}
                    onChange={(e) => update("ogSiteName", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="og-image">{t.ogImageLabel || "OG Image URL"}</Label>
                <Input
                  id="og-image"
                  placeholder={t.ogImagePlaceholder || "https://example.com/image.jpg"}
                  value={state.ogImage}
                  onChange={(e) => update("ogImage", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.twitterCard || "Twitter Card Tags"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="twitter-card">{t.cardTypeLabel || "Card Type"}</Label>
                  <Select
                    value={state.twitterCard}
                    onValueChange={(v) => update("twitterCard", v)}
                  >
                    <SelectTrigger id="twitter-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="summary_large_image">
                        Summary with Large Image
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter-site">{t.twitterSiteLabel || "@username"}</Label>
                  <Input
                    id="twitter-site"
                    placeholder={t.twitterSitePlaceholder || "@yourusername"}
                    value={state.twitterSite}
                    onChange={(e) => update("twitterSite", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-title">{t.twitterTitleLabel || "Twitter Title"}</Label>
                <Input
                  id="twitter-title"
                  placeholder={t.twitterTitlePlaceholder || "Leave empty to use page title"}
                  value={state.twitterTitle}
                  onChange={(e) => update("twitterTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-description">{t.twitterDescriptionLabel || "Twitter Description"}</Label>
                <Textarea
                  id="twitter-description"
                  placeholder={t.twitterDescriptionPlaceholder || "Leave empty to use page description"}
                  value={state.twitterDescription}
                  onChange={(e) => update("twitterDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-image">{t.twitterImageLabel || "Twitter Image URL"}</Label>
                <Input
                  id="twitter-image"
                  placeholder={t.twitterImagePlaceholder || "Leave empty to use OG image"}
                  value={state.twitterImage}
                  onChange={(e) => update("twitterImage", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button
        onClick={() => {
          if (!state.title.trim() && !state.description.trim()) {
            toast.error(t.errorEmpty || "Please enter a title or description first");
            return;
          }
          showAd(() => {
            setOutput(generateHTML(state));
            toast.success(t.successGen || "Meta Tags generated successfully!");
          });
        }}
        size="lg"
        className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-6"
      >
        <Sparkles className="h-5 w-5" /> {t.generateBtn || "Generate Meta Tags"}
      </Button>

      {/* Live Preview */}
      {state.title && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">{t.googlePreview || "Google Search Preview"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-white p-4 dark:bg-zinc-950">
              <p className="text-sm text-green-700 dark:text-green-500 truncate">
                {state.canonicalUrl || "https://example.com"}
              </p>
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer truncate">
                {state.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {state.description || t.noDescription || "No description provided."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Output */}
      {output && (
        <div className="mt-6 space-y-4">
          <CodePreview code={output} language="html" label={t.generatedHtml || "Generated HTML"} />
          <div className="flex flex-wrap gap-2">
            <CopyButton text={output} label={ui.copy || "Copy HTML"} />
            <DownloadButton
              content={output}
              filename="meta-tags.html"
              mimeType="text/html"
              label={ui.download || "Download HTML"}
            />
            <ResetButton onReset={() => { setState(defaultState); setOutput(""); }} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
