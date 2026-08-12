"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Download, QrCode, Smartphone, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import LZString from "lz-string";
import Link from "next/link";

const tool = getToolBySlug("social-profile-generator")!;

type Platform = "tw" | "ig" | "li" | "yt" | "gh" | "fb" | "web";

const PLATFORMS: { id: Platform; label: string; prefix: string; placeholder: string }[] = [
  { id: "tw", label: "Twitter / X", prefix: "x.com/", placeholder: "username" },
  { id: "ig", label: "Instagram", prefix: "instagram.com/", placeholder: "username" },
  { id: "li", label: "LinkedIn", prefix: "linkedin.com/in/", placeholder: "username" },
  { id: "yt", label: "YouTube", prefix: "youtube.com/@", placeholder: "channel" },
  { id: "gh", label: "GitHub", prefix: "github.com/", placeholder: "username" },
  { id: "fb", label: "Facebook", prefix: "facebook.com/", placeholder: "username" },
  { id: "web", label: "Website", prefix: "https://", placeholder: "example.com" },
];

export function SocialProfileGenerator({ dict }: { dict?: any }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState<"dark" | "light" | "colorful">("dark");
  const [links, setLinks] = useState<{ id: string; p: Platform; u: string }[]>([
    { id: "1", p: "tw", u: "" }
  ]);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [bioUrl, setBioUrl] = useState<string>("");

  const addLink = () => {
    if (links.length >= 7) return; // Limit to 7 links to keep QR code scannable
    setLinks([...links, { id: Math.random().toString(36).substring(7), p: "ig", u: "" }]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const updateLink = (id: string, field: "p" | "u", value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  useEffect(() => {
    generateBioLink();
  }, [name, bio, theme, links]);

  const generateBioLink = async () => {
    // Filter out empty links
    const validLinks = links.filter(l => l.u.trim() !== "");
    
    // Create compact payload
    const payload = {
      n: name.trim(),
      b: bio.trim(),
      t: theme,
      l: validLinks.map(l => ({ p: l.p, u: l.u.trim() }))
    };

    // If completely empty, clear QR
    if (!payload.n && validLinks.length === 0) {
      setQrDataUrl("");
      setBioUrl("");
      return;
    }

    const jsonString = JSON.stringify(payload);
    // Compress and encode for URL
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    
    // Build URL (using window.location.origin to get the current domain)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://seoopti.vercel.app";
    const fullUrl = `${baseUrl}/bio?d=${compressed}`;
    setBioUrl(fullUrl);

    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(fullUrl, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" }
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("Error generating QR:", err);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `link-in-bio-${name ? name.replace(/\s+/g, '-').toLowerCase() : "profile"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolLayout 
      tool={tool} 
      seoTips={[
        "Keep your bio concise (under 150 characters) to ensure the QR code remains easy to scan.",
        "Only add your most important links. Too many links can overwhelm visitors and make the QR code denser.",
        "Print your QR code with high contrast (black on white) for the best scanning reliability.",
      ]} 
      faqs={[
        { question: "Is this really free?", answer: "Yes! There are no premium features or subscriptions. It runs entirely in your browser." },
        { question: "Do you store my data?", answer: "No. Your profile data is compressed and stored entirely inside the QR code URL. We have no database and cannot see your links." },
        { question: "Can I update my links later?", answer: "Because we don't store your data, you cannot edit an existing QR code. If you need to change a link, you will need to generate a new QR code." }
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Editor Side */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your Name or Brand" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="A quick intro about who you are and what you do..." 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={150}
                  className="resize-none h-20"
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/150</p>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    onClick={() => setTheme("dark")}
                    className="w-full"
                  >Dark</Button>
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    onClick={() => setTheme("light")}
                    className="w-full"
                  >Light</Button>
                  <Button 
                    variant={theme === "colorful" ? "default" : "outline"} 
                    onClick={() => setTheme("colorful")}
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0 hover:from-violet-600 hover:to-fuchsia-600"
                  >Colorful</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Social Links</CardTitle>
              <Button variant="outline" size="sm" onClick={addLink} disabled={links.length >= 7}>
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {links.map((link, index) => {
                const platform = PLATFORMS.find(p => p.id === link.p)!;
                return (
                  <div key={link.id} className="flex gap-2 items-start bg-muted/30 p-3 rounded-lg border border-border/50">
                    <div className="flex-1 space-y-2">
                      <Select value={link.p} onValueChange={(val: Platform) => updateLink(link.id, "p", val)}>
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PLATFORMS.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex relative items-center">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground text-sm font-medium z-10">
                          {platform.prefix}
                        </div>
                        <Input 
                          value={link.u}
                          onChange={(e) => updateLink(link.id, "u", e.target.value)}
                          placeholder={platform.placeholder}
                          className="bg-background relative"
                          style={{ paddingLeft: `calc(1rem + ${platform.prefix.length * 7.5}px)` }}
                        />
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive mt-1 shrink-0"
                      onClick={() => removeLink(link.id)}
                      disabled={links.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Preview / QR Side */}
        <div className="space-y-6">
          <Card className="sticky top-24 overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/5">
            <div className="bg-primary/5 p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-primary">Your QR Code</h3>
              </div>
              {bioUrl && (
                <Link href={bioUrl} target="_blank" className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  Preview <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
            <CardContent className="p-6 flex flex-col items-center">
              {qrDataUrl ? (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-6 w-full max-w-[280px] aspect-square flex items-center justify-center border">
                    <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                  <Button onClick={downloadQR} className="w-full gap-2 font-semibold" size="lg">
                    <Download className="h-5 w-5" /> Download QR Code (PNG)
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                  <Smartphone className="h-12 w-12 mb-4 opacity-20" />
                  <p>Start typing your name or adding links to generate your QR Code.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
