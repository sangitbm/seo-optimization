"use client";

import { useState, useEffect } from "react";
import { Clock, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";
import cronstrue from "cronstrue";

const tool = getToolBySlug("cron-job-generator")!;

const seoTips = [
  "Cron expressions consist of 5 fields: minute, hour, day of month, month, and day of week.",
  "Use * to specify all values (e.g., every minute, every hour).",
  "Use */n to specify intervals (e.g., */5 in the minute field means every 5 minutes).",
  "Cron jobs are essential for scheduling background tasks, database backups, and sending regular emails.",
  "Always verify your server's timezone, as cron jobs run based on the server's local time unless configured otherwise.",
];

const faqs = [
  { question: "What is a cron expression?", answer: "A cron expression is a string representing a schedule, consisting of 5 (or sometimes 6) fields separated by spaces. It is used by the cron daemon to execute scheduled tasks on Unix-like operating systems." },
  { question: "How do I say 'every 5 minutes'?", answer: "Use '*/5 * * * *'. The '*/5' in the first field means every 5th minute." },
  { question: "Does this support non-standard syntax like @daily?", answer: "Standard cron syntax is supported. While some systems support macros like @daily or @hourly, it is safer and more portable to use the standard 5-part syntax (e.g., '0 0 * * *' for daily)." },
];

const COMMON_SCHEDULES = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every hour at minute 0", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Sunday at midnight", value: "0 0 * * 0" },
  { label: "1st of every month at midnight", value: "0 0 1 * *" },
];

export function CronJobGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [expression, setExpression] = useState("* * * * *");
  const [humanReadable, setHumanReadable] = useState("Every minute");
  const [error, setError] = useState("");

  useEffect(() => {
    const exp = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setExpression(exp);
    try {
      const readable = cronstrue.toString(exp);
      setHumanReadable(readable);
      setError("");
    } catch (e: any) {
      setHumanReadable("Invalid expression");
      setError(e.toString());
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const setFromCommon = (val: string) => {
    const parts = val.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  const copy = () => {
    if (error) { toast.error("Cannot copy invalid expression"); return; }
    navigator.clipboard.writeText(expression);
    toast.success("Cron expression copied!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-violet-500" /> Build Schedule</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-center text-sm font-semibold text-muted-foreground mb-1">
                <div>Minute</div><div>Hour</div><div>Day</div><div>Month</div><div>Week</div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <Input value={minute} onChange={e => setMinute(e.target.value)} className="text-center font-mono" />
                <Input value={hour} onChange={e => setHour(e.target.value)} className="text-center font-mono" />
                <Input value={dayOfMonth} onChange={e => setDayOfMonth(e.target.value)} className="text-center font-mono" />
                <Input value={month} onChange={e => setMonth(e.target.value)} className="text-center font-mono" />
                <Input value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="text-center font-mono" />
              </div>
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg flex gap-2 items-start mt-4">
                <Info className="h-4 w-4 shrink-0 text-violet-500" />
                <p>Use numbers, <code>*</code> (all), <code>*/n</code> (every n), <code>-</code> (range), or <code>,</code> (list).</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Common Schedules</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {COMMON_SCHEDULES.map((s, i) => (
                <Button key={i} variant="outline" size="sm" onClick={() => setFromCommon(s.value)} className="font-normal text-xs">
                  {s.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={`border-2 ${error ? "border-red-400 dark:border-red-600" : "border-green-400 dark:border-green-600"}`}>
            <CardHeader className="pb-3"><CardTitle className="text-base">Generated Cron Expression</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest py-6 text-foreground">
                {expression}
              </div>
              <div className={`text-lg font-medium p-3 rounded-lg ${error ? "bg-red-50 text-red-600 dark:bg-red-950/30" : "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"}`}>
                {humanReadable}
              </div>
              <Button onClick={copy} disabled={!!error} size="lg" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 mt-4">
                <Copy className="h-4 w-4 mr-2" /> Copy Expression
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
