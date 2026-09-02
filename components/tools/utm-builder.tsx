"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import { Link as LinkIcon, RefreshCw } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { getToolBySlug } from "@/lib/tools-data";

export function UtmBuilder() {
  const tool = getToolBySlug("utm-builder")!;
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const generateUtmLink = () => {
    if (!url || !source || !medium) return "";
    
    try {
      const baseUrl = url.startsWith("http") ? url : `https://${url}`;
      const urlObj = new URL(baseUrl);
      
      if (source) urlObj.searchParams.set("utm_source", source);
      if (medium) urlObj.searchParams.set("utm_medium", medium);
      if (campaign) urlObj.searchParams.set("utm_campaign", campaign);
      if (term) urlObj.searchParams.set("utm_term", term);
      if (content) urlObj.searchParams.set("utm_content", content);
      
      return urlObj.toString();
    } catch {
      return "";
    }
  };

  const finalUrl = generateUtmLink();

  const handleReset = () => {
    setUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  return (
    <ToolLayout tool={tool} content={toolContent["utm-builder"]} seoTips={[]} faqs={[]}>
      <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL (Required)</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The full website URL (e.g. https://www.example.com)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Campaign Source (utm_source) - Required</Label>
          <Input
            id="source"
            placeholder="google, newsletter, facebook"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">The referrer (e.g. google, newsletter)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medium">Campaign Medium (utm_medium) - Required</Label>
          <Input
            id="medium"
            placeholder="cpc, banner, email"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Marketing medium (e.g. cpc, banner, email)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign">Campaign Name (utm_campaign)</Label>
          <Input
            id="campaign"
            placeholder="spring_sale, promo_2026"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Product, promo code, or slogan (e.g. spring_sale)</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="term">Campaign Term (utm_term)</Label>
            <Input
              id="term"
              placeholder="running+shoes"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Campaign Content (utm_content)</Label>
            <Input
              id="content"
              placeholder="logolink, textlink"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <Button variant="outline" onClick={handleReset} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Fields
        </Button>
      </div>

      <div>
        <div className="sticky top-24 overflow-hidden rounded-xl border border-border/50 bg-muted/30">
          <div className="border-b border-border/50 bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <LinkIcon className="h-4 w-4" />
              Generated UTM URL
            </div>
          </div>
          <div className="p-4">
            <div className="relative min-h-[120px] rounded-lg border border-border/50 bg-background p-4 font-mono text-sm break-all">
              {finalUrl ? (
                <span className="text-foreground">{finalUrl}</span>
              ) : (
                <span className="text-muted-foreground">
                  Fill in the required fields to generate your trackable URL...
                </span>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <CopyButton text={finalUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolLayout>
  );
}
