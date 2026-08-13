"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LZString from "lz-string";
import { ExternalLink, UserCircle2, AlertCircle } from "lucide-react";

type Platform = "tw" | "ig" | "li" | "yt" | "gh" | "fb" | "tk" | "web";

const PLATFORMS: Record<Platform, { label: string; urlPrefix: string; color: string; icon: string }> = {
  tw: { label: "X (Twitter)", urlPrefix: "https://x.com/", color: "bg-black text-white hover:bg-zinc-800", icon: "X" },
  ig: { label: "Instagram", urlPrefix: "https://instagram.com/", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90", icon: "Ig" },
  tk: { label: "TikTok", urlPrefix: "https://tiktok.com/@", color: "bg-black text-white border border-gray-700 hover:bg-zinc-900", icon: "Tk" },
  li: { label: "LinkedIn", urlPrefix: "https://linkedin.com/in/", color: "bg-[#0077b5] text-white hover:bg-[#006097]", icon: "In" },
  yt: { label: "YouTube", urlPrefix: "https://youtube.com/@", color: "bg-[#ff0000] text-white hover:bg-[#cc0000]", icon: "Yt" },
  gh: { label: "GitHub", urlPrefix: "https://github.com/", color: "bg-[#333] text-white hover:bg-[#111]", icon: "Gh" },
  fb: { label: "Facebook", urlPrefix: "https://facebook.com/", color: "bg-[#1877f2] text-white hover:bg-[#1464cc]", icon: "Fb" },
  web: { label: "Website", urlPrefix: "https://", color: "bg-violet-600 text-white hover:bg-violet-700", icon: "W" },
};

interface ProfileData {
  n: string; // name
  b: string; // bio
  t: "dark" | "light" | "colorful"; // theme
  l: Array<{ p: Platform; u: string; n?: string }>;
  a?: string; // avatar base64
}

function BioContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const d = searchParams.get("d");
    if (!d) {
      setError(true);
      return;
    }

    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(d);
      if (!decompressed) throw new Error("Decompression failed");
      const parsed = JSON.parse(decompressed);
      if (!parsed.n && (!parsed.l || parsed.l.length === 0)) throw new Error("Invalid data");
      setData(parsed);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-xl font-bold mb-2">Invalid Profile Link</h1>
        <p className="text-muted-foreground">The QR code or link you followed is invalid or corrupted.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-muted rounded-full mb-4"></div>
          <div className="w-48 h-6 bg-muted rounded mb-2"></div>
          <div className="w-64 h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const isDark = data.t === "dark";
  const isColorful = data.t === "colorful";

  const containerClass = isColorful
    ? "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white"
    : isDark
    ? "min-h-screen bg-[#111] text-white"
    : "min-h-screen bg-[#f9fafb] text-[#111]";

  const cardClass = isColorful
    ? "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20"
    : isDark
    ? "bg-[#222] border border-[#333] text-white hover:bg-[#333]"
    : "bg-white border border-gray-200 text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300";

  return (
    <div className={containerClass}>
      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-1 mb-6 shadow-xl">
          <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${isColorful ? 'bg-white/20 backdrop-blur-md' : isDark ? 'bg-[#111]' : 'bg-white'}`}>
            {data.a ? (
              <img src={data.a} alt={data.n || "Profile"} className="w-full h-full object-cover" />
            ) : (
              <UserCircle2 className={`w-12 h-12 ${isColorful ? 'text-white' : isDark ? 'text-white' : 'text-gray-400'}`} />
            )}
          </div>
        </div>

        {/* Profile Info */}
        <h1 className="text-2xl font-bold mb-2 text-center break-words w-full px-4">{data.n}</h1>
        {data.b && (
          <p className={`text-center mb-8 px-4 text-sm break-words w-full ${isColorful ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {data.b}
          </p>
        )}

        {/* Links */}
        <div className="w-full space-y-4">
          {data.l.map((link, idx) => {
            const platform = PLATFORMS[link.p];
            if (!platform) return null;

            // Secure URL construction
            let href = "";
            if (link.p === "web") {
              href = link.u.startsWith("http") ? link.u : `https://${link.u}`;
            } else {
              href = `${platform.urlPrefix}${link.u.replace(/^@/, '')}`;
            }

            return (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center p-4 rounded-xl transition-all duration-300 group ${cardClass}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${platform.color}`}>
                  {platform.icon}
                </div>
                <span className="flex-1 text-center font-medium mr-10 group-hover:scale-105 transition-transform duration-300">
                  {link.n || platform.label}
                </span>
                <ExternalLink className={`absolute right-4 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity ${isColorful ? 'text-white' : isDark ? 'text-white' : 'text-gray-400'}`} />
              </a>
            );
          })}
        </div>

        {/* Branding */}
        <a 
          href="https://seoopti.vercel.app" 
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-16 text-xs flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity ${isColorful ? 'text-white' : isDark ? 'text-white' : 'text-gray-500'}`}
        >
          Made with SEO Utilities
        </a>
      </div>
    </div>
  );
}

export default function BioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BioContent />
    </Suspense>
  );
}
