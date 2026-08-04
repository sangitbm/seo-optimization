"use client";

import { MinifierTool } from "./minifier-tool";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("html-minifier")!;

function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s+>/g, ">")
    .replace(/<\s+/g, "<")
    .trim();
}

function beautifyHTML(html: string): string {
  let indent = 0;
  const tab = "  ";
  const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

  return html
    .replace(/>\s+</g, ">\n<")
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (!line) return "";

      const isClosing = /^<\//.test(line);
      const isVoid = voidElements.has((line.match(/<(\w+)/) || [])[1]?.toLowerCase());
      const isSelfClosing = /\/>$/.test(line);
      const isOpening = /^<[^/]/.test(line) && !isVoid && !isSelfClosing;

      if (isClosing) indent = Math.max(0, indent - 1);
      const result = tab.repeat(indent) + line;
      if (isOpening && !/^<.*>.*<\//.test(line)) indent++;

      return result;
    })
    .filter(Boolean)
    .join("\n");
}

const seoTips = [
  "Minifying HTML reduces page size and improves load time.",
  "Remove unnecessary comments and whitespace in production.",
  "Use server-side compression (gzip/brotli) alongside minification.",
];

const faqs = [
  { question: "Does minifying HTML affect SEO?", answer: "Minifying HTML can positively affect SEO by improving page load speed, which is a ranking factor. It doesn't affect content or structure." },
  { question: "Is it safe to minify HTML?", answer: "Yes, minification only removes unnecessary whitespace and comments. It doesn't change the functionality of your HTML." },
];

export function HTMLMinifierTool() {
  return (
    <MinifierTool
      tool={tool}
      language="html"
      fileExtension="html"
      mimeType="text/html"
      placeholder='<div class="container">\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</div>'
      minify={minifyHTML}
      beautify={beautifyHTML}
      seoTips={seoTips}
      faqs={faqs}
    />
  );
}
