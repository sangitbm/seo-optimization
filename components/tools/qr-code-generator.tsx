"use client";

import { useState, useEffect, useRef } from "react";
import { Download, QrCode, Link2, Wifi, Contact, Mail, MessageSquare, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("qr-code-generator")!;

const seoTips = [
  "QR codes on printed materials should be at least 2cm x 2cm for reliable scanning.",
  "Test your QR code with multiple smartphone cameras and scanning apps before publishing.",
  "High contrast between foreground (dark) and background (light) ensures faster scanning.",
  "Use URL shorteners if encoding long URLs — simpler QR codes scan more easily.",
  "Add UTM tracking parameters to your URL to measure offline-to-online conversion traffic.",
];

const faqs = [
  { question: "Are these QR codes free for commercial use?", answer: "Yes! All generated QR codes are static and completely free for personal and commercial use without expiration." },
  { question: "What formats can I download?", answer: "You can download QR codes as PNG (raster) for web use or SVG (vector) for print use at any size without quality loss." },
  { question: "Can I track scans on these QR codes?", answer: "Since these are static QR codes that encode your data directly, they do not include built-in tracking. You can track scans by using a URL shortener or adding UTM parameters to your web links." },
];

export function QRCodeGeneratorTool() {
  const dict: any = {};
  const [activeTab, setActiveTab] = useState("url");
  
  // Settings
  const [size, setSize] = useState("256");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  
  // Payloads
  const [text, setText] = useState("https://example.com");
  
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardCompany, setVcardCompany] = useState("");
  const [vcardTitle, setVcardTitle] = useState("");
  const [vcardWebsite, setVcardWebsite] = useState("");

  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  const [waPhone, setWaPhone] = useState("");
  const [waMessage, setWaMessage] = useState("");

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrSvg, setQrSvg] = useState<string>("");

  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.qr_code_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const getQrPayload = () => {
    switch (activeTab) {
      case "url":
        return text;
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};;`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardCompany}\nTITLE:${vcardTitle}\nURL:${vcardWebsite}\nEND:VCARD`;
      case "email":
        return `MATMSG:TO:${emailTo};SUB:${emailSubject};BODY:${emailBody};;`;
      case "sms":
        return `SMSTO:${smsPhone}:${smsMessage}`;
      case "whatsapp":
        return `https://wa.me/${waPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage)}`;
      default:
        return text;
    }
  };

  const generateQR = async () => {
    const payload = getQrPayload();
    if (!payload.trim()) {
      setQrDataUrl("");
      setQrSvg("");
      return;
    }
    try {
      const QRCode = (await import("qrcode")).default;
      const sizeNum = parseInt(size);

      const dataUrl = await QRCode.toDataURL(payload, {
        width: sizeNum,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);

      const svgStr = await QRCode.toString(payload, {
        type: "svg",
        width: sizeNum,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      });
      setQrSvg(svgStr);
    } catch {
      toast.error("Failed to generate QR code");
    }
  };

  const handleChange = () => {
    setQrDataUrl("");
    setQrSvg("");
  };

  const handleGenerateClick = async () => {
    await generateQR();
    toast.success("QR Code generated!");
  };

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
    toast.success("QR code PNG downloaded!");
  };

  const downloadSVG = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("QR code SVG downloaded!");
  };

  const resetAll = () => {
    setText("");
    setWifiSsid(""); setWifiPassword("");
    setVcardName(""); setVcardPhone(""); setVcardEmail(""); setVcardCompany(""); setVcardTitle(""); setVcardWebsite("");
    setEmailTo(""); setEmailSubject(""); setEmailBody("");
    setSmsPhone(""); setSmsMessage("");
    setWaPhone(""); setWaMessage("");
    setQrDataUrl(""); setQrSvg("");
  };

  return (
    <ToolLayout tool={tool} content={toolContent["qr-code-generator"]} seoTips={toolSeoTips} faqs={toolFaqs}>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Content Settings</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); handleChange(); }} className="w-full">
                <TabsList className="flex flex-wrap h-auto gap-2 p-1 bg-muted/50 mb-6 justify-start">
                  <TabsTrigger value="url" className="gap-2"><Link2 className="w-4 h-4" /> URL</TabsTrigger>
                  <TabsTrigger value="vcard" className="gap-2"><Contact className="w-4 h-4" /> vCard</TabsTrigger>
                  <TabsTrigger value="wifi" className="gap-2"><Wifi className="w-4 h-4" /> Wi-Fi</TabsTrigger>
                  <TabsTrigger value="email" className="gap-2"><Mail className="w-4 h-4" /> Email</TabsTrigger>
                  <TabsTrigger value="sms" className="gap-2"><MessageSquare className="w-4 h-4" /> SMS</TabsTrigger>
                  <TabsTrigger value="whatsapp" className="gap-2"><Phone className="w-4 h-4" /> WhatsApp</TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Website URL or Text</Label>
                    <Input value={text} onChange={(e) => { setText(e.target.value); handleChange(); }} placeholder="https://example.com" className="h-12" />
                  </div>
                </TabsContent>

                <TabsContent value="vcard" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Full Name</Label><Input value={vcardName} onChange={(e) => { setVcardName(e.target.value); handleChange(); }} placeholder="John Doe" /></div>
                    <div className="space-y-2"><Label>Phone Number</Label><Input value={vcardPhone} onChange={(e) => { setVcardPhone(e.target.value); handleChange(); }} placeholder="+1 234 567 8900" /></div>
                    <div className="space-y-2"><Label>Email Address</Label><Input value={vcardEmail} onChange={(e) => { setVcardEmail(e.target.value); handleChange(); }} placeholder="john@example.com" /></div>
                    <div className="space-y-2"><Label>Company</Label><Input value={vcardCompany} onChange={(e) => { setVcardCompany(e.target.value); handleChange(); }} placeholder="Acme Inc" /></div>
                    <div className="space-y-2"><Label>Job Title</Label><Input value={vcardTitle} onChange={(e) => { setVcardTitle(e.target.value); handleChange(); }} placeholder="Software Engineer" /></div>
                    <div className="space-y-2"><Label>Website URL</Label><Input value={vcardWebsite} onChange={(e) => { setVcardWebsite(e.target.value); handleChange(); }} placeholder="https://example.com" /></div>
                  </div>
                </TabsContent>

                <TabsContent value="wifi" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2"><Label>Network Name (SSID)</Label><Input value={wifiSsid} onChange={(e) => { setWifiSsid(e.target.value); handleChange(); }} placeholder="MyWiFiNetwork" /></div>
                    <div className="space-y-2"><Label>Password</Label><Input type="password" value={wifiPassword} onChange={(e) => { setWifiPassword(e.target.value); handleChange(); }} placeholder="secretpassword" /></div>
                    <div className="space-y-2">
                      <Label>Encryption</Label>
                      <Select value={wifiEncryption} onValueChange={(v) => { setWifiEncryption(v); handleChange(); }}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 mt-2">
                      <Switch checked={wifiHidden} onCheckedChange={(c) => { setWifiHidden(c); handleChange(); }} />
                      <Label className="cursor-pointer" onClick={() => setWifiHidden(!wifiHidden)}>Hidden Network</Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2"><Label>To Email</Label><Input value={emailTo} onChange={(e) => { setEmailTo(e.target.value); handleChange(); }} placeholder="hello@example.com" /></div>
                  <div className="space-y-2"><Label>Subject</Label><Input value={emailSubject} onChange={(e) => { setEmailSubject(e.target.value); handleChange(); }} placeholder="Inquiry about services" /></div>
                  <div className="space-y-2"><Label>Message Body</Label><Textarea value={emailBody} onChange={(e) => { setEmailBody(e.target.value); handleChange(); }} placeholder="Write your message here..." className="min-h-[100px]" /></div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="space-y-2"><Label>Phone Number</Label><Input value={smsPhone} onChange={(e) => { setSmsPhone(e.target.value); handleChange(); }} placeholder="+1 234 567 8900" /></div>
                  <div className="space-y-2"><Label>Message</Label><Textarea value={smsMessage} onChange={(e) => { setSmsMessage(e.target.value); handleChange(); }} placeholder="Write your text message here..." className="min-h-[100px]" /></div>
                </TabsContent>

                <TabsContent value="whatsapp" className="space-y-4">
                  <div className="space-y-2"><Label>WhatsApp Number (with country code)</Label><Input value={waPhone} onChange={(e) => { setWaPhone(e.target.value); handleChange(); }} placeholder="12345678900" /></div>
                  <div className="space-y-2"><Label>Message</Label><Textarea value={waMessage} onChange={(e) => { setWaMessage(e.target.value); handleChange(); }} placeholder="Write your WhatsApp message here..." className="min-h-[100px]" /></div>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Design Settings</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={size} onValueChange={(v) => { setSize(v); handleChange(); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128 × 128</SelectItem>
                    <SelectItem value="256">256 × 256</SelectItem>
                    <SelectItem value="512">512 × 512</SelectItem>
                    <SelectItem value="1024">1024 × 1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Foreground Color</Label>
                <div className="flex gap-2">
                  <input type="color" value={fgColor} onChange={(e) => { setFgColor(e.target.value); handleChange(); }} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={fgColor} onChange={(e) => { setFgColor(e.target.value); handleChange(); }} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); handleChange(); }} className="h-10 w-10 cursor-pointer rounded border" />
                  <Input value={bgColor} onChange={(e) => { setBgColor(e.target.value); handleChange(); }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card className="sticky top-20">
            <CardHeader><CardTitle className="text-lg">Preview & Generate</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="rounded-lg shadow-sm border" style={{ width: Math.min(parseInt(size), 300), height: Math.min(parseInt(size), 300) }} />
              ) : (
                <div className="flex h-[256px] w-[256px] items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground bg-muted/20">
                  Enter details to generate
                </div>
              )}

              <Button
                onClick={handleGenerateClick}
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95"
              >
                <QrCode className="h-5 w-5" /> Generate QR Code
              </Button>

              {qrDataUrl && (
                <div className="flex flex-wrap justify-center w-full gap-2">
                  <Button onClick={downloadPNG} className="gap-2 flex-1">
                    <Download className="h-4 w-4" /> PNG
                  </Button>
                  <Button onClick={downloadSVG} variant="outline" className="gap-2 flex-1">
                    <Download className="h-4 w-4" /> SVG
                  </Button>
                  <ResetButton onReset={resetAll} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
