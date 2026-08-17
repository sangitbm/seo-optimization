"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, Copy, Clock, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { ResetButton } from "@/components/reset-button";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("jwt-decoder")!;

const seoTips = [
  "Never share your JWT tokens publicly — they may contain sensitive user data.",
  "Always verify JWT expiry (exp claim) before trusting a token.",
  "Use short-lived JWTs (minutes to hours) for security; refresh them with a refresh token.",
  "The signature part of a JWT can only be verified server-side with the secret key.",
  "JWTs are Base64URL encoded, not encrypted — do not store sensitive data in the payload.",
];

const faqs = [
  { question: "Is it safe to paste my JWT here?", answer: "Yes. This tool works 100% in your browser. Your token is never sent to any server. However, avoid sharing JWTs from production systems publicly." },
  { question: "Can this tool verify the JWT signature?", answer: "No. Signature verification requires the secret key, which must stay on your server. This tool only decodes and inspects the readable parts of the token." },
  { question: "What does 'exp' mean in a JWT?", answer: "The 'exp' claim is the expiration time as a Unix timestamp. This tool automatically converts it to a human-readable date." },
];

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return JSON.parse(atob(str));
}

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleString();
}

function isExpired(exp?: number) {
  if (!exp) return false;
  return Date.now() / 1000 > exp;
}

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");

  const decode = () => {
    setError(""); setHeader(null); setPayload(null);
    const parts = input.trim().split(".");
    if (parts.length !== 3) { setError("Invalid JWT: must have exactly 3 parts separated by dots."); return; }
    try {
      const h = base64UrlDecode(parts[0]);
      const p = base64UrlDecode(parts[1]);
      setHeader(h); setPayload(p);
      toast.success("JWT decoded successfully!");
    } catch {
      setError("Failed to decode JWT. Make sure the token is valid and complete.");
    }
  };

  const copyJson = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    toast.success("Copied to clipboard!");
  };

  const expired = payload ? isExpired(payload.exp) : false;

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-violet-500" /> Paste JWT Token</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
              className="min-h-[100px] font-mono text-sm"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-950/30 rounded-lg p-3">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={decode} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90">
                <ShieldCheck className="h-4 w-4 mr-2" /> Decode JWT
              </Button>
              <ResetButton onReset={() => { setInput(""); setHeader(null); setPayload(null); setError(""); }} />
            </div>
          </CardContent>
        </Card>

        {payload && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Status Banner */}
            <div className={`md:col-span-2 flex items-center gap-3 rounded-xl border p-4 ${expired ? "border-red-300 bg-red-50 dark:bg-red-950/30" : "border-green-300 bg-green-50 dark:bg-green-950/30"}`}>
              {expired ? (
                <><AlertTriangle className="h-5 w-5 text-red-500" /><span className="font-semibold text-red-600 dark:text-red-400">Token Expired</span><span className="text-sm text-muted-foreground">— expired on {formatDate(payload.exp)}</span></>
              ) : (
                <><CheckCircle2 className="h-5 w-5 text-green-500" /><span className="font-semibold text-green-600 dark:text-green-400">Token Valid</span>{payload.exp && <span className="text-sm text-muted-foreground ml-2">— expires {formatDate(payload.exp)}</span>}</>
              )}
            </div>


            {/* Quick Claims */}
            <Card>
              <CardHeader><CardTitle className="text-base">Quick Info</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {payload.sub && <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Subject:</span><span className="font-mono font-medium">{payload.sub}</span></div>}
                {header?.alg && <div className="flex items-center gap-2"><Key className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Algorithm:</span><span className="font-mono font-medium">{header.alg}</span></div>}
                {payload.iat && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Issued At:</span><span className="font-medium">{formatDate(payload.iat)}</span></div>}
                {payload.exp && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Expires:</span><span className="font-medium">{formatDate(payload.exp)}</span></div>}
              </CardContent>
            </Card>

            {/* Header */}
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Header</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => copyJson(header)}><Copy className="h-3.5 w-3.5" /></Button>
              </CardHeader>
              <CardContent><pre className="text-xs font-mono bg-muted/50 rounded-lg p-3 overflow-auto">{JSON.stringify(header, null, 2)}</pre></CardContent>
            </Card>

            {/* Payload */}
            <Card className="md:col-span-2">
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Payload</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => copyJson(payload)}><Copy className="h-3.5 w-3.5" /></Button>
              </CardHeader>
              <CardContent><pre className="text-xs font-mono bg-muted/50 rounded-lg p-3 overflow-auto max-h-64">{JSON.stringify(payload, null, 2)}</pre></CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
