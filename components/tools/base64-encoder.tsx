"use client";

import { useState } from "react";
import { Binary, Copy, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("base64-encoder")!;

const seoTips = [
  "Base64 encoding increases data size by ~33% — avoid using it for large binary files.",
  "Base64 is encoding, NOT encryption — never use it to hide sensitive data.",
  "API Basic Authentication headers use Base64: 'Authorization: Basic base64(user:pass)'.",
  "Data URIs for small images use Base64: 'data:image/png;base64,...'",
  "URL-safe Base64 replaces '+' with '-' and '/' with '_' to be safe in query parameters.",
];

const faqs = [
  { question: "Is Base64 a form of encryption?", answer: "No. Base64 is encoding, not encryption. Anyone can decode it instantly. It is used to represent binary data as ASCII text, not to hide information." },
  { question: "What is URL-safe Base64?", answer: "Standard Base64 uses '+' and '/' which are special characters in URLs. URL-safe Base64 replaces them with '-' and '_' to safely include the value in a URL or query parameter." },
  { question: "Why is Base64 used in APIs?", answer: "APIs often transmit data as text (JSON). Base64 lets you include binary data like images or files in a text-based JSON payload without corruption." },
];

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    if (!input.trim()) { toast.error("Please enter some text first."); return; }
    try {
      if (mode === "encode") {
        let result = btoa(unescape(encodeURIComponent(input)));
        if (urlSafe) result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        setOutput(result);
        toast.success("Encoded to Base64!");
      } else {
        let src = input.trim();
        if (urlSafe) src = src.replace(/-/g, "+").replace(/_/g, "/");
        const result = decodeURIComponent(escape(atob(src)));
        setOutput(result);
        toast.success("Decoded from Base64!");
      }
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string. Make sure the input is a valid Base64-encoded value." : "Failed to encode. Make sure the input is valid text.");
      setOutput("");
    }
  };

  const swap = () => {
    setMode(m => m === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError("");
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setMode("encode"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? "bg-violet-600 text-white shadow" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >Encode (Text → Base64)</button>
          <button
            onClick={() => { setMode("decode"); setOutput(""); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? "bg-violet-600 text-white shadow" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >Decode (Base64 → Text)</button>
          <label className="ml-4 flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={urlSafe} onChange={e => setUrlSafe(e.target.checked)} className="rounded" />
            URL-safe
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">{mode === "encode" ? "Plain Text Input" : "Base64 Input"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
                placeholder={mode === "encode" ? "Hello, World!" : "SGVsbG8sIFdvcmxkIQ=="}
                className="min-h-[180px] font-mono text-sm"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex gap-2">
                <Button onClick={process} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90">
                  <Binary className="h-4 w-4 mr-2" /> {mode === "encode" ? "Encode" : "Decode"}
                </Button>
                {output && <Button variant="outline" onClick={swap}><ArrowRightLeft className="h-4 w-4 mr-2" /> Swap</Button>}
                <ResetButton onReset={() => { setInput(""); setOutput(""); setError(""); }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">{mode === "encode" ? "Base64 Output" : "Plain Text Output"}</CardTitle>
              {output && <Button size="sm" variant="outline" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>}
            </CardHeader>
            <CardContent>
              {output
                ? <Textarea value={output} readOnly className="min-h-[180px] font-mono text-sm bg-muted/40" />
                : <div className="flex items-center justify-center min-h-[180px] text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg">Output will appear here</div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
