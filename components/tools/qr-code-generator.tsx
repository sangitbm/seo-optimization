"use client";

import { useState, useEffect, useRef } from "react";
import { Download, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("qr-code-generator")!;

const seoTips = [
  "QR codes on printed materials should be at least 2cm x 2cm for reliable scanning.",
  "Test your QR code with multiple smartphone cameras and scanning apps before publishing.",
  "High contrast between foreground (dark) and background (light) ensures faster scanning.",
  "Use URL shorteners if encoding long URLs — simpler QR codes scan more easily.",
  "Add UTM tracking parameters to your URL to measure offline-to-online conversion traffic.",
];

const faqs = [
  { question: "Are these QR codes free for commercial use?", answer: "Yes! All generated QR codes are static and completely free for personal and commercial use without expiration." },
  { question: "What formats can I download?", answer: "You can download QR codes as PNG (raster) for web use or SVG (vector) for print use at any size without quality loss." },
];

export function QRCodeGeneratorTool() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("256");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrSvg, setQrSvg] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text) {
      setQrDataUrl("");
      setQrSvg("");
      return;
    }
    try {
      const QRCode = (await import("qrcode")).default;
      const sizeNum = parseInt(size);

      // Generate PNG data URL
      const dataUrl = await QRCode.toDataURL(text, {
        width: sizeNum,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);

      // Generate SVG string
      const svgStr = await QRCode.toString(text, {
        type: "svg",
        width: sizeNum,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      });
      setQrSvg(svgStr);
    } catch {
      toast.error("Failed to generate QR code");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(generateQR, 200);
    return () => clearTimeout(timeout);
  }, [text, size, fgColor, bgColor]);

  const handleGenerateClick = async () => {
    await generateQR();
    toast.success("QR Code generated!");
  };

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
    toast.success("QR code PNG downloaded!");
  };

  const downloadSVG = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("QR code SVG downloaded!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">QR Code Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>URL or Text</Label>
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" className="h-12 text-base" />
            </div>
            <div className="space-y-2">
              <Label>Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">128 × 128</SelectItem>
                  <SelectItem value="256">256 × 256</SelectItem>
                  <SelectItem value="512">512 × 512</SelectItem>
                  <SelectItem value="1024">1024 × 1024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground Color</Label>
                <div className="flex gap-2">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                </div>
              </div>
            </div>
            <Button
              onClick={handleGenerateClick}
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
            >
              <QrCode className="h-5 w-5" /> Generate QR Code
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Preview</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="rounded-lg" style={{ width: Math.min(parseInt(size), 300), height: Math.min(parseInt(size), 300) }} />
              ) : (
                <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
                  Enter text to generate
                </div>
              )}
            </CardContent>
          </Card>
          {qrDataUrl && (
            <div className="flex flex-wrap gap-2">
              <Button onClick={downloadPNG} className="gap-2">
                <Download className="h-4 w-4" /> Download PNG
              </Button>
              <Button onClick={downloadSVG} variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Download SVG
              </Button>
              <ResetButton onReset={() => { setText(""); setQrDataUrl(""); setQrSvg(""); }} />
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
