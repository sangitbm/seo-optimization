"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookie-consent";

/**
 * AdSense must not receive an ad request until the visitor has explicitly
 * opted in to advertising. This also prevents empty ad slots from attempting
 * to initialize before the AdSense library is available.
 */
export function AdSenseLoader() {
  const consent = useCookieConsent();
  const cmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";

  // Keep advertising disabled until the publisher has configured a
  // Google-certified CMP in AdSense Privacy & messaging.
  if (!cmpReady || !consent?.advertising) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4705897632786514"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
