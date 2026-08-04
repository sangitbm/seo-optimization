"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowRight, Heart, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ad-slot";

interface SkippableAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title?: string;
  description?: string;
  skipDelay?: number; // in seconds, default 3
  actionLabel?: string;
}

export function SkippableAdModal({
  isOpen,
  onClose,
  onContinue,
  title = "Supporting Free SEO Tools",
  description = "Please wait a brief moment while we prepare your output. Ads keep our utilities 100% free.",
  skipDelay = 3,
  actionLabel = "Continue",
}: SkippableAdModalProps) {
  const [timeLeft, setTimeLeft] = useState(skipDelay);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(skipDelay);
      return;
    }

    setTimeLeft(skipDelay);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, skipDelay]);

  const handleSkip = () => {
    onContinue();
    onClose();
  };

  const progressPercent = ((skipDelay - timeLeft) / skipDelay) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6 sm:max-w-lg border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-center sm:text-left">
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>Sponsored Message</span>
          </div>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Ad display area */}
        <div className="my-4 overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-2 min-h-[250px] flex items-center justify-center">
          <AdSlot variant="in-content" />
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action button */}
        <div className="mt-2 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {timeLeft > 0
              ? `You can skip this ad in ${timeLeft} second${timeLeft === 1 ? "" : "s"}...`
              : "Ready to proceed!"}
          </p>

          <Button
            onClick={handleSkip}
            disabled={timeLeft > 0}
            className="w-full sm:w-auto gap-2 font-medium transition-all"
            variant={timeLeft > 0 ? "secondary" : "default"}
          >
            {timeLeft > 0 ? (
              <>
                <Clock className="h-4 w-4 animate-pulse" />
                Skip Ad in {timeLeft}s
              </>
            ) : (
              <>
                Skip Ad & {actionLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
