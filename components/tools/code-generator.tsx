"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Terminal,
  Search,
  Copy,
  Download,
  ChevronRight,
  Zap,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";
import {
  codeCategories,
  getLanguagesForCategory,
  getSnippet,
  snippets,
  type CodeCategory,
  type Language,
} from "@/lib/code-snippets";

const tool = getToolBySlug("code-generator")!;

const seoTips = [
  "Use these snippets as a starting point — always review and adapt to your specific project needs.",
  "For Django REST Framework CRUD, remember to run migrations after creating a new model.",
  "FastAPI's async routes significantly improve performance under concurrent load.",
  "Always validate and sanitize user input even when using ORM libraries.",
  "JWT tokens should be stored in httpOnly cookies for web apps — never in localStorage.",
];

const faqs = [
  {
    question: "What languages and frameworks are supported?",
    answer:
      "We support Python, Django (DRF), FastAPI, Node.js (with Prisma), Express (with Mongoose), Laravel (PHP), and Ruby on Rails across 7 code categories.",
  },
  {
    question: "Can I customize the generated code?",
    answer:
      "Yes! Use the option fields to set your model name, field names, auth type, and more. The code updates instantly as you type.",
  },
  {
    question: "Is the generated code production-ready?",
    answer:
      "The snippets follow best practices and are production-quality starting points. You'll need to adapt them to your specific project structure, environment variables, and business logic.",
  },
  {
    question: "Can I download the code?",
    answer:
      "Yes, each snippet has a Download button that saves the code as the correct file extension (.py, .js, .php, .rb).",
  },
];

// ── Language color map ─────────────────────────────────────────────────────
const langColors: Record<Language, string> = {
  Python:   "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Django:   "bg-green-500/10 text-green-400 border-green-500/30",
  FastAPI:  "bg-teal-500/10 text-teal-400 border-teal-500/30",
  "Node.js":"bg-lime-500/10 text-lime-400 border-lime-500/30",
  Express:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Laravel:  "bg-red-500/10 text-red-400 border-red-500/30",
  Rails:    "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

// ── Syntax highlighting (simple token-based) ──────────────────────────────
function highlight(code: string, ext: string): React.ReactElement {
  const lines = code.split("\n");
  return (
    <>{lines.map((line, i) => <HighlightedLine key={i} line={line} ext={ext} index={i} />)}</>
  );
}

function HighlightedLine({ line, ext, index }: { line: string; ext: string; index: number }) {
  // Comments
  if (line.trimStart().startsWith("#") || line.trimStart().startsWith("//") || line.trimStart().startsWith("--")) {
    return <div key={index} className="text-slate-500 italic">{line}{"\n"}</div>;
  }
  // Keywords
  const keywords = ext === "py"
    ? /\b(from|import|def|class|return|if|else|elif|for|while|with|as|try|except|raise|None|True|False|async|await|lambda|and|or|not|in|is)\b/g
    : ext === "rb"
    ? /\b(def|end|class|module|do|require|return|if|else|elsif|unless|nil|true|false|puts|attr_accessor)\b/g
    : /\b(const|let|var|function|async|await|return|if|else|for|while|try|catch|throw|new|class|extends|require|module|exports|import|from|export|default|null|undefined|true|false)\b/g;

  const strings = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;

  const parts: React.ReactNode[] = [];
  let last = 0;
  const allMatches: { start: number; end: number; text: string; type: "kw" | "str" }[] = [];

  let m;
  const kwRegex = new RegExp(keywords.source, "g");
  while ((m = kwRegex.exec(line)) !== null) allMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type: "kw" });

  const strRegex = new RegExp(strings.source, "g");
  while ((m = strRegex.exec(line)) !== null) allMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type: "str" });

  allMatches.sort((a, b) => a.start - b.start);

  for (const match of allMatches) {
    if (match.start < last) continue;
    if (match.start > last) parts.push(line.slice(last, match.start));
    if (match.type === "kw") parts.push(<span key={`${index}-kw-${match.start}`} className="text-violet-400 font-medium">{match.text}</span>);
    else parts.push(<span key={`${index}-str-${match.start}`} className="text-emerald-400">{match.text}</span>);
    last = match.end;
  }
  if (last < line.length) parts.push(line.slice(last));

  return <div>{parts}{"\n"}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────

