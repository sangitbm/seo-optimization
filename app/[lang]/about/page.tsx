import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn more about SEO Utilities and our mission.",
  slug: "about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">About SEO Utilities</h1>
      
      <div className="prose prose-violet dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p className="text-lg">
          Welcome to <strong>SEO Utilities</strong>, your number one source for all things technical SEO. We're dedicated to providing you the very best free tools, with an emphasis on speed, privacy, and user experience.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
        <p>
          Founded in 2025, SEO Utilities has come a long way from its beginnings. When we first started out, our passion for creating clean, developer-friendly SEO tools drove us to build a platform that runs entirely in your browser.
        </p>
        <p>
          We believe that essential webmaster tools should be free, fast, and accessible without requiring users to create accounts or sacrifice their privacy. That's why every tool on this platform processes your data locally on your device—we never send your sensitive inputs to our servers.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Lightning Fast:</strong> Our tools are built with modern web technologies to ensure instant results.</li>
          <li><strong>Privacy First:</strong> Your data never leaves your browser. Zero tracking.</li>
          <li><strong>Always Free:</strong> We are committed to keeping our core tools 100% free forever.</li>
          <li><strong>Developer Focused:</strong> Generated code is clean, semantic, and ready for production.</li>
        </ul>

        <p className="mt-8">
          We hope you enjoy our tools as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
