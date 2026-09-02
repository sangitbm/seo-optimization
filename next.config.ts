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
  async redirects() {
    return [
      {
        source: "/:lang(en|es|fr|de|it|pt)/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/:lang(en|es|fr|de|it|pt)",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
