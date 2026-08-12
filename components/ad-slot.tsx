"use client";

import { useEffect } from "react";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "in-content" | "footer";
  className?: string;
  slotId?: string;
}

// Slot IDs per placement — update these from your AdSense dashboard if needed
const SLOT_IDS: Record<string, string> = {
  banner:        "3850025420",
  "in-content":  "3850025420",
  sidebar:       "3850025420",
  footer:        "1611016987",
};

export function AdSlot({ variant = "banner", className = "", slotId }: AdSlotProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // adsbygoogle not yet loaded — safe to ignore
    }
  }, []);

  const resolvedSlot = slotId || SLOT_IDS[variant] || SLOT_IDS["banner"];

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4705897632786514"
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
