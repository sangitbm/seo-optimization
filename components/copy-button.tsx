"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { SkippableAdModal } from "@/components/skippable-ad-modal";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showAd?: boolean;
}

export function CopyButton({
  text,
  label = "Copy",
  variant = "outline",
  size = "default",
  className = "",
  showAd = size !== "icon" && size !== "sm",
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const [isAdOpen, setIsAdOpen] = useState(false);

  const handleCopy = () => {
    copy(text, label);
  };

  const handleClick = () => {
    if (showAd && !copied) {
      setIsAdOpen(true);
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={`gap-2 transition-all ${className}`}
        disabled={copied}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {size !== "icon" && label}
          </>
        )}
      </Button>

      <SkippableAdModal
        isOpen={isAdOpen}
        onClose={() => setIsAdOpen(false)}
        onContinue={handleCopy}
        title="Copying Your Content"
        description="Your content will be copied after this short sponsored message. Thanks for supporting free SEO tools!"
        actionLabel="Copy"
        skipDelay={3}
      />
    </>
  );
}

