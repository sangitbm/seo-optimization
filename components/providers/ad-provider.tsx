"use client";

import React, { createContext, useContext, useCallback } from "react";

interface AdContextType {
  showAd: (onComplete: () => void) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

/**
 * AdProvider — passthrough implementation.
 *
 * The previous version showed a forced interstitial/pre-roll dialog before
 * user actions (generate, copy, download), which violates Google AdSense
 * Program Policies:
 *   - "publishers may not display the ads for a preset time (i.e. pre-roll),
 *     before users can view content such as videos, games or downloads."
 *   - Publishers may not use deceptive implementation methods that place ads
 *     in a way that might be mistaken for navigation or action triggers.
 *
 * showAd() now executes the callback immediately with no interstitial.
 * Ads are served via standard AdSlot placements (banner, sidebar, in-content)
 * which comply with AdSense placement policies.
 */
export function AdProvider({ children }: { children: React.ReactNode }) {
  const showAd = useCallback((onComplete: () => void) => {
    // Execute the action immediately — no pre-roll interstitial.
    onComplete();
  }, []);

  return (
    <AdContext.Provider value={{ showAd }}>
      {children}
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
