"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { Monitor, Smartphone, Search, MoreVertical, Globe } from "lucide-react";

export function SerpSimulator() {
  const tool = getToolBySlug("serp-simulator")!;
  const [title, setTitle] = useState("Your SEO Optimized Page Title | Brand Name");
  const [description, setDescription] = useState(
    "This is an example of what a meta description looks like in Google's search results. Keep it between 120 and 156 characters to ensure it doesn't get truncated."
  );
  const [url, setUrl] = useState("https://www.example.com/category/product");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const [titlePixels, setTitlePixels] = useState(0);
  const [descPixels, setDescPixels] = useState(0);

  // Approximate pixel width calculations for Google font (arial 20px / 14px)
  useEffect(() => {
    // A rough estimation of pixel width (desktop title max is ~600px, desc max is ~920px)
    const titleWidth = title.length * 8.5; // very rough heuristic
    const descWidth = description.length * 5.8;
    
    setTitlePixels(titleWidth);
    setDescPixels(descWidth);
  }, [title, description]);

  const maxTitlePx = 600;
  const maxDescChars = device === "desktop" ? 156 : 120;

  // Format URL for Google's breadcrumb style display
  const formatUrl = (fullUrl: string) => {
    try {
      const u = new URL(fullUrl.startsWith("http") ? fullUrl : `https://${fullUrl}`);
      const domain = u.hostname;
      const path = u.pathname;
      if (path === "/") return domain;
      
      const segments = path.split("/").filter(Boolean);
      return `${domain} > ${segments.join(" > ")}`;
    } catch {
      return fullUrl;
    }
  };

  const breadcrumbUrl = formatUrl(url);

  // Check truncation
  const displayTitle = titlePixels > maxTitlePx ? title.substring(0, 60) + "..." : title;
  const displayDesc = description.length > maxDescChars ? description.substring(0, maxDescChars) + "..." : description;

  return (
    <ToolLayout tool={tool} seoTips={[]} faqs={[]}>
      <div className="grid gap-12 lg:grid-cols-2">
        
        {/* Editor */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="url">URL</Label>
            </div>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title Tag</Label>
              <span className={`text-xs font-semibold ${titlePixels > maxTitlePx ? "text-red-500" : "text-green-500"}`}>
                {Math.round(titlePixels)} / {maxTitlePx} px
              </span>
            </div>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titlePixels > maxTitlePx && (
              <p className="text-xs text-red-500">Your title is too long and may be truncated by Google.</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="desc">Meta Description</Label>
              <span className={`text-xs font-semibold ${description.length > maxDescChars ? "text-red-500" : "text-green-500"}`}>
                {description.length} / {maxDescChars} chars
              </span>
            </div>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-y min-h-[120px]"
            />
            {description.length > maxDescChars && (
              <p className="text-xs text-red-500">Your description is too long for {device} and may be truncated.</p>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Live SERP Preview</Label>
            <div className="flex rounded-md border p-1 bg-muted/50">
              <button
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors ${device === "desktop" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setDevice("desktop")}
              >
                <Monitor className="h-3.5 w-3.5" /> Desktop
              </button>
              <button
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors ${device === "mobile" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setDevice("mobile")}
              >
                <Smartphone className="h-3.5 w-3.5" /> Mobile
              </button>
            </div>
          </div>

          {/* Google Preview Container */}
          <div className={`mx-auto rounded-xl border bg-white p-6 shadow-sm ${device === "mobile" ? "max-w-[375px]" : "max-w-full"}`}>
            
            {/* Header (Google style search bar) */}
            <div className="flex items-center gap-4 border-b pb-4 mb-4">
              <div className="font-bold text-2xl tracking-tighter" style={{fontFamily: "Product Sans, Arial, sans-serif"}}>
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="flex-1 flex items-center rounded-full border px-4 py-2 shadow-sm bg-white">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
              </div>
            </div>

            {/* Actual Result snippet */}
            <div className="font-sans" style={{ fontFamily: "arial, sans-serif" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 border">
                  <Globe className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-[14px] text-[#202124]">{url.split("/")[2] || "www.example.com"}</div>
                  <div className="text-[12px] text-[#4d5156] tracking-wide mt-[-2px]">{breadcrumbUrl}</div>
                </div>
                <MoreVertical className="h-4 w-4 text-gray-500 ml-auto" />
              </div>
              
              <div 
                className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-[1.3] mb-1 whitespace-nowrap overflow-hidden text-ellipsis block"
                style={{ maxWidth: "100%" }}
              >
                {displayTitle || "Please enter a title tag"}
              </div>
              
              <div className="text-[14px] text-[#4d5156] leading-[1.58] line-clamp-2">
                {displayDesc || "Please enter a meta description"}
              </div>
            </div>

          </div>

        </div>
      </div>
    </ToolLayout>
  );
}
