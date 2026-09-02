"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Type, Hash, AlignLeft, BarChart } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { getToolBySlug } from "@/lib/tools-data";

export function WordCounter() {
  const tool = getToolBySlug("word-counter")!;
  const [text, setText] = useState("");

  const getStats = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return { words: 0, characters: 0, charactersNoSpaces: 0, paragraphs: 0, sentences: 0 };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    
    // Better word count that handles line breaks and multiple spaces
    const words = trimmedText.split(/\s+/).filter((word) => word.length > 0).length;
    
    const paragraphs = trimmedText.split(/\n+/).filter((p) => p.trim().length > 0).length;
    
    // Basic sentence splitting (periods, exclamation marks, question marks)
    const sentences = trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    return { words, characters, charactersNoSpaces, paragraphs, sentences };
  };

  const stats = getStats();

  // Keyword density map
  const getKeywordDensity = () => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3); // Only words > 3 chars

    const counts: Record<string, number> = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  const keywords = getKeywordDensity();

  return (
    <ToolLayout tool={tool} content={toolContent["word-counter"]} seoTips={[]} faqs={[]}>
      <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-base font-semibold">
            Type or paste your text
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setText("")}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="mr-1.5 h-3 w-3" />
            Clear
          </Button>
        </div>
        
        <Textarea
          id="text-input"
          placeholder="Start typing or paste your text here..."
          className="min-h-[400px] resize-y p-4 text-base leading-relaxed"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-border/50 bg-muted/30 overflow-hidden">
          <div className="border-b border-border/50 bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BarChart className="h-4 w-4" />
              Text Statistics
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-border/50">
            <div className="bg-background p-4 text-center">
              <p className="text-3xl font-bold text-violet-500">{stats.words}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Words</p>
            </div>
            <div className="bg-background p-4 text-center">
              <p className="text-3xl font-bold text-violet-500">{stats.characters}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Characters</p>
            </div>
            <div className="bg-background p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.sentences}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Sentences</p>
            </div>
            <div className="bg-background p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.paragraphs}</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Paragraphs</p>
            </div>
          </div>
          
          <div className="bg-background p-4 border-t border-border/50 text-center">
             <p className="text-lg font-bold text-foreground">{stats.charactersNoSpaces}</p>
             <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Characters (No Spaces)</p>
          </div>
        </div>

        {keywords.length > 0 && (
          <div className="rounded-xl border border-border/50 bg-muted/30 overflow-hidden">
            <div className="border-b border-border/50 bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Type className="h-4 w-4" />
                Top Keywords
              </div>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-border/50">
                {keywords.map(([word, count]) => (
                  <li key={word} className="flex items-center justify-between px-4 py-2.5 text-sm bg-background">
                    <span className="font-medium">{word}</span>
                    <span className="flex items-center justify-center rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-semibold text-violet-600">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  </ToolLayout>
  );
}
