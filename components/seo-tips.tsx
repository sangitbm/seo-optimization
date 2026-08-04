import { Lightbulb } from "lucide-react";

interface SEOTipsProps {
  tips: string[];
}

export function SEOTips({ tips }: SEOTipsProps) {
  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
          <Lightbulb className="h-4 w-4 text-violet-500" />
        </div>
        <h3 className="font-semibold">SEO Tips</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
