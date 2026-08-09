"use client";

import { useState } from "react";
import { Plus, Trash2, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("robots-txt-generator")!;

interface Rule {
  type: "Allow" | "Disallow";
  path: string;
}

interface UserAgentBlock {
  userAgent: string;
  rules: Rule[];
  crawlDelay: string;
}

const defaultBlock: UserAgentBlock = {
  userAgent: "*",
  rules: [{ type: "Allow", path: "/" }],
  crawlDelay: "",
};

function generate(blocks: UserAgentBlock[], sitemapUrl: string): string {
  let output = "";
  blocks.forEach((block, i) => {
    if (i > 0) output += "\n";
    output += `User-agent: ${block.userAgent}\n`;
    block.rules.forEach((r) => {
      output += `${r.type}: ${r.path}\n`;
    });
    if (block.crawlDelay) output += `Crawl-delay: ${block.crawlDelay}\n`;
  });
  if (sitemapUrl) output += `\nSitemap: ${sitemapUrl}\n`;
  return output;
}

const seoTips = [
  "Always include a Sitemap directive pointing to your XML sitemap.",
  "Don't use robots.txt to hide sensitive content — use authentication instead.",
  "Test your robots.txt with Google Search Console's robots.txt Tester.",
  "Use specific user-agent names to target specific crawlers.",
  "Blocking CSS and JavaScript files can hurt your SEO rankings.",
];

const faqs = [
  { question: "What is robots.txt?", answer: "Robots.txt is a text file placed at your website's root that tells search engine crawlers which pages they should or shouldn't visit." },
  { question: "Can robots.txt prevent indexing?", answer: "No, robots.txt only prevents crawling, not indexing. To prevent indexing, use the noindex meta tag or X-Robots-Tag header." },
  { question: "Where should robots.txt be placed?", answer: "It must be placed at the root of your domain: https://example.com/robots.txt" },
];

export function RobotsTxtGeneratorTool({ dict }: { dict?: any }) {
  const [blocks, setBlocks] = useState<UserAgentBlock[]>([{ ...defaultBlock, rules: [{ type: "Allow", path: "/" }] }]);
  const [sitemapUrl, setSitemapUrl] = useState("");

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.robots_txt_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const addBlock = () => setBlocks([...blocks, { userAgent: "*", rules: [{ type: "Allow", path: "/" }], crawlDelay: "" }]);
  const removeBlock = (i: number) => setBlocks(blocks.filter((_, idx) => idx !== i));

  const addRule = (blockIndex: number) => {
    setBlocks(blocks.map((b, i) => i === blockIndex ? { ...b, rules: [...b.rules, { type: "Allow", path: "/" }] } : b));
  };

  const removeRule = (blockIndex: number, ruleIndex: number) => {
    setBlocks(blocks.map((b, i) => i === blockIndex ? { ...b, rules: b.rules.filter((_, ri) => ri !== ruleIndex) } : b));
  };

  const updateBlock = (i: number, key: keyof UserAgentBlock, value: string) => {
    setBlocks(blocks.map((b, idx) => idx === i ? { ...b, [key]: value } : b));
  };

  const updateRule = (blockIndex: number, ruleIndex: number, key: keyof Rule, value: string) => {
    setBlocks(blocks.map((b, i) => i === blockIndex ? {
      ...b,
      rules: b.rules.map((r, ri) => ri === ruleIndex ? { ...r, [key]: value } : r),
    } : b));
  };

  const output = generate(blocks, sitemapUrl);

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <div className="space-y-4">
        {blocks.map((block, bi) => (
          <Card key={bi}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t.userAgent || "User-Agent"} #{bi + 1}</CardTitle>
              {blocks.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeBlock(bi)} className="text-destructive h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.userAgent || "User-Agent"}</Label>
                <Input value={block.userAgent} onChange={(e) => updateBlock(bi, "userAgent", e.target.value)} placeholder="*" />
              </div>

              {block.rules.map((rule, ri) => (
                <div key={ri} className="flex items-end gap-2">
                  <div className="w-32 space-y-1">
                    <Label>{t.directive || "Directive"}</Label>
                    <Select value={rule.type} onValueChange={(v) => updateRule(bi, ri, "type", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Allow">Allow</SelectItem>
                        <SelectItem value="Disallow">Disallow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label>{t.path || "Path"}</Label>
                    <Input value={rule.path} onChange={(e) => updateRule(bi, ri, "path", e.target.value)} placeholder="/" />
                  </div>
                  {block.rules.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeRule(bi, ri)} className="text-destructive h-10 w-10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button variant="outline" size="sm" onClick={() => addRule(bi)} className="gap-1">
                <Plus className="h-3 w-3" /> {t.addRule || "Add Rule"}
              </Button>

              <div className="space-y-2">
                <Label>{t.delay || "Crawl Delay"}</Label>
                <Input type="number" min="0" value={block.crawlDelay} onChange={(e) => updateBlock(bi, "crawlDelay", e.target.value)} placeholder="Optional" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" onClick={addBlock} className="gap-1 w-full">
          <Plus className="h-4 w-4" /> {t.userAgent || "Add User-Agent Block"}
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>{t.sitemapUrl || "Sitemap URL"}</Label>
              <Input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} placeholder="https://example.com/sitemap.xml" />
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => {
            toast.success(t.generatedCode || "robots.txt generated successfully!");
          }}
          size="lg"
          className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95"
        >
          <Bot className="h-5 w-5" /> {t.generateBtn || "Generate robots.txt"}
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        <CodePreview code={output} language="text" label={t.generatedCode || "robots.txt"} />
        <div className="flex flex-wrap gap-2">
          <CopyButton text={output} label={ui.copy || "Copy"} />
          <DownloadButton content={output} filename="robots.txt" label={ui.download || "Download"} />
          <ResetButton onReset={() => { setBlocks([{ ...defaultBlock, rules: [{ type: "Allow", path: "/" }] }]); setSitemapUrl(""); }} />
        </div>
      </div>
    </ToolLayout>
  );
}
