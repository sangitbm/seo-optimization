import Link from "next/link";

interface AuthorBioProps {
  author?: string;
}

export function AuthorBio({ author = "SEO Utilities Team" }: AuthorBioProps) {
  return (
    <div className="mt-16 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/30 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-violet-500/25">
            S
          </div>
        </div>

        {/* Bio text */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-1">
            Written by
          </p>
          <h3 className="text-lg font-bold mb-2">{author}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The SEO Utilities team is made up of SEO specialists, web developers, and digital marketers
            passionate about making professional-grade SEO tools free and accessible to everyone.
            We build, test, and refine every tool based on real-world SEO workflows.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/about`}
              className="inline-flex items-center rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-500 hover:bg-violet-500/10 transition-colors"
            >
              About Us
            </Link>
            <Link
              href={`/blog`}
              className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
