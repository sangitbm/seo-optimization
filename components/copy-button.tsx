"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  /** @deprecated — no longer used; copies are immediate. Kept for API compatibility. */
  showAd?: boolean;
}

export function CopyButton({
  text,
  label = "Copy",
  variant = "outline",
  size = "default",
  className = "",
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(text, label)}
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
  );
}
