"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToolGrid } from "./tool-grid";
import { categories, searchTools, tools, type ToolCategory } from "@/lib/tools-data";

export function ToolSearch({ dict, lang = "en" }: { dict?: any; lang?: string }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All">("All");

  const filtered = searchTools(query).filter(
    (t) => activeCategory === "All" || t.category === activeCategory
  );

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={dict?.search?.placeholder || "Search tools..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          id="tool-search"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant={activeCategory === "All" ? "default" : "secondary"}
          className="cursor-pointer transition-colors hover:bg-violet-600 hover:text-white"
          onClick={() => setActiveCategory("All")}
        >
          {dict?.categories?.all || "All"} ({tools.length})
        </Badge>
        {categories.map((cat) => {
          const count = tools.filter((t) => t.category === cat).length;
          const translatedCat = dict?.categoriesMap?.[cat] || cat;
          return (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "secondary"}
              className="cursor-pointer transition-colors hover:bg-violet-600 hover:text-white"
              onClick={() => setActiveCategory(cat)}
            >
              {translatedCat} ({count})
            </Badge>
          );
        })}
      </div>

      <ToolGrid tools={filtered} dict={dict} lang={lang} />
    </div>
  );
}
