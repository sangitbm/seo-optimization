"use client";

import { useState } from "react";
import { FileBox, Copy, Plus, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolLayout } from "@/components/tool-layout";
import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("gitignore-generator")!;

const seoTips = [
  "A .gitignore file tells Git which files (or patterns) it should ignore and not track.",
  "Never commit node_modules, build artifacts (.next, dist), or environment variables (.env).",
  "If a file is already tracked by Git, adding it to .gitignore will not untrack it. You must run `git rm --cached <file>` first.",
  "You can use global .gitignore files for OS-specific ignores (like .DS_Store on macOS).",
  "Use the ! character to negate a pattern (e.g., ignore all .log files, but !important.log).",
];

const faqs = [
  { question: "Where do I put this file?", answer: "Save the generated text as a file named exactly '.gitignore' in the root folder of your Git repository." },
  { question: "Can I have multiple .gitignore files?", answer: "Yes, you can place a .gitignore file in any subdirectory to apply rules specifically to that folder and its children." },
];

const TEMPLATES: Record<string, string> = {
  "Node.js": `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# dotenv environment variables file
.env
.env.test
.env.local

# Next.js build output
.next
out

# Build output
dist
build`,
  "React": `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`,
  "Python": `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/
env.bak/
venv.bak/`,
  "macOS": `# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk`,
  "Windows": `# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on file shares
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

# Windows shortcuts
*.lnk`,
  "VS Code": `.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Local History for Visual Studio Code
.history/`
};

export function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggle = (template: string) => {
    if (selected.includes(template)) {
      setSelected(selected.filter(t => t !== template));
    } else {
      setSelected([...selected, template]);
    }
  };

  const filtered = Object.keys(TEMPLATES).filter(t => t.toLowerCase().includes(search.toLowerCase()));

  const generateContent = () => {
    if (selected.length === 0) return "# Select templates above to generate your .gitignore file";
    let output = "";
    selected.forEach(t => {
      output += `\n# =========================\n# ${t}\n# =========================\n`;
      output += TEMPLATES[t] + "\n";
    });
    return output.trim();
  };

  const copy = () => {
    navigator.clipboard.writeText(generateContent());
    toast.success(".gitignore copied!");
  };

  return (
    <ToolLayout tool={tool} seoTips={seoTips} faqs={faqs}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Selector */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileBox className="h-5 w-5 text-violet-500" /> Select Templates</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search templates (e.g. Node, React, macOS)..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>

              <div className="flex flex-wrap gap-2">
                {filtered.map(t => {
                  const isSelected = selected.includes(t);
                  return (
                    <Button
                      key={t}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggle(t)}
                      className={isSelected ? "bg-violet-600 text-white hover:bg-violet-700" : ""}
                    >
                      {t}
                      {isSelected ? <X className="h-3 w-3 ml-1.5" /> : <Plus className="h-3 w-3 ml-1.5" />}
                    </Button>
                  )
                })}
                {filtered.length === 0 && <p className="text-sm text-muted-foreground">No templates found matching "{search}"</p>}
              </div>

              {selected.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Currently selected ({selected.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium">
                        {t}
                        <X className="h-3 w-3 cursor-pointer hover:text-violet-900" onClick={() => toggle(t)} />
                      </span>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => setSelected([])} className="h-6 text-xs text-muted-foreground">Clear all</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <Card className="sticky top-20">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-mono">.gitignore</CardTitle>
              {selected.length > 0 && <Button size="sm" variant="outline" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>}
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono bg-muted/50 rounded-lg p-4 overflow-auto h-[400px] whitespace-pre-wrap">{generateContent()}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
