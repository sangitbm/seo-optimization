"use client";

import { MinifierTool } from "./minifier-tool";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("css-minifier")!;

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\s*!important/g, "!important")
    .trim();
}

function beautifyCSS(css: string): string {
  let indent = 0;
  const tab = "  ";

  return css
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n")
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (!line) return "";
      if (line === "}") indent = Math.max(0, indent - 1);
      const result = tab.repeat(indent) + line;
      if (line.endsWith("{")) indent++;
      return result;
    })
    .filter(Boolean)
    .join("\n");
}

const seoTips = [
  "Minified CSS reduces render-blocking time and improves page speed.",
  "Combine multiple CSS files and minify the result for best performance.",
  "Consider inlining critical CSS for above-the-fold content.",
];

const faqs = [
  { question: "Why should I minify CSS?", answer: "Minifying CSS removes whitespace, comments, and unnecessary characters, reducing file size and improving page load speed." },
  { question: "Can minified CSS cause issues?", answer: "No, minification only removes formatting. The CSS rules and their effects remain identical." },
];

export function CSSMinifierTool() {
  return (
    <MinifierTool
      tool={tool}
      language="css"
      fileExtension="css"
      mimeType="text/css"
      placeholder="body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}"
      minify={minifyCSS}
      beautify={beautifyCSS}
      seoTips={seoTips}
      faqs={faqs}
    />
  );
}
