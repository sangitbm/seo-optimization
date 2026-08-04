"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownload } from "@/hooks/use-download";
import { SkippableAdModal } from "@/components/skippable-ad-modal";

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  showAd?: boolean;
}

export function DownloadButton({
  content,
  filename,
  mimeType = "text/plain",
  label = "Download",
  variant = "outline",
  className = "",
  showAd = true,
}: DownloadButtonProps) {
  const { download } = useDownload();
  const [isAdOpen, setIsAdOpen] = useState(false);

  const handleDownload = () => {
    download(content, filename, mimeType);
  };

  const handleClick = () => {
    if (showAd) {
      setIsAdOpen(true);
    } else {
      handleDownload();
    }
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleClick}
        className={`gap-2 ${className}`}
      >
        <Download className="h-4 w-4" />
        {label}
      </Button>

      <SkippableAdModal
        isOpen={isAdOpen}
        onClose={() => setIsAdOpen(false)}
        onContinue={handleDownload}
        title="Downloading Your File"
        description="Your file will be downloaded after this short sponsored message. Thanks for supporting free SEO tools!"
        actionLabel="Download"
        skipDelay={3}
      />
    </>
  );
}