export function CodeGeneratorTool({ dict }: { dict?: any }) {
  const [selectedCategory, setSelectedCategory] = useState<CodeCategory>("CRUD");
  const [selectedLanguage, setSelectedLanguage]  = useState<Language>("Python");
  const [options,  setOptions]  = useState<Record<string, string>>({});
  const [search,   setSearch]   = useState("");
  const [copied,   setCopied]   = useState(false);

  // Available languages for selected category
  const availableLanguages = useMemo(
    () => getLanguagesForCategory(selectedCategory),
    [selectedCategory]
  );

  // When category changes, reset language to first available
  const handleCategorySelect = useCallback((cat: CodeCategory) => {
    setSelectedCategory(cat);
    const langs = getLanguagesForCategory(cat);
    setSelectedLanguage(langs[0] || "Python");
    setOptions({});
  }, []);

  // Current snippet
  const snippet = useMemo(
    () => getSnippet(selectedCategory, selectedLanguage),
    [selectedCategory, selectedLanguage]
  );

  // Merged options (defaults + user overrides)
  const mergedOptions = useMemo(() => {
    if (!snippet) return {};
    const defaults: Record<string, string> = {};
    for (const opt of snippet.options) defaults[opt.id] = opt.default;
    return { ...defaults, ...options };
  }, [snippet, options]);

  // Generated code
  const generatedCode = useMemo(() => {
    if (!snippet) return "";
    try { return snippet.generate(mergedOptions); }
    catch { return "// Error generating code. Please check your options."; }
  }, [snippet, mergedOptions]);

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return codeCategories;
    const q = search.toLowerCase();
    return codeCategories.filter((c) => {
      const hasMatch = snippets.some(
        (s) =>
          s.category === c.id &&
          (s.title.toLowerCase().includes(q) ||
            s.language.toLowerCase().includes(q) ||
            c.label.toLowerCase().includes(q))
      );
      return hasMatch;
    });
  }, [search]);

  function handleOptionChange(id: string, value: string) {
    setOptions((prev) => ({ ...prev, [id]: value }));
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!snippet) return;
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${snippet.id}.${snippet.fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${snippet.id}.${snippet.fileExtension}`);
  }

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="flex flex-col gap-6">

        {/* ── Top search ─────────────────────────────────────── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="code-generator-search"
            placeholder="Search categories or languages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* ── Category Grid ───────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                id={`category-${cat.id.replace(/\s+/g,"-").toLowerCase()}`}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  selectedCategory === cat.id
                    ? "border-violet-500/60 bg-violet-600/10 shadow-md shadow-violet-500/10"
                    : "border-border/60 bg-card hover:border-violet-500/30 hover:bg-violet-500/5"
                }`}
              >
                <span className="text-xl leading-none">{cat.emoji}</span>
                <span className="text-sm font-semibold">{cat.label}</span>
                <span className="text-xs text-muted-foreground leading-tight hidden sm:block">
                  {cat.description}
                </span>
                {selectedCategory === cat.id && (
                  <span className="absolute top-2 right-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-400" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Language Tabs ───────────────────────────────────── */}
        {availableLanguages.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Language / Framework
            </p>
            <Tabs
              value={selectedLanguage}
              onValueChange={(v) => { setSelectedLanguage(v as Language); setOptions({}); }}
            >
              <TabsList className="flex-wrap h-auto gap-1 bg-muted/40 p-1">
                {availableLanguages.map((lang) => (
                  <TabsTrigger
                    key={lang}
                    value={lang}
                    id={`lang-tab-${lang.replace(/[\s.]/g,"-").toLowerCase()}`}
                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    <span className={`inline-block h-2 w-2 rounded-full mr-1.5 border ${langColors[lang]?.split(" ")[0] || ""}`} />
                    {lang}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* ── Options + Preview ────────────────────────────────── */}
        {snippet && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

            {/* Options Panel */}
            <div className="space-y-4">
              {/* Snippet info */}
              <div className="rounded-xl border border-border/50 bg-card p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-violet-400" />
                  <h3 className="font-semibold text-sm">{snippet.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{snippet.description}</p>
                <div className="flex gap-2 pt-1 flex-wrap">
                  <Badge variant="outline" className={`text-xs ${langColors[snippet.language]}`}>
                    {snippet.language}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    .{snippet.fileExtension}
                  </Badge>
                </div>
              </div>

              {/* Dynamic Options */}
              <div className="rounded-xl border border-border/50 bg-card p-4 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Options
                </p>
                {snippet.options.map((opt) => (
                  <div key={opt.id} className="space-y-1.5">
                    <Label htmlFor={`opt-${opt.id}`} className="text-sm">{opt.label}</Label>
                    {opt.type === "text" ? (
                      <Input
                        id={`opt-${opt.id}`}
                        placeholder={opt.placeholder}
                        value={mergedOptions[opt.id] ?? opt.default}
                        onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <Select
                        value={mergedOptions[opt.id] ?? opt.default}
                        onValueChange={(v) => handleOptionChange(opt.id, v)}
                      >
                        <SelectTrigger id={`opt-${opt.id}`} className="font-mono text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {opt.choices?.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Code updates live as you type
              </div>
            </div>

            {/* Code Output */}
            <div className="min-w-0 space-y-3">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-400" />
                  <span className="text-sm font-medium text-muted-foreground">Generated Code</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    id="copy-code-btn"
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="gap-1.5 h-8"
                  >
                    {copied
                      ? <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Copied!</>
                      : <><Copy className="h-3.5 w-3.5" /> Copy</>
                    }
                  </Button>
                  <Button
                    id="download-code-btn"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-1.5 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90"
                  >
                    <Download className="h-3.5 w-3.5" />
                    .{snippet.fileExtension}
                  </Button>
                </div>
              </div>

              {/* Code Block */}
              <div className="relative group rounded-xl overflow-hidden border border-border/60 bg-[#0d1117]">
                {/* Window bar */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40 bg-[#161b22]">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <ChevronRight className="h-3 w-3" />
                    {snippet.id}.{snippet.fileExtension}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <Zap className="h-3 w-3 text-violet-400" />
                    <span className="text-xs text-violet-400">live preview</span>
                  </div>
                </div>
                {/* Code */}
                <pre
                  id="generated-code-output"
                  className="overflow-x-auto p-5 text-xs sm:text-sm leading-6 font-mono text-slate-300 max-h-[600px]"
                >
                  <code>
                    {highlight(generatedCode, snippet.fileExtension)}
                  </code>
                </pre>
              </div>

              {/* Line count */}
              <p className="text-xs text-muted-foreground text-right px-1">
                {generatedCode.split("\n").length} lines · {generatedCode.length.toLocaleString()} chars
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
