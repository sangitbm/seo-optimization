"use client";

import { useState } from "react";
import { ListTree, Copy, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("json-schema-generator")!;

const seoTips = [
  "JSON Schema is the standard way to describe and validate the structure of JSON data.",
  "Use 'required' arrays in your schema to enforce mandatory fields in API requests.",
  "JSON Schema Draft-07 is the most widely supported version across libraries and tools.",
  "Adding 'description' fields to your schema properties doubles as API documentation.",
  "Use 'additionalProperties: false' to reject JSON with extra, unexpected fields.",
];

const faqs = [
  { question: "What is JSON Schema?", answer: "JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It defines what properties an object should have, their types, and constraints like minimum/maximum values." },
  { question: "What schema draft does this generate?", answer: "This tool generates JSON Schema Draft-07, which is the most widely supported version in validation libraries like ajv, jsonschema (Python), and popular API tools." },
  { question: "Can I use this for OpenAPI/Swagger specs?", answer: "Yes! OpenAPI 3.x uses a subset of JSON Schema for its component schemas. The output from this tool is compatible and can be used directly in your OpenAPI spec." },
];

function inferType(value: any): any {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    const itemSchema = inferType(value[0]);
    return { type: "array", items: itemSchema };
  }
  const t = typeof value;
  if (t === "object") {
    const props: Record<string, any> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(value)) {
      props[k] = inferType(v);
      required.push(k);
    }
    return { type: "object", properties: props, required };
  }
  if (t === "number") return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
  return { type: t };
}

function generateSchema(json: any): object {
  const base = inferType(json);
  return {
    "$schema": "http://json-schema.org/draft-07/schema#",
    ...base,
  };
}

export function JsonSchemaGenerator() {
  const [input, setInput] = useState("");
  const [schema, setSchema] = useState("");
  const [error, setError] = useState("");

  const generate = () => {
    setError(""); setSchema("");
    if (!input.trim()) { toast.error("Please paste a JSON object first."); return; }
    try {
      const parsed = JSON.parse(input);
      const result = generateSchema(parsed);
      setSchema(JSON.stringify(result, null, 2));
      toast.success("JSON Schema generated!");
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      toast.error("Invalid JSON input.");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(schema);
    toast.success("Schema copied to clipboard!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ListTree className="h-5 w-5 text-violet-500" /> Input JSON</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setSchema(""); setError(""); }}
              placeholder={'{\n  "id": 1,\n  "name": "John Doe",\n  "email": "john@example.com",\n  "isActive": true,\n  "score": 4.5\n}'}
              className="min-h-[300px] font-mono text-sm"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={generate} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90">
                <Wand2 className="h-4 w-4 mr-2" /> Generate Schema
              </Button>
              <ResetButton onReset={() => { setInput(""); setSchema(""); setError(""); }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2"><ListTree className="h-5 w-5 text-green-500" /> Generated Schema</CardTitle>
            {schema && <Button size="sm" variant="outline" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>}
          </CardHeader>
          <CardContent>
            {schema
              ? <pre className="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-auto min-h-[300px]">{schema}</pre>
              : <div className="flex items-center justify-center min-h-[300px] text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg">Generated schema will appear here</div>
            }
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
