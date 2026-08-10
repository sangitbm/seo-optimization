"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { RefreshCw, Code, CheckCircle2, XCircle } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";

export function JsonFormatter() {
  const tool = getToolBySlug("json-formatter")!;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError("");
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <ToolLayout tool={tool} seoTips={[]} faqs={[]}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-input" className="text-base font-semibold">
              Input JSON
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setInput(""); setOutput(""); setError(""); }}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-1.5 h-3 w-3" />
              Clear
            </Button>
          </div>
          
          <Textarea
            id="json-input"
            placeholder='{"hello": "world"}'
            className="min-h-[400px] font-mono text-sm p-4 resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="indent" className="text-sm">Indent:</Label>
              <select
                id="indent"
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>
            
            <Button onClick={formatJson} className="flex-1 bg-violet-600 hover:bg-violet-700">
              <Code className="mr-2 h-4 w-4" />
              Format / Validate
            </Button>
            
            <Button onClick={minifyJson} variant="outline" className="flex-1">
              Minify
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Output
            </Label>
            {error ? (
              <span className="flex items-center text-sm font-medium text-red-500">
                <XCircle className="mr-1 h-4 w-4" />
                Invalid JSON
              </span>
            ) : output ? (
              <span className="flex items-center text-sm font-medium text-green-500">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Valid JSON
              </span>
            ) : null}
          </div>

          <div className="relative min-h-[400px] rounded-md border border-input bg-muted/30">
            {error ? (
              <div className="absolute inset-0 p-4 font-mono text-sm text-red-500 break-all overflow-auto">
                {error}
              </div>
            ) : (
              <Textarea
                readOnly
                value={output}
                className="min-h-[400px] h-full font-mono text-sm p-4 border-0 bg-transparent resize-y"
                placeholder="Formatted JSON will appear here..."
              />
            )}
            
            {output && !error && (
              <div className="absolute top-2 right-2">
                <CopyButton text={output} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
