"use client";

import { CopyButton } from "./copy-button";

interface CodePreviewProps {
  code: string;
  language?: string;
  label?: string;
  className?: string;
}

export function CodePreview({
  code,
  language = "html",
  label = "Output",
  className = "",
}: CodePreviewProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <CopyButton text={code} label="Copy" size="sm" />
      </div>
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/50">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
