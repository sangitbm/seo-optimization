"use client";

import { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { useAd } from "@/components/providers/ad-provider";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("favicon-generator")!;

const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

const seoTips = [
  "Include both favicon.ico and PNG favicons for maximum browser compatibility.",
  "Apple Touch icons (180x180) are essential for iOS home screen bookmarks.",
  "Use a 512x512 PNG for PWA manifest icons.",
  "Ensure your favicon looks clear at small sizes — simple designs work best.",
];

const faqs = [
  { question: "What is a favicon?", answer: "A favicon is a small icon that appears in browser tabs, bookmarks, and history. It helps users identify your website visually." },
  { question: "What sizes do I need?", answer: "At minimum, include 16x16, 32x32, and 180x180 (Apple Touch Icon). For PWA support, also include 192x192 and 512x512." },
];

function generateHTMLSnippet(): string {
  return `<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;
}

export function FaviconGeneratorTool({ dict }: { dict?: any }) {
  const [image, setImage] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ size: number; dataUrl: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const { showAd } = useAd();

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.favicon_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImage(src);
      setPreviews([]);
    };
    reader.readAsDataURL(file);
  };

  const downloadSingle = (dataUrl: string, size: number) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
    toast.success(`favicon-${size}x${size}.png downloaded!`);
  };

  const downloadAll = async () => {
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      for (const p of previews) {
        const base64 = p.dataUrl.split(",")[1];
        const name = p.size === 180 ? "apple-touch-icon.png" :
          p.size === 192 ? "android-chrome-192x192.png" :
          p.size === 512 ? "android-chrome-512x512.png" :
          `favicon-${p.size}x${p.size}.png`;
        zip.file(name, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "favicons.zip";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("favicons.zip downloaded!");
    } catch {
      toast.error("Failed to generate ZIP file. Please try downloading individually.");
    }
  };

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader><CardTitle className="text-lg">{t.configTitle || "Upload Image"}</CardTitle></CardHeader>
        <CardContent>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-12 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            {image ? (
              <img src={image} alt="Uploaded" className="h-24 w-24 rounded-lg object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="text-center">
              <p className="font-medium">{image ? (t.changeImage || "Click to change image") : (t.uploadImage || "Click to upload an image")}</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, SVG — {t.anySize || "any size"}</p>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <Button
            onClick={() => {
              if (!image) {
                fileRef.current?.click();
                return;
              }
              showAd(() => {
                const img = new window.Image();
                img.onload = () => {
                  const results: { size: number; dataUrl: string }[] = [];
                  for (const size of SIZES) {
                    const canvas = document.createElement("canvas");
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(img, 0, 0, size, size);
                    results.push({ size, dataUrl: canvas.toDataURL("image/png") });
                  }
                  setPreviews(results);
                  toast.success("Favicons generated in multiple sizes!");
                };
                img.src = image;
              });
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <ImageIcon className="h-5 w-5" /> {image ? (t.generateBtn || "Generate Favicons") : (t.uploadBtn || "Upload Image to Generate Favicons")}
          </Button>
        </CardContent>
      </Card>

      {previews.length > 0 && (
        <>
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t.previewTitle || "Generated Favicons"}</CardTitle>
              <Button onClick={downloadAll} className="gap-2">
                <Download className="h-4 w-4" /> {t.downloadZip || "Download ZIP"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {previews.map((p) => (
                  <div
                    key={p.size}
                    onClick={() => downloadSingle(p.dataUrl, p.size)}
                    className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:border-violet-500/50"
                  >
                    <div className="flex items-center justify-center" style={{ width: Math.min(p.size, 64), height: Math.min(p.size, 64) }}>
                      <img src={p.dataUrl} alt={`${p.size}x${p.size}`} className="max-h-full max-w-full" style={{ imageRendering: p.size < 32 ? "pixelated" : "auto" }} />
                    </div>
                    <p className="text-xs font-medium">{p.size}×{p.size}</p>
                    <p className="text-xs text-muted-foreground">{t.clickDownload || "Click to download"}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            <CodePreview code={generateHTMLSnippet()} language="html" label={t.generatedCode || "HTML to add in <head>"} />
            <div className="flex gap-2">
              <CopyButton text={generateHTMLSnippet()} label={ui.copy || "Copy HTML"} />
              <ResetButton onReset={() => { setImage(null); setPreviews([]); }} />
            </div>
          </div>
        </>
      )}
    </ToolLayout>
  );
}
