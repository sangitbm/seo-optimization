"use client";

import { Moon, Sun, Menu, Globe, Search } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, getToolsByCategory } from "@/lib/tools-data";
import { i18n } from "@/i18n-config";

export function Header({ dict }: { dict?: any }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    if (i18n.locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    }
  };

  const currentLocale = pathname ? pathname.split('/')[1] : i18n.defaultLocale;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
            <Search className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            SEO<span className="text-violet-500">Utilities</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href={`/${currentLocale}`}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {dict?.navigation?.home || "Home"}
          </Link>
          <Link
            href={`/${currentLocale}/#tools`}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {dict?.navigation?.tools || "Tools"}
          </Link>
          <Link
            href={`/${currentLocale}/#faq`}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
          <Link
            href={`/${currentLocale}/blog`}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href={`/${currentLocale}/about`}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {dict?.navigation?.about || "About"}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Switch language</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => switchLanguage("en")}
                  className={currentLocale === "en" ? "bg-accent" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLanguage("es")}
                  className={currentLocale === "es" ? "bg-accent" : ""}
                >
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLanguage("fr")}
                  className={currentLocale === "fr" ? "bg-accent" : ""}
                >
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLanguage("de")}
                  className={currentLocale === "de" ? "bg-accent" : ""}
                >
                  Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLanguage("it")}
                  className={currentLocale === "it" ? "bg-accent" : ""}
                >
                  Italiano
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => switchLanguage("pt")}
                  className={currentLocale === "pt" ? "bg-accent" : ""}
                >
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="text-lg font-bold">
                SEO<span className="text-violet-500">Utilities</span>
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                <Link
                  href={`/${currentLocale}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {dict?.navigation?.home || "Home"}
                </Link>
                <Link
                  href={`/${currentLocale}/blog`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Blog
                </Link>
                {categories.map((cat) => {
                  const translatedCat = dict?.categoriesMap?.[cat] || cat;
                  return (
                  <div key={cat} className="mt-4">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {translatedCat}
                    </p>
                    {getToolsByCategory(cat).map((tool) => {
                      const translatedName = dict?.toolsMap?.[tool.slug]?.name || tool.name;
                      return (
                      <Link
                        key={tool.slug}
                        href={`/${currentLocale}/${tool.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        <tool.icon className="h-4 w-4 text-muted-foreground" />
                        {translatedName}
                      </Link>
                      )
                    })}
                  </div>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
