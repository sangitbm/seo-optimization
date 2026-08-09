"use client";

import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Image as ImageIcon } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { useAd } from "@/components/providers/ad-provider";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("open-graph-generator")!;

interface OGState {
  title: string;
  subtitle: string;
  bgColor1: string;
  bgColor2: string;
  textColor: string;
  gradientDir: string;
}

const defaultState: OGState = {
  title: "My Awesome Page",
  subtitle: "A brief description of this page",
  bgColor1: "#6d28d9",
  bgColor2: "#4f46e5",
  textColor: "#ffffff",
  gradientDir: "to right",
};

const seoTips = [
  "Open Graph images should be 1200x630 pixels for optimal display on Facebook and LinkedIn.",
  "Keep critical text centered — some platforms crop edges on mobile displays.",
  "Use high contrast text against backgrounds so titles are readable in small feed previews.",
  "Test your generated image using the Facebook Sharing Debugger or LinkedIn Post Inspector.",
];

const faqs = [
  { question: "What is an Open Graph image?", answer: "An Open Graph image is the preview image displayed when a webpage is shared on social networks like Facebook, LinkedIn, Discord, and Twitter." },
  { question: "Can I use these images commercially?", answer: "Yes! All generated images are created entirely in your browser and are free for commercial use." },
];

export function OpenGraphGeneratorTool({ dict }: { dict?: any }) {
  const [state, setState] = useState<OGState>(defaultState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showAd } = useAd();

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.open_graph_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const update = (key: keyof OGState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // Background gradient
    const grad = state.gradientDir === "to right"
      ? ctx.createLinearGradient(0, 0, 1200, 0)
      : state.gradientDir === "to bottom"
      ? ctx.createLinearGradient(0, 0, 0, 630)
      : ctx.createLinearGradient(0, 0, 1200, 630);

    grad.addColorStop(0, state.bgColor1);
    grad.addColorStop(1, state.bgColor2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Title
    ctx.fillStyle = state.textColor;
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";

    const words = state.title.split(" ");
    let line = "";
    const lines: string[] = [];
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > 1000 && line !== "") {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = test;
      }
    }
    lines.push(line.trim());

    const startY = 315 - ((lines.length - 1) * 75) / 2 - (state.subtitle ? 30 : 0);
    lines.forEach((l, i) => {
      ctx.fillText(l, 600, startY + i * 75);
    });

    // Subtitle
    if (state.subtitle) {
      ctx.fillStyle = state.textColor;
      ctx.font = "32px sans-serif";
      ctx.globalAlpha = 0.8;
      ctx.fillText(state.subtitle, 600, startY + lines.length * 75 + 20);
      ctx.globalAlpha = 1;
    }
  }, [state]);

  const exportPNG = () => {
    showAd(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "og-image.png";
      a.click();
      toast.success(ui.download || "OG Image exported!");
    });
  };

  // Draw on mount
  useState(() => {
    setTimeout(drawCanvas, 100);
  });

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.configTitle || "Image Settings"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.titleLabel || "Title"}</Label>
              <Input value={state.title} onChange={(e) => { update("title", e.target.value); setTimeout(drawCanvas, 50); }} className="h-12 text-base" />
            </div>
            <div className="space-y-2">
              <Label>{t.subtitleLabel || "Subtitle (optional)"}</Label>
              <Input value={state.subtitle} onChange={(e) => { update("subtitle", e.target.value); setTimeout(drawCanvas, 50); }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.color1 || "Color 1"}</Label>
                <div className="flex gap-2">
                  <input type="color" value={state.bgColor1} onChange={(e) => { update("bgColor1", e.target.value); setTimeout(drawCanvas, 50); }} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={state.bgColor1} onChange={(e) => { update("bgColor1", e.target.value); setTimeout(drawCanvas, 50); }} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t.color2 || "Color 2"}</Label>
                <div className="flex gap-2">
                  <input type="color" value={state.bgColor2} onChange={(e) => { update("bgColor2", e.target.value); setTimeout(drawCanvas, 50); }} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={state.bgColor2} onChange={(e) => { update("bgColor2", e.target.value); setTimeout(drawCanvas, 50); }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.textColor || "Text Color"}</Label>
                <div className="flex gap-2">
                  <input type="color" value={state.textColor} onChange={(e) => { update("textColor", e.target.value); setTimeout(drawCanvas, 50); }} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={state.textColor} onChange={(e) => { update("textColor", e.target.value); setTimeout(drawCanvas, 50); }} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t.gradientDir || "Gradient Direction"}</Label>
                <Select value={state.gradientDir} onValueChange={(v) => { update("gradientDir", v); setTimeout(drawCanvas, 50); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to right">Left → Right</SelectItem>
                    <SelectItem value="to bottom">Top → Bottom</SelectItem>
                    <SelectItem value="to bottom right">Diagonal ↘</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => {
                showAd(() => {
                  drawCanvas();
                  toast.success(t.successGenerate || "OG Image generated!");
                });
              }}
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
            >
              <ImageIcon className="h-5 w-5" /> {t.generateBtn || "Generate Open Graph Image"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.previewTitle || "Preview"} (1200×630)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border">
                <canvas ref={canvasRef} className="w-full h-auto" style={{ aspectRatio: "1200/630" }} />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button onClick={exportPNG} className="gap-2">
              <Download className="h-4 w-4" /> {ui.download || "Export"} PNG
            </Button>
            <ResetButton onReset={() => { setState(defaultState); setTimeout(drawCanvas, 50); }} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
