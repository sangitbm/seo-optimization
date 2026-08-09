"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { useAd } from "@/components/providers/ad-provider";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("meta-tag-preview")!;

/** Safely extracts the hostname from a user-supplied URL without throwing. */
function safeHostname(raw: string): string {
  try {
    return new URL(raw.startsWith("http") ? raw : `https://${raw}`).hostname;
  } catch {
    return "example.com";
  }
};

const seoTips = [
  "Google typically shows 50-60 characters for titles and 150-160 for descriptions.",
  "Facebook and Twitter may truncate titles and descriptions differently.",
  "Use compelling, action-oriented descriptions that encourage clicks.",
];

const faqs = [
  { question: "How does Google display my page?", answer: "Google shows a blue clickable title (50-60 chars), green URL, and gray description (up to 160 chars). Your actual display may vary based on Google's algorithms." },
  { question: "Can I control what Facebook shows?", answer: "Yes! Use Open Graph meta tags (og:title, og:description, og:image) to control how your content appears when shared on Facebook." },
];

export function MetaTagPreviewTool({ dict }: { dict?: any }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState({ title: "", description: "", url: "", image: "" });
  const { showAd } = useAd();

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.meta_tag_preview || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader><CardTitle className="text-lg">{t.configTitle || "Page Information"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.titleLabel || "Title"}</Label>
            <Input placeholder="My Awesome Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <p className="text-xs text-muted-foreground">{title.length}/60 characters</p>
          </div>
          <div className="space-y-2">
            <Label>{t.descLabel || "Description"}</Label>
            <Textarea placeholder="A compelling description of your page..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            <p className="text-xs text-muted-foreground">{description.length}/160 characters</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t.urlLabel || "URL"}</Label>
              <Input placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t.imageLabel || "Image URL (for social)"}</Label>
              <Input placeholder="https://example.com/image.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
          </div>
          <Button
            onClick={() => {
              if (!title.trim() && !description.trim()) {
                toast.error(t.errorEmpty || "Please enter a title or description first");
                return;
              }
              showAd(() => {
                setPreview({ title, description, url, image });
                toast.success(t.successUpdate || "Previews updated successfully!");
              });
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <Eye className="h-5 w-5" /> {t.previewTitle || "Preview Meta Tags"}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="google" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
        </TabsList>

        <TabsContent value="google" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Google Search Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-5">
                {/* Desktop */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t.desktopTab || "Desktop"}</p>
                  <div className="rounded-lg border border-border bg-white p-4 dark:bg-zinc-950 max-w-xl">
                    <p className="text-sm text-green-700 dark:text-green-500 truncate">{preview.url || "https://example.com"}</p>
                    <h3 className="text-xl font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer truncate">{preview.title || "Page Title"}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{preview.description || "Page description will appear here..."}</p>
                  </div>
                </div>
                {/* Mobile */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t.mobileTab || "Mobile"}</p>
                  <div className="rounded-lg border border-border bg-white p-3 dark:bg-zinc-950 max-w-sm">
                    <p className="text-xs text-green-700 dark:text-green-500 truncate">{preview.url || "https://example.com"}</p>
                    <h3 className="text-base font-medium text-blue-700 dark:text-blue-400 truncate">{preview.title || "Page Title"}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{preview.description || "Page description..."}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facebook" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Facebook Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="max-w-lg overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900">
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground">
                  {preview.image ? "Image Preview" : "No image set"}
                </div>
                <div className="p-3">
                  <p className="text-xs uppercase text-gray-500 tracking-wide">{preview.url ? safeHostname(preview.url) : "example.com"}</p>
                  <p className="font-semibold text-sm mt-1">{preview.title || "Page Title"}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{preview.description || "Description"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="twitter" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Twitter Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="max-w-lg overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900">
                <div className="aspect-[2/1] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground">
                  {preview.image ? "Image Preview" : "No image set"}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">{preview.url ? safeHostname(preview.url) : "example.com"}</p>
                  <p className="font-medium text-sm">{preview.title || "Page Title"}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{preview.description || "Description"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <ResetButton onReset={() => { setTitle(""); setDescription(""); setUrl(""); setImage(""); setPreview({ title: "", description: "", url: "", image: "" }); }} />
      </div>
    </ToolLayout>
  );
}
