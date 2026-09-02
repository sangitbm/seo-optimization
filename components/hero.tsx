"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-indigo-500/5 to-transparent dark:from-violet-600/20 dark:via-indigo-500/10" />
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-600 dark:text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free SEO Tools — No Sign-up Required</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Powerful{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              SEO Utilities
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A collection of free, fast, and privacy-friendly SEO tools. Generate meta tags, schema markup, sitemaps, and more — all running in your browser with zero server round-trips.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              nativeButton={false}
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-[1.02]"
              render={
                <Link href="/#tools">
                  Explore Tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="gap-2"
              render={<Link href="/about">Learn More</Link>}
            />
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: "17+", label: "Free Tools" },
              { value: "100%", label: "Privacy Friendly" },
              { value: "0", label: "Sign-ups Needed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold sm:text-2xl lg:text-3xl">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
