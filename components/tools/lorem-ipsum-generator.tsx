"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { FileText, AlignLeft, LayoutTemplate } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", 
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", 
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", 
  "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", 
  "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", 
  "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export function LoremIpsumGenerator() {
  const tool = getToolBySlug("lorem-ipsum-generator")!;
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "words" | "lists">("paragraphs");
  const [output, setOutput] = useState("");

  const generateLoremIpsum = () => {
    let result = "";

    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
    
    const generateSentence = (wordCount: number) => {
      let sentence = "";
      for (let i = 0; i < wordCount; i++) {
        const word = getRandomWord();
        if (i === 0) {
          sentence += word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          sentence += " " + word;
        }
      }
      return sentence + ".";
    };

    const generateParagraph = (sentenceCount: number) => {
      let p = "";
      for (let i = 0; i < sentenceCount; i++) {
        // random words per sentence (between 6 and 12)
        const wordCount = Math.floor(Math.random() * 7) + 6;
        p += generateSentence(wordCount) + " ";
      }
      return p.trim();
    };

    if (type === "paragraphs") {
      for (let i = 0; i < count; i++) {
        // random sentences per paragraph (between 4 and 8)
        const sentenceCount = Math.floor(Math.random() * 5) + 4;
        result += generateParagraph(sentenceCount);
        if (i < count - 1) result += "\n\n";
      }
    } else if (type === "words") {
      for (let i = 0; i < count; i++) {
        result += getRandomWord();
        if (i < count - 1) result += " ";
      }
      // Capitalize first word
      result = result.charAt(0).toUpperCase() + result.slice(1) + ".";
    } else if (type === "lists") {
      for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 4) + 2;
        let listItem = "";
        for (let j = 0; j < wordCount; j++) {
          listItem += getRandomWord() + " ";
        }
        result += "- " + listItem.trim() + "\n";
      }
    }

    setOutput(result);
  };

  // Generate initial content
  useState(() => {
    generateLoremIpsum();
  });

  return (
    <ToolLayout tool={tool} seoTips={[]} faqs={[]}>
      <div className="mx-auto max-w-4xl space-y-8">
        
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-end">
            
            <div className="space-y-3 flex-1 w-full">
              <Label className="text-sm font-semibold">How many?</Label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500"
              />
            </div>

            <div className="space-y-3 flex-1 w-full">
              <Label className="text-sm font-semibold">Type</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="words">Words</option>
                <option value="lists">List Items</option>
              </select>
            </div>

            <Button 
              onClick={generateLoremIpsum}
              className="h-12 px-8 bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto"
            >
              Generate
            </Button>
          </div>
        </div>

        <div className="relative rounded-2xl border border-border/50 bg-muted/30 p-6 min-h-[400px]">
          {output ? (
            <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed">
              {output}
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center text-muted-foreground">
              Click Generate to create dummy text.
            </div>
          )}
          
          {output && (
            <div className="absolute top-4 right-4">
              <CopyButton text={output} />
            </div>
          )}
        </div>

      </div>
    </ToolLayout>
  );
}
