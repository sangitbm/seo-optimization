import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent DNS prefetching for privacy
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Prevent clickjacking — this site should never be embedded in an iframe
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers from MIME-sniffing the content type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin as the referrer on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // NOTE: A Content-Security-Policy is intentionally omitted here.
  // Next.js (especially in dev with HMR) and AdSense both require a nonce-based
  // CSP to work without breaking stylesheet/script loading. A nonce-based CSP
  // requires Next.js middleware and is a separate implementation effort.
  // The high-severity XSS risks are already mitigated by:
  //   - safeJsonLd() escaping </ sequences in all JSON-LD script tags
  //   - URL validation in sitemap generator blocking javascript: URIs
  //   - React's built-in JSX escaping for all rendered content
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
