import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely serialises a value for use inside a <script type="application/ld+json">
 * injected via dangerouslySetInnerHTML.
 *
 * JSON.stringify does NOT escape the "</script>" sequence, so a value that
 * contains that literal string would break out of the script context and allow
 * arbitrary HTML/JS injection. The fix is to replace "</" with "<\/" which is
 * valid JSON and safe inside HTML script tags (per the HTML spec §8.1.2.6).
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
