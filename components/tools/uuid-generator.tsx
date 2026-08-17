"use client";

import { useState, useEffect } from "react";
import { Fingerprint, Copy, RefreshCw, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";

const tool = getToolBySlug("uuid-generator")!;

const seoTips = [
  "UUIDs (Universally Unique Identifiers) are 128-bit numbers used to identify information in computer systems.",
  "UUID Version 4 is generated using random numbers and is the most common version used today.",
  "UUID Version 1 is generated using the MAC address of the computer and the time of generation.",
  "Always use UUIDv4 for database primary keys or session IDs to prevent predictable sequential ID attacks.",
  "A standard UUID is represented as 32 hexadecimal digits displayed in 5 groups separated by hyphens.",
];

const faqs = [
  { question: "What is the difference between UUID and GUID?", answer: "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. Microsoft popularized the term GUID, while the rest of the tech world typically uses UUID." },
  { question: "Can a UUIDv4 ever have a collision?", answer: "While theoretically possible, the probability of generating two identical UUIDv4s is astronomically low. You would need to generate 1 billion UUIDs per second for 85 years to reach a 50% chance of a collision." },
  { question: "Why is UUIDv4 better than UUIDv1?", answer: "UUIDv1 contains the MAC address and timestamp of the generating machine, which can expose private infrastructure details. UUIDv4 is purely random, making it completely anonymous and secure for public-facing APIs." },
];

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [uppercase, setUppercase] = useState(false);

  const generate = () => {
    const newUuids = [];
    const validCount = Math.min(Math.max(1, count), 500); // limit 1 to 500
    for (let i = 0; i < validCount; i++) {
      let id = version === "v4" ? uuidv4() : uuidv1();
      if (uppercase) id = id.toUpperCase();
      newUuids.push(id);
    }
    setUuids(newUuids);
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, uppercase]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success(`${uuids.length} UUIDs copied!`);
  };

  const copySingle = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    toast.success("UUID copied!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5 text-violet-500" /> Options</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Version</Label>
                <div className="flex gap-2">
                  <button onClick={() => setVersion("v4")} className={`flex-1 py-2 text-sm rounded-md border-2 font-medium transition-all ${version === "v4" ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    v4 (Random)
                  </button>
                  <button onClick={() => setVersion("v1")} className={`flex-1 py-2 text-sm rounded-md border-2 font-medium transition-all ${version === "v1" ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    v1 (Time)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>How many to generate? (Max 500)</Label>
                <Input type="number" min={1} max={500} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="font-mono" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="uppercase" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="rounded" />
                <Label htmlFor="uppercase" className="cursor-pointer">Uppercase letters</Label>
              </div>

              <Button onClick={generate} size="lg" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90">
                <RefreshCw className="h-4 w-4 mr-2" /> Generate New
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg flex items-center gap-2"><Fingerprint className="h-5 w-5 text-violet-500" /> Generated UUIDs</CardTitle>
              <Button size="sm" variant="outline" onClick={copyAll}><Copy className="h-3.5 w-3.5 mr-2" /> Copy All</Button>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-xl overflow-hidden border">
                <div className="max-h-[500px] overflow-y-auto">
                  {uuids.map((uuid, i) => (
                    <div key={i} className="group flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-xs font-mono w-4 text-right">{i + 1}</span>
                        <span className="font-mono text-[15px] sm:text-base font-medium">{uuid}</span>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copySingle(uuid)}>
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}

// Ensure the icon is imported in this file so the Settings icon resolves properly above.
import { Settings } from "lucide-react";
