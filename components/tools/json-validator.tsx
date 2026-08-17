"use client";

import { useState } from "react";
import { Braces, CheckCircle2, AlertTriangle, Copy, WrapText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("json-validator")!;

const seoTips = [
  "Always validate API responses before processing them to prevent runtime errors.",
  "Use a JSON linter in your CI/CD pipeline to catch errors before deployment.",
  "Trailing commas and comments are not valid in standard JSON — use JSON5 for those.",
  "JSON keys must always be wrapped in double quotes, not single quotes.",
  "Deeply nested JSON can impact performance — consider flattening structures where possible.",
];

const faqs = [
  { question: "What is the difference between JSON and JSON5?", answer: "JSON5 is a superset of JSON that allows comments, trailing commas, and single-quoted strings. Standard JSON strictly does not allow any of these." },
  { question: "Why does my JSON fail validation?", answer: "Common issues include: missing commas between properties, trailing commas, using single quotes instead of double quotes, unescaped special characters in strings, and comments." },
  { question: "Can I validate a JSON file here?", answer: "Yes. Simply open your JSON file in a text editor, copy all the content, and paste it into the text area above." },
];

interface ValidationError {
  message: string;
  position?: number;
}

function validateAndFormat(text: string): { valid: boolean; formatted?: string; error?: ValidationError; stats?: { keys: number; depth: number } } {
  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);
    // Count keys and depth
    let maxDepth = 0;
    let keyCount = 0;
    const countRecursive = (obj: any, depth: number) => {
      if (depth > maxDepth) maxDepth = depth;
      if (typeof obj === "object" && obj !== null) {
        for (const key of Object.keys(obj)) {
          keyCount++;
          countRecursive(obj[key], depth + 1);
        }
      }
    };
    countRecursive(parsed, 0);
    return { valid: true, formatted, stats: { keys: keyCount, depth: maxDepth } };
  } catch (e: any) {
    // Try to extract position from error message
    const match = e.message.match(/position (\d+)/);
    const pos = match ? parseInt(match[1]) : undefined;
    return { valid: false, error: { message: e.message, position: pos } };
  }
}

export function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validateAndFormat> | null>(null);

  const validate = () => {
    if (!input.trim()) { toast.error("Please paste some JSON first."); return; }
    const r = validateAndFormat(input);
    setResult(r);
    if (r.valid) toast.success("Valid JSON!");
    else toast.error("Invalid JSON — see error below.");
  };

  const copyFormatted = () => {
    if (result?.formatted) {
      navigator.clipboard.writeText(result.formatted);
      toast.success("Formatted JSON copied!");
    }
  };

  const useFormatted = () => {
    if (result?.formatted) { setInput(result.formatted); toast.success("Input updated with formatted JSON."); }
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Braces className="h-5 w-5 text-violet-500" /> Paste Your JSON</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setResult(null); }}
              placeholder={'{\n  "name": "John Doe",\n  "age": 30,\n  "isActive": true\n}'}
              className="min-h-[220px] font-mono text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={validate} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90">
                <Braces className="h-4 w-4 mr-2" /> Validate JSON
              </Button>
              <ResetButton onReset={() => { setInput(""); setResult(null); }} />
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`border-2 ${result.valid ? "border-green-400 dark:border-green-600" : "border-red-400 dark:border-red-600"}`}>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {result.valid
                  ? <><CheckCircle2 className="h-5 w-5 text-green-500" /> Valid JSON</>
                  : <><AlertTriangle className="h-5 w-5 text-red-500" /> Invalid JSON</>
                }
              </CardTitle>
              {result.valid && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyFormatted}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
                  <Button size="sm" variant="outline" onClick={useFormatted}><WrapText className="h-3.5 w-3.5 mr-1" /> Format</Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {result.valid && result.stats && (
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <span>✅ Well-formed JSON</span>
                  <span>🔑 {result.stats.keys} keys found</span>
                  <span>📐 Max depth: {result.stats.depth}</span>
                </div>
              )}
              {!result.valid && result.error && (
                <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 font-mono text-sm text-red-600 dark:text-red-400">
                  <p className="font-semibold mb-1">Syntax Error:</p>
                  <p>{result.error.message}</p>
                  {result.error.position !== undefined && (
                    <p className="mt-2 text-xs opacity-80">Near character position: {result.error.position}</p>
                  )}
                </div>
              )}
              {result.valid && result.formatted && (
                <pre className="text-xs font-mono bg-muted/50 rounded-lg p-3 overflow-auto max-h-64">{result.formatted}</pre>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
