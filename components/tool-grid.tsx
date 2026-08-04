import { ToolCard } from "./tool-card";
import type { Tool } from "@/lib/tools-data";

interface ToolGridProps {
  tools: Tool[];
  className?: string;
}

export function ToolGrid({ tools, className = "" }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No tools found matching your search.
        </p>
        <p className="text-sm text-muted-foreground">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
