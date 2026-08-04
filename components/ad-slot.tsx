"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "in-content" | "footer";
  className?: string;
  slotId?: string;
}

export function AdSlot({ variant = "banner", className = "", slotId }: AdSlotProps) {
  const sizeClasses = {
    banner: "min-h-[90px] w-full",
    sidebar: "min-h-[250px] w-full lg:w-[300px]",
    "in-content": "min-h-[250px] w-full",
    footer: "min-h-[90px] w-full",
  };

  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    try {
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense initialization error:", err);
    }
  }, []);

  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`flex flex-col items-center justify-center border border-dashed border-border/80 bg-muted/40 p-4 text-center rounded-lg ${sizeClasses[variant]} ${className}`}
        aria-label="Advertisement Placeholder (Dev Mode)"
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          AdSense Slot ({variant})
        </span>
        <span className="text-[11px] text-muted-foreground mt-1 max-w-xs">
          Ads do not render on localhost. They will display in production once your domain status is "Ready" in AdSense.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-lg ${sizeClasses[variant]} ${className}`}
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-4705897632786514"
        data-ad-slot={slotId || "1611016987"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

