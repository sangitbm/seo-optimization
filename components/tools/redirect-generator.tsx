"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("redirect-generator")!;

interface Redirect { from: string; to: string; type: "301" | "302"; }

function genApache(redirects: Redirect[]): string {
  return `RewriteEngine On\n\n${redirects.filter((r) => r.from && r.to).map((r) =>
    `RewriteRule ^${r.from.replace(/^\//, "")}$ ${r.to} [R=${r.type},L]`
  ).join("\n")}`;
}

function genNginx(redirects: Redirect[]): string {
  return redirects.filter((r) => r.from && r.to).map((r) =>
    `location = ${r.from} {\n    return ${r.type} ${r.to};\n}`
  ).join("\n\n");
}

function genVercel(redirects: Redirect[]): string {
  const rules = redirects.filter((r) => r.from && r.to).map((r) => ({
    source: r.from,
    destination: r.to,
    permanent: r.type === "301",
  }));
  return JSON.stringify({ redirects: rules }, null, 2);
}

function genNetlify(redirects: Redirect[]): string {
  return redirects.filter((r) => r.from && r.to).map((r) =>
    `${r.from}    ${r.to}    ${r.type}`
  ).join("\n");
}

const seoTips = [
  "Use 301 redirects for permanent URL changes to pass link equity.",
  "Use 302 redirects only for temporary moves like A/B testing.",
  "Avoid redirect chains — point directly to the final destination.",
  "Update internal links to point to new URLs instead of relying on redirects.",
];

const faqs = [
  { question: "What is the difference between 301 and 302 redirects?", answer: "A 301 redirect is permanent and tells search engines to transfer ranking power to the new URL. A 302 redirect is temporary and keeps ranking power on the original URL." },
  { question: "How do redirects affect SEO?", answer: "Proper 301 redirects pass most link equity to the new URL. However, redirect chains (multiple redirects) can dilute link equity and slow page loading." },
];

export function RedirectGeneratorTool() {
  const dict: any = {};
  const [redirects, setRedirects] = useState<Redirect[]>([{ from: "/old-page", to: "/new-page", type: "301" }]);
  const [isGenerated, setIsGenerated] = useState(false);


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.redirect_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const add = () => { setRedirects([...redirects, { from: "", to: "", type: "301" }]); setIsGenerated(false); };
  const remove = (i: number) => { setRedirects(redirects.filter((_, idx) => idx !== i)); setIsGenerated(false); };
  const update = (i: number, key: keyof Redirect, value: string) => {
    setRedirects(redirects.map((r, idx) => idx === i ? { ...r, [key]: value } : r));
    setIsGenerated(false);
  };

  return (
    <ToolLayout tool={tool} content={toolContent["redirect-generator"]} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t.configTitle || "Redirect Rules"}</CardTitle>
          <Button onClick={add} size="sm" className="gap-1"><Plus className="h-4 w-4" /> {t.addRule || "Add"}</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {redirects.map((r, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <Label>{t.fromLabel || "From"}</Label>
                <Input placeholder="/old-page" value={r.from} onChange={(e) => update(i, "from", e.target.value)} />
              </div>
              <div className="flex-1 space-y-1">
                <Label>{t.toLabel || "To"}</Label>
                <Input placeholder="/new-page" value={r.to} onChange={(e) => update(i, "to", e.target.value)} />
              </div>
              <div className="w-24 space-y-1">
                <Label>{t.typeLabel || "Type"}</Label>
                <Select value={r.type} onValueChange={(v) => update(i, "type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="301">301</SelectItem>
                    <SelectItem value="302">302</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {redirects.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => remove(i)} className="text-destructive h-10 w-10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              if (!redirects.some((r) => r.from.trim() && r.to.trim())) {
                toast.error(t.errorEmpty || "Please enter at least one redirect rule");
                return;
              }
              setIsGenerated(true);
              toast.success(t.successGenerate || "Redirect rules generated successfully!");
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-4"
          >
            <ArrowRightLeft className="h-5 w-5" /> {t.generateBtn || "Generate Redirects"}
          </Button>
        </CardContent>
      </Card>

      {isGenerated && (
        <Tabs defaultValue="apache" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="apache">Apache</TabsTrigger>
          <TabsTrigger value="nginx">Nginx</TabsTrigger>
          <TabsTrigger value="vercel">Vercel</TabsTrigger>
          <TabsTrigger value="netlify">Netlify</TabsTrigger>
        </TabsList>
        <TabsContent value="apache" className="mt-4 space-y-4">
          <CodePreview code={genApache(redirects)} language="apache" label=".htaccess" />
          <div className="flex gap-2">
            <CopyButton text={genApache(redirects)} label={ui.copy || "Copy"} />
            <DownloadButton content={genApache(redirects)} filename=".htaccess" label={`${ui.download || "Download"} .htaccess`} />
          </div>
        </TabsContent>
        <TabsContent value="nginx" className="mt-4 space-y-4">
          <CodePreview code={genNginx(redirects)} language="nginx" label="Nginx Config" />
          <CopyButton text={genNginx(redirects)} label={ui.copy || "Copy"} />
        </TabsContent>
        <TabsContent value="vercel" className="mt-4 space-y-4">
          <CodePreview code={genVercel(redirects)} language="json" label="vercel.json" />
          <div className="flex gap-2">
            <CopyButton text={genVercel(redirects)} label={ui.copy || "Copy"} />
            <DownloadButton content={genVercel(redirects)} filename="vercel.json" mimeType="application/json" label={ui.download || "Download"} />
          </div>
        </TabsContent>
        <TabsContent value="netlify" className="mt-4 space-y-4">
          <CodePreview code={genNetlify(redirects)} language="text" label="_redirects" />
          <div className="flex gap-2">
            <CopyButton text={genNetlify(redirects)} label={ui.copy || "Copy"} />
            <DownloadButton content={genNetlify(redirects)} filename="_redirects" label={ui.download || "Download"} />
          </div>
        </TabsContent>
      </Tabs>
      )}

      <div className="mt-4">
        <ResetButton onReset={() => { setRedirects([{ from: "/old-page", to: "/new-page", type: "301" }]); setIsGenerated(false); }} />
      </div>
    </ToolLayout>
  );
}
