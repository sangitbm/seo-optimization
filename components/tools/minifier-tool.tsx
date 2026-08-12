"use client";

import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";

import type { Tool } from "@/lib/tools-data";
import { toast } from "sonner";

interface MinifierProps {
  tool: Tool;
  language: string;
  fileExtension: string;
  mimeType: string;
  placeholder: string;
  minify: (input: string) => string;
  beautify: (input: string) => string;
  seoTips: string[];
  faqs: { question: string; answer: string }[];
  dict?: any;
}

export function MinifierTool({
  tool,
  language,
  fileExtension,
  mimeType,
  placeholder,
  minify,
  beautify,
  seoTips,
  faqs,
  dict,
}: MinifierProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify">("minify");


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.[tool.slug.replace(/-/g, '_')] || {};

  const inputSize = new Blob([input]).size;
  const outputSize = output ? new Blob([output]).size : 0;
  const savings = inputSize > 0 ? (((inputSize - outputSize) / inputSize) * 100).toFixed(1) : "0";

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t.inputLabel || `Input ${language.toUpperCase()}`}</CardTitle>
            <Tabs value={mode} onValueChange={(v) => setMode(v as "minify" | "beautify")}>
              <TabsList>
                <TabsTrigger value="minify">Minify</TabsTrigger>
                <TabsTrigger value="beautify">Beautify</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={input} onChange={(e) => { setInput(e.target.value); setOutput(""); }} placeholder={placeholder} rows={12} className="font-mono text-sm" />
          <Button
            onClick={() => {
              if (!input.trim()) {
                toast.error(t.errorEmpty || "Please paste some code first");
                return;
              }
              setOutput(mode === "minify" ? minify(input) : beautify(input));
              toast.success(mode === "minify" ? (t.successMinify || "Code minified successfully!") : (t.successBeautify || "Code beautified successfully!"));
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95"
          >
            {mode === "minify" ? <Zap className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {mode === "minify" ? (t.minifyBtn || `Minify ${language.toUpperCase()}`) : `Beautify ${language.toUpperCase()}`}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <div className="mt-6 space-y-4">
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">Input: {inputSize} bytes</Badge>
            <Badge variant="secondary">Output: {outputSize} bytes</Badge>
            {mode === "minify" && (
              <Badge className="bg-green-600/10 text-green-600 dark:text-green-400">
                Saved: {savings}%
              </Badge>
            )}
          </div>

          <CodePreview code={output} language={language} label={`${mode === "minify" ? (t.outputLabel || "Minified") : "Beautified"} Output`} />

          <div className="flex flex-wrap gap-2">
            <CopyButton text={output} label={ui.copy || "Copy"} />
            <DownloadButton content={output} filename={`output.${fileExtension}`} mimeType={mimeType} label={ui.download || `Download .${fileExtension}`} />
            <ResetButton onReset={() => { setInput(""); setOutput(""); }} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
