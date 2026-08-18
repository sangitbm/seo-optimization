"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cookie, X, CheckCircle2, Settings2, ChevronDown, ChevronUp } from "lucide-react";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "seoutilities_cookie_consent";
export const CONSENT_CHANGE_EVENT = "seoutilities:consent-change";

function updateGoogleConsent(state: ConsentState) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state.analytics ? "granted" : "denied",
      ad_storage: state.advertising ? "granted" : "denied",
      ad_user_data: state.advertising ? "granted" : "denied",
      ad_personalization: state.advertising ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    advertising: false,
  });
  const pathname = usePathname();

  // Extract locale from pathname
  const lang = pathname?.split("/")[1] || "en";
  const privacyUrl = `/${lang}/privacy`;

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed.analytics === "boolean" &&
          typeof parsed.advertising === "boolean"
        ) {
          const restoredConsent: ConsentState = {
            necessary: true,
            analytics: parsed.analytics,
            advertising: parsed.advertising,
          };
          updateGoogleConsent(restoredConsent);
          return;
        }
      } catch {
        localStorage.removeItem(CONSENT_KEY);
      }
    }

    // Slight delay so banner doesn't flash immediately on load.
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...state, timestamp: Date.now() }));
    updateGoogleConsent(state);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setVisible(false);
  };

  const acceptAll = () => {
    const all: ConsentState = { necessary: true, analytics: true, advertising: true };
    setConsent(all);
    saveConsent(all);
  };

  const acceptNecessary = () => {
    const necessary: ConsentState = { necessary: true, analytics: false, advertising: false };
    setConsent(necessary);
    saveConsent(necessary);
  };

  const saveCustom = () => {
    saveConsent(consent);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      role="dialog"
      aria-label="Cookie Consent"
      aria-live="polite"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl ring-1 ring-inset ring-white/5">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
                <Cookie className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-semibold">We value your privacy</h2>
                <p className="text-xs text-muted-foreground">Cookie Preferences</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies. Read our{" "}
            <Link href={privacyUrl} className="text-violet-500 underline underline-offset-2 hover:text-violet-400 transition-colors">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>

          {/* Details toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings2 className="h-3.5 w-3.5" />
            Manage preferences
            {showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {/* Detailed controls */}
          {showDetails && (
            <div className="mb-5 space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
              {[
                {
                  key: "necessary" as const,
                  label: "Strictly Necessary",
                  desc: "Required for the website to function. Cannot be disabled.",
                  disabled: true,
                },
                {
                  key: "analytics" as const,
                  label: "Analytics",
                  desc: "Help us understand how visitors interact with our website (Google Analytics).",
                  disabled: false,
                },
                {
                  key: "advertising" as const,
                  label: "Advertising",
                  desc: "Used to serve personalized advertisements (Google AdSense).",
                  disabled: false,
                },
              ].map(({ key, label, desc, disabled }) => (
                <div key={key} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                  <button
                    disabled={disabled}
                    onClick={() => !disabled && setConsent(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                      consent[key]
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                        : "bg-muted-foreground/30"
                    } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    aria-label={`Toggle ${label} cookies`}
                    aria-checked={consent[key]}
                    role="switch"
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        consent[key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-end">
            <button
              onClick={acceptNecessary}
              className="order-3 sm:order-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-all"
            >
              Necessary Only
            </button>
            {showDetails && (
              <button
                onClick={saveCustom}
                className="order-2 rounded-xl border border-violet-500/40 px-4 py-2.5 text-sm font-medium text-violet-500 hover:bg-violet-500/10 transition-all"
              >
                Save Preferences
              </button>
            )}
            <button
              onClick={acceptAll}
              className="order-1 sm:order-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check consent status for other components
export function useCookieConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const readConsent = () => {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setConsent(null);
        return;
      }

      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed.analytics === "boolean" && typeof parsed.advertising === "boolean") {
          setConsent({
            necessary: true,
            analytics: parsed.analytics,
            advertising: parsed.advertising,
          });
        } else {
          setConsent(null);
        }
      } catch {
        setConsent(null);
      }
    };

    readConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, readConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, readConsent);
  }, []);

  return consent;
}
