"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("keyword-density-checker")!;

const STOP_WORDS = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","is","was","are","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","it","its","i","you","he","she","we","they","this","that","these","those","my","your","his","her","our","their","me","him","us","them","not","no","from","as","if","then","than","so","up","out","about","into","over","after","before","between","under","again","further","once"]);

function analyzeText(text: string) {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  const totalWords = words.length;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter((s) => s.trim()).length;

  const freq: Record<string, number> = {};
  for (const w of words) {
    if (!STOP_WORDS.has(w) && w.length > 1) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }

  const sorted = Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word, count]) => ({
      word,
      count,
      density: totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : "0",
    }));

  return { totalWords, chars, sentences, paragraphs, keywords: sorted };
}

const seoTips = [
  "Aim for a primary keyword density of 1-2% for natural-sounding content.",
  "Avoid keyword stuffing — Google penalizes unnatural keyword usage.",
  "Use LSI (Latent Semantic Indexing) keywords for semantic relevance.",
  "Focus on readability and user intent rather than exact keyword counts.",
];

const faqs = [
  { question: "What is keyword density?", answer: "Keyword density is the percentage of times a keyword appears in your text relative to the total number of words. It helps gauge whether content is optimized without being over-optimized." },
  { question: "What is the ideal keyword density?", answer: "Most SEO experts recommend a keyword density of 1-2% for primary keywords. More important than density is natural, reader-friendly writing." },
];

export function KeywordDensityCheckerTool({ dict }: { dict?: any }) {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeText> | null>(null);


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.keyword_density_checker || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const csvReport = useMemo(() => {
    if (!analysis || !analysis.keywords.length) return "";
    const lines = ["Rank,Keyword,Count,Density (%)"];
    analysis.keywords.forEach((kw, idx) => {
      lines.push(`${idx + 1},"${kw.word}",${kw.count},${kw.density}%`);
    });
    return lines.join("\n");
  }, [analysis]);

  return (
    <ToolLayout tool={tool} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader><CardTitle className="text-lg">{t.inputLabel || "Paste Your Content"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={text} onChange={(e) => { setText(e.target.value); setAnalysis(null); }} placeholder={t.inputPlaceholder || "Paste your article or content here..."} rows={10} className="font-mono text-sm" />
          <Button
            onClick={() => {
              if (!text.trim()) {
                toast.error(t.errorEmpty || "Please paste your text first");
                return;
              }
              setAnalysis(analyzeText(text));
              toast.success(t.successAnalyze || "Keyword density analyzed!");
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95"
          >
            <Search className="h-5 w-5" /> {t.analyzeBtn || "Check Keyword Density"}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="mt-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: t.wordCount || "Words", value: analysis.totalWords },
              { label: t.charCount || "Characters", value: analysis.chars },
              { label: t.sentences || "Sentences", value: analysis.sentences },
              { label: t.paragraphs || "Paragraphs", value: analysis.paragraphs },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Keywords Table */}
          {analysis.keywords.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t.resultsTitle || "Keyword Density Analysis"}</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left font-medium text-muted-foreground">
                        <th className="pb-3 pr-4">#</th>
                        <th className="pb-3">{t.keywordLabel || "Keyword"}</th>
                        <th className="pb-3 text-right">{t.countLabel || "Count"}</th>
                        <th className="pb-3 text-right">{t.densityLabel || "Density"}</th>
                        <th className="pb-3 pl-4 w-1/3">{t.distribution || "Distribution"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.keywords.map((kw, i) => (
                        <tr key={kw.word} className="border-b border-border/50">
                          <td className="py-2.5 text-muted-foreground">{i + 1}</td>
                          <td className="py-2.5 font-medium">{kw.word}</td>
                          <td className="py-2.5 text-right">{kw.count}</td>
                          <td className="py-2.5 text-right">{kw.density}%</td>
                          <td className="py-2.5 pl-4">
                            <div className="h-2 w-full max-w-[200px] rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                                style={{ width: `${Math.min(parseFloat(kw.density) * 20, 100)}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-2">
            {csvReport && (
              <>
                <CopyButton text={csvReport} label={ui.copy || "Copy CSV"} />
                <DownloadButton content={csvReport} filename="keyword-density.csv" mimeType="text/csv" label={ui.download || "Download CSV"} />
              </>
            )}
            <ResetButton onReset={() => { setText(""); setAnalysis(null); }} />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
