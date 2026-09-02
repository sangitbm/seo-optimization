import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { WordCounter } from "@/components/tools/word-counter";

const tool = getToolBySlug("word-counter")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function WordCounterPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <WordCounter />
    </>
  );
}
