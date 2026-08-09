"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdContextType {
  showAd: (onComplete: () => void) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export function AdProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const showAd = useCallback((onComplete: () => void) => {
    setPendingCallback(() => onComplete);
    setCountdown(5);
    setIsOpen(true);
  }, []);

  const handleSkip = () => {
    if (countdown > 0) return;
    setIsOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown]);

  return (
    <AdContext.Provider value={{ showAd }}>
      {children}
      <Dialog open={isOpen} onOpenChange={() => { /* disable clicking outside to close */ }}>
        <DialogContent showCloseButton={false} className="sm:max-w-[600px] p-0 overflow-hidden hide-close">
          {/* Hide the default close button for strict ad view */}
          <DialogTitle className="sr-only">Advertisement</DialogTitle>
          <DialogDescription className="sr-only">Please wait to skip the advertisement</DialogDescription>
          
          <div className="flex flex-col h-[400px]">
            {/* Ad Content */}
            <div className="flex-1 bg-muted flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
              <div className="bg-white/80 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Advertisement
              </div>
              <h3 className="text-2xl font-bold mb-2">Space Available</h3>
              <p className="text-muted-foreground max-w-[300px]">
                Your ad could be here. Reach thousands of SEO professionals and web developers daily.
              </p>
              <div className="mt-8 animate-pulse text-sm text-indigo-500 font-medium">
                Placeholder for AdSense
              </div>
            </div>

            {/* Footer with Skip Button */}
            <div className="p-4 bg-background border-t border-border flex justify-end items-center">
              <Button 
                onClick={handleSkip} 
                disabled={countdown > 0}
                variant={countdown > 0 ? "secondary" : "default"}
                className={`min-w-[120px] transition-all ${countdown === 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg' : ''}`}
              >
                {countdown > 0 ? `Skip Ad in ${countdown}s` : "Skip Ad >>"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdContext.Provider>
  );
}

export function useAd() {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error("useAd must be used within an AdProvider");
  }
  return context;
}
