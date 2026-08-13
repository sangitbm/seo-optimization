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

  // Constrain sizes on mobile so they don't take up the whole screen
  const sizeClasses = {
    banner: "w-full max-h-[100px] overflow-hidden flex justify-center", // Force horizontal banner on mobile
    sidebar: "w-full min-h-[250px] flex justify-center", // standard square/vertical on desktop
    "in-content": "w-full flex justify-center max-h-[250px]", // Limit height on mobile
    footer: "w-full max-h-[100px] overflow-hidden flex justify-center",
  };

  const adFormat = (variant === "banner" || variant === "footer") ? "horizontal" : "auto";

  return (
    <div className={`${sizeClasses[variant]} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-4705897632786514"
        data-ad-slot={resolvedSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
