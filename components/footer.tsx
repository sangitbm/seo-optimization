import { Search } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { categories, getToolsByCategory } from "@/lib/tools-data";
import { AdSlot } from "@/components/ad-slot";

export function Footer({ dict, lang }: { dict?: any; lang: string }) {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Advertisement</p>
        <AdSlot variant="footer" slotId="1611016987" />
      </div>

      <Separator />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Search className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                SEO<span className="text-violet-500">Utilities</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Free online SEO tools for developers and marketers. No sign-up
              required — just open and use.
            </p>
          </div>

          {/* Tool Categories */}
          {categories.map((cat) => {
            const translatedCat = dict?.categoriesMap?.[cat] || cat;
            return (
            <div key={cat}>
              <h3 className="mb-3 text-sm font-semibold">{translatedCat}</h3>
              <ul className="space-y-2">
                {getToolsByCategory(cat as any).map((tool) => {
                  const translatedName = dict?.toolsMap?.[tool.slug]?.name || tool.name;
                  return (
                  <li key={tool.slug}>
                    <Link
                      href={`/${lang}/${tool.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {translatedName}
                    </Link>
                  </li>
                  )
                })}
              </ul>
            </div>
            )
          })}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SEO Utilities. All rights reserved.
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link
              href={`/${lang}/about`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict?.navigation?.about || "About"}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict?.navigation?.contact || "Contact"}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict?.navigation?.privacy || "Privacy Policy"}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {dict?.navigation?.terms || "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
