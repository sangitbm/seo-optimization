"use client";

import { MinifierTool } from "./minifier-tool";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("js-minifier")!;

function minifyJS(js: string): string {
  return js
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}()[\];,=+\-*/<>!&|?:])\s*/g, "$1")
    .replace(/;\s*}/g, "}")
    .trim();
}

function beautifyJS(js: string): string {
  let indent = 0;
  const tab = "  ";
  let result = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const prev = i > 0 ? js[i - 1] : "";

    if (inString) {
      result += char;
      if (char === stringChar && prev !== "\\") inString = false;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringChar = char;
      result += char;
    } else if (char === "{") {
      indent++;
      result += " {\n" + tab.repeat(indent);
    } else if (char === "}") {
      indent = Math.max(0, indent - 1);
      result += "\n" + tab.repeat(indent) + "}";
      if (i + 1 < js.length && js[i + 1] !== "," && js[i + 1] !== ";") {
        result += "\n" + tab.repeat(indent);
      }
    } else if (char === ";") {
      result += ";\n" + tab.repeat(indent);
    } else {
      result += char;
    }
  }

  return result
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim())
    .join("\n");
}

const seoTips = [
  "Minified JavaScript reduces download size and improves page speed scores.",
  "Use defer or async attributes on script tags to prevent render blocking.",
  "Consider code splitting to load only the JavaScript needed for each page.",
];

const faqs = [
  { question: "Is client-side JS minification reliable?", answer: "This tool performs basic whitespace and comment removal. For production use, consider build tools like Terser that can also perform variable renaming and dead code elimination." },
  { question: "Does JS minification affect functionality?", answer: "Basic minification (removing whitespace and comments) does not change functionality. Advanced minification (variable renaming) can sometimes cause issues with certain code patterns." },
];

export function JSMinifierTool({ dict }: { dict?: any }) {
  const t = dict?.tools_deep?.js_minifier || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;
  return (
    <MinifierTool
      tool={tool}
      language="javascript"
      fileExtension="js"
      mimeType="application/javascript"
      placeholder={t.inputPlaceholder || 'function greet(name) {\n  // Say hello\n  console.log("Hello, " + name + "!");\n}'}
      minify={minifyJS}
      beautify={beautifyJS}
      seoTips={toolSeoTips}
      faqs={toolFaqs}
      dict={dict}
    />
  );
}
