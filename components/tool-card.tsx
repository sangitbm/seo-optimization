import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools-data";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 transition-colors group-hover:from-violet-600/20 group-hover:to-indigo-600/20">
        <tool.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
      </div>

      {/* Content */}
      <h3 className="mb-2 font-semibold tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
        {tool.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {tool.shortDescription}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {tool.category}
        </Badge>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
      </div>
    </Link>
  );
}
