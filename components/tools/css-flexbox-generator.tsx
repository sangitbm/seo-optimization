"use client";

import { useState } from "react";
import { LayoutTemplate, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("css-flexbox-generator")!;

const seoTips = [
  "CSS Flexbox is a one-dimensional layout model for arranging items in rows or columns.",
  "Always start with `display: flex;` on the parent container to activate flexbox.",
  "Use `justify-content` to align items along the main axis (e.g., horizontally in a row).",
  "Use `align-items` to align items along the cross axis (e.g., vertically in a row).",
  "Tailwind CSS makes flexbox incredibly fast with classes like `flex`, `justify-center`, and `items-center`.",
];

const faqs = [
  { question: "What is the main axis vs cross axis?", answer: "The main axis is defined by flex-direction. If flex-direction is 'row', the main axis is horizontal. The cross axis is perpendicular to the main axis (vertical in this case)." },
  { question: "When should I use Flexbox instead of CSS Grid?", answer: "Flexbox is best for 1-dimensional layouts (a single row or a single column). CSS Grid is better for complex 2-dimensional layouts (rows and columns simultaneously)." },
];

export function CssFlexboxGenerator() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState("16");
  const [itemsCount, setItemsCount] = useState(5);
  const [outputMode, setOutputMode] = useState<"css" | "tailwind">("css");

  const getTailwindClasses = () => {
    let classes = ["flex"];
    
    if (direction === "row-reverse") classes.push("flex-row-reverse");
    if (direction === "column") classes.push("flex-col");
    if (direction === "column-reverse") classes.push("flex-col-reverse");
    
    if (wrap === "wrap") classes.push("flex-wrap");
    if (wrap === "wrap-reverse") classes.push("flex-wrap-reverse");

    if (justify === "center") classes.push("justify-center");
    if (justify === "flex-end") classes.push("justify-end");
    if (justify === "space-between") classes.push("justify-between");
    if (justify === "space-around") classes.push("justify-around");
    if (justify === "space-evenly") classes.push("justify-evenly");

    if (align === "center") classes.push("items-center");
    if (align === "flex-start") classes.push("items-start");
    if (align === "flex-end") classes.push("items-end");
    if (align === "baseline") classes.push("items-baseline");

    if (gap !== "0") {
      const g = parseInt(gap);
      classes.push(`gap-[${g}px]`); // Using arbitrary value for exact px mapping, though in tailwind usually gap-4 etc.
    }

    return classes.join(" ");
  };

  const getCssCode = () => {
    return `.container {\n  display: flex;\n  flex-direction: ${direction};\n  flex-wrap: ${wrap};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`;
  };

  const code = outputMode === "css" ? getCssCode() : `<div className="${getTailwindClasses()}">\n  {/* items */}\n</div>`;

  const copy = () => {
    navigator.clipboard.writeText(code);
    toast.success(`${outputMode === "css" ? "CSS" : "Tailwind"} copied to clipboard!`);
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><LayoutTemplate className="h-5 w-5 text-violet-500" /> Container Properties</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-1.5">
                <Label>flex-direction</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">row</SelectItem>
                    <SelectItem value="row-reverse">row-reverse</SelectItem>
                    <SelectItem value="column">column</SelectItem>
                    <SelectItem value="column-reverse">column-reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>justify-content (Main Axis)</Label>
                <Select value={justify} onValueChange={setJustify}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">flex-start</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="flex-end">flex-end</SelectItem>
                    <SelectItem value="space-between">space-between</SelectItem>
                    <SelectItem value="space-around">space-around</SelectItem>
                    <SelectItem value="space-evenly">space-evenly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>align-items (Cross Axis)</Label>
                <Select value={align} onValueChange={setAlign}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stretch">stretch</SelectItem>
                    <SelectItem value="flex-start">flex-start</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="flex-end">flex-end</SelectItem>
                    <SelectItem value="baseline">baseline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>flex-wrap</Label>
                  <Select value={wrap} onValueChange={setWrap}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">nowrap</SelectItem>
                      <SelectItem value="wrap">wrap</SelectItem>
                      <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>gap (px)</Label>
                  <Input type="number" min="0" max="100" value={gap} onChange={e => setGap(e.target.value)} />
                </div>
              </div>

              <div className="pt-4 border-t space-y-1.5">
                <Label>Number of items to preview</Label>
                <div className="flex items-center gap-2">
                  <input type="range" min="1" max="20" value={itemsCount} onChange={e => setItemsCount(parseInt(e.target.value))} className="flex-1" />
                  <span className="text-sm font-mono w-6 text-right">{itemsCount}</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Preview & Output */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Live Preview</CardTitle></CardHeader>
            <CardContent>
              <div 
                className="bg-muted/30 border-2 border-dashed border-border rounded-xl p-4 overflow-auto min-h-[300px] resize-y"
                style={{
                  display: "flex",
                  flexDirection: direction as any,
                  flexWrap: wrap as any,
                  justifyContent: justify,
                  alignItems: align,
                  gap: `${gap}px`
                }}
              >
                {Array.from({ length: itemsCount }).map((_, i) => (
                  <div key={i} className="bg-violet-500 text-white font-bold rounded-lg p-4 flex items-center justify-center min-w-[60px] min-h-[60px] shadow-sm">
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Generated Code</CardTitle>
              <Button size="sm" variant="outline" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-1 rounded-lg bg-muted p-1 w-full max-w-[200px]">
                <button onClick={() => setOutputMode("css")} className={`flex-1 rounded-md py-1 text-sm font-medium transition-all ${outputMode === "css" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>CSS</button>
                <button onClick={() => setOutputMode("tailwind")} className={`flex-1 rounded-md py-1 text-sm font-medium transition-all ${outputMode === "tailwind" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Tailwind</button>
              </div>
              <pre className="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">{code}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
