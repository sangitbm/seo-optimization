"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/cookie-consent";

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
  const consent = useCookieConsent();
  const cmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";

  useEffect(() => {
    if (!cmpReady || !consent?.advertising) return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // adsbygoogle not yet loaded — safe to ignore
    }
  }, [cmpReady, consent?.advertising]);

  const resolvedSlot = slotId || SLOT_IDS[variant] || SLOT_IDS["banner"];

  // Show compact ad on mobile for banner/footer (required for AdSense approval).
  // Keep sidebar/in-content desktop only as they are large and intrusive on mobile.
  const sizeClasses = {
    banner:       "flex w-full max-h-[60px] md:max-h-[100px] overflow-hidden justify-center",
    sidebar:      "hidden lg:flex w-full min-h-[250px] justify-center",
    "in-content": "hidden md:flex w-full justify-center max-h-[250px]",
    footer:       "flex w-full max-h-[60px] md:max-h-[100px] overflow-hidden justify-center",
  };

  const adFormat = (variant === "banner" || variant === "footer") ? "horizontal" : "auto";

  // Do not create an ad request before the visitor opts in to advertising.
  if (!cmpReady || !consent?.advertising) return null;

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
