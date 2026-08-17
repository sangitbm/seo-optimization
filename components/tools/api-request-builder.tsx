"use client";

import { useState } from "react";
import { Plus, Trash2, Copy, Unplug } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("api-request-builder")!;

const seoTips = [
  "Always use HTTPS endpoints in production APIs to protect data in transit.",
  "Include 'Content-Type: application/json' header when sending a JSON body.",
  "Use Bearer token authentication for modern REST APIs and OAuth 2.0 flows.",
  "Test your API with different HTTP methods — GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing.",
  "Add error handling to your fetch/axios calls to gracefully handle 4xx and 5xx responses.",
];

const faqs = [
  { question: "What is the difference between PUT and PATCH?", answer: "PUT replaces the entire resource with the new data. PATCH only updates the specific fields provided, leaving the rest unchanged." },
  { question: "Why doesn't the live test work for some APIs?", answer: "Browser security (CORS) prevents calling APIs that haven't explicitly allowed cross-origin requests. The generated code snippets will work fine from your server or terminal." },
  { question: "What is a Bearer token?", answer: "A Bearer token is a type of access token used in the Authorization header: 'Authorization: Bearer <token>'. It is commonly used in OAuth 2.0 and JWT-based authentication." },
];

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Header { key: string; value: string; }
interface Param { key: string; value: string; }

const METHOD_COLORS: Record<Method, string> = {
  GET: "text-green-600 dark:text-green-400",
  POST: "text-blue-600 dark:text-blue-400",
  PUT: "text-yellow-600 dark:text-yellow-400",
  PATCH: "text-orange-600 dark:text-orange-400",
  DELETE: "text-red-600 dark:text-red-400",
};

export function ApiRequestBuilder() {
  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState("https://api.example.com/users");
  const [headers, setHeaders] = useState<Header[]>([{ key: "Content-Type", value: "application/json" }]);
  const [params, setParams] = useState<Param[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState('{\n  "name": "John Doe"\n}');
  const [activeSnippet, setActiveSnippet] = useState<"fetch" | "axios" | "curl">("fetch");

  const addHeader = () => setHeaders(h => [...h, { key: "", value: "" }]);
  const removeHeader = (i: number) => setHeaders(h => h.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: "key" | "value", v: string) => setHeaders(h => h.map((x, idx) => idx === i ? { ...x, [field]: v } : x));

  const addParam = () => setParams(p => [...p, { key: "", value: "" }]);
  const removeParam = (i: number) => setParams(p => p.filter((_, idx) => idx !== i));
  const updateParam = (i: number, field: "key" | "value", v: string) => setParams(p => p.map((x, idx) => idx === i ? { ...x, [field]: v } : x));

  const buildUrl = () => {
    const validParams = params.filter(p => p.key.trim());
    if (!validParams.length) return url;
    const qs = validParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&");
    return `${url}?${qs}`;
  };

  const buildHeaders = () => headers.filter(h => h.key.trim()).reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {} as Record<string, string>);

  const generateFetch = () => {
    const fullUrl = buildUrl();
    const hdrs = buildHeaders();
    const hasBody = method !== "GET" && method !== "DELETE";
    return `const response = await fetch("${fullUrl}", {\n  method: "${method}",\n  headers: ${JSON.stringify(hdrs, null, 4).replace(/^/gm, "  ").trim()}${hasBody ? `,\n  body: JSON.stringify(${body.trim()})` : ""}\n});\n\nconst data = await response.json();\nconsole.log(data);`;
  };

  const generateAxios = () => {
    const fullUrl = buildUrl();
    const hdrs = buildHeaders();
    const hasBody = method !== "GET" && method !== "DELETE";
    const methodLower = method.toLowerCase();
    return `import axios from "axios";\n\nconst { data } = await axios.${methodLower}(\n  "${fullUrl}",\n${hasBody ? `  ${body.trim()},\n` : ""}  { headers: ${JSON.stringify(hdrs, null, 4).replace(/^/gm, "  ").trim()} }\n);\nconsole.log(data);`;
  };

  const generateCurl = () => {
    const fullUrl = buildUrl();
    const hdrs = buildHeaders();
    const hasBody = method !== "GET" && method !== "DELETE";
    const headerStr = Object.entries(hdrs).map(([k, v]) => `  -H "${k}: ${v}"`).join(" \\\n");
    return `curl -X ${method} \\\n${headerStr}${hasBody ? ` \\\n  -d '${body.trim()}'` : ""} \\\n  "${fullUrl}"`;
  };

  const snippets: Record<string, string> = {
    fetch: generateFetch(),
    axios: generateAxios(),
    curl: generateCurl(),
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(snippets[activeSnippet]);
    toast.success(`${activeSnippet} snippet copied!`);
  };

  const reset = () => {
    setMethod("GET"); setUrl("https://api.example.com/users");
    setHeaders([{ key: "Content-Type", value: "application/json" }]);
    setParams([{ key: "", value: "" }]);
    setBody('{\n  "name": "John Doe"\n}');
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Builder */}
        <div className="space-y-5">
          {/* Method + URL */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Unplug className="h-4 w-4 text-violet-500" /> Request</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Select value={method} onValueChange={v => setMethod(v as Method)}>
                  <SelectTrigger className={`w-28 font-bold ${METHOD_COLORS[method]}`}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["GET", "POST", "PUT", "PATCH", "DELETE"] as Method[]).map(m => (
                      <SelectItem key={m} value={m} className={`font-bold ${METHOD_COLORS[m]}`}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="font-mono text-sm flex-1" />
              </div>
            </CardContent>
          </Card>

          {/* Query Params */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Query Params</CardTitle>
              <Button size="sm" variant="outline" onClick={addParam}><Plus className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {params.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="key" value={p.key} onChange={e => updateParam(i, "key", e.target.value)} className="font-mono text-sm" />
                  <Input placeholder="value" value={p.value} onChange={e => updateParam(i, "value", e.target.value)} className="font-mono text-sm" />
                  <Button size="sm" variant="ghost" onClick={() => removeParam(i)} className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Headers */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Headers</CardTitle>
              <Button size="sm" variant="outline" onClick={addHeader}><Plus className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {headers.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="Content-Type" value={h.key} onChange={e => updateHeader(i, "key", e.target.value)} className="font-mono text-sm" />
                  <Input placeholder="application/json" value={h.value} onChange={e => updateHeader(i, "value", e.target.value)} className="font-mono text-sm" />
                  <Button size="sm" variant="ghost" onClick={() => removeHeader(i)} className="text-muted-foreground hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Body */}
          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <Card>
              <CardHeader><CardTitle className="text-base">Request Body (JSON)</CardTitle></CardHeader>
              <CardContent>
                <Textarea value={body} onChange={e => setBody(e.target.value)} className="min-h-[140px] font-mono text-sm" />
              </CardContent>
            </Card>
          )}

          <ResetButton onReset={reset} />
        </div>

        {/* Generated Code */}
        <div className="space-y-4">
          <Card className="sticky top-20">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Generated Code</CardTitle>
              <Button size="sm" variant="outline" onClick={copySnippet}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                {(["fetch", "axios", "curl"] as const).map(s => (
                  <button key={s} onClick={() => setActiveSnippet(s)}
                    className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all ${activeSnippet === s ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <pre className="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-auto max-h-[500px] whitespace-pre-wrap">{snippets[activeSnippet]}</pre>
              <div className="text-xs text-muted-foreground bg-muted/30 rounded p-2">
                🔗 <strong>Full URL:</strong> <span className="font-mono break-all">{buildUrl()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
