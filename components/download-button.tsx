"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownload } from "@/hooks/use-download";

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  /** @deprecated — no longer used; downloads are immediate. Kept for API compatibility. */
  showAd?: boolean;
}

export function DownloadButton({
  content,
  filename,
  mimeType = "text/plain",
  label = "Download",
  variant = "outline",
  className = "",
}: DownloadButtonProps) {
  const { download } = useDownload();

  return (
    <Button
      variant={variant}
      onClick={() => download(content, filename, mimeType)}
      className={`gap-2 ${className}`}
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}
