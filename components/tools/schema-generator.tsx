"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/tool-layout";
import { toolContent } from "@/lib/tool-content";
import { CodePreview } from "@/components/code-preview";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { ResetButton } from "@/components/reset-button";

import { getToolBySlug } from "@/lib/tools-data";
import { toast } from "sonner";

const tool = getToolBySlug("schema-generator")!;

type SchemaType = "Organization" | "Person" | "Product" | "Article" | "FAQ" | "Breadcrumb" | "Event" | "LocalBusiness" | "Recipe" | "SoftwareApplication";

const schemaTypes: SchemaType[] = ["Organization", "Person", "Product", "Article", "FAQ", "Breadcrumb", "Event", "LocalBusiness", "Recipe", "SoftwareApplication"];

function generateSchema(type: SchemaType, data: Record<string, string>): string {
  const base = { "@context": "https://schema.org" };

  const schemas: Record<SchemaType, () => object> = {
    Organization: () => ({
      ...base,
      "@type": "Organization",
      name: data.name || "",
      url: data.url || "",
      logo: data.logo || "",
      description: data.description || "",
      sameAs: data.sameAs ? data.sameAs.split(",").map((s) => s.trim()) : [],
    }),
    Person: () => ({
      ...base,
      "@type": "Person",
      name: data.name || "",
      url: data.url || "",
      jobTitle: data.jobTitle || "",
      email: data.email || "",
      image: data.image || "",
    }),
    Product: () => ({
      ...base,
      "@type": "Product",
      name: data.name || "",
      description: data.description || "",
      image: data.image || "",
      brand: { "@type": "Brand", name: data.brand || "" },
      offers: {
        "@type": "Offer",
        price: data.price || "",
        priceCurrency: data.currency || "USD",
        availability: data.availability || "https://schema.org/InStock",
      },
    }),
    Article: () => ({
      ...base,
      "@type": "Article",
      headline: data.headline || "",
      description: data.description || "",
      image: data.image || "",
      author: { "@type": "Person", name: data.author || "" },
      datePublished: data.datePublished || "",
      dateModified: data.dateModified || "",
      publisher: { "@type": "Organization", name: data.publisher || "" },
    }),
    FAQ: () => ({
      ...base,
      "@type": "FAQPage",
      mainEntity: data.faqItems
        ? data.faqItems.split("\n\n").map((block) => {
            const [q, ...a] = block.split("\n");
            return {
              "@type": "Question",
              name: q || "",
              acceptedAnswer: { "@type": "Answer", text: a.join("\n") || "" },
            };
          })
        : [],
    }),
    Breadcrumb: () => ({
      ...base,
      "@type": "BreadcrumbList",
      itemListElement: data.items
        ? data.items.split("\n").map((line, i) => {
            const [name, url] = line.split("|").map((s) => s.trim());
            return { "@type": "ListItem", position: i + 1, name, item: url || "" };
          })
        : [],
    }),
    Event: () => ({
      ...base,
      "@type": "Event",
      name: data.name || "",
      description: data.description || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      location: { "@type": "Place", name: data.location || "", address: data.address || "" },
      organizer: { "@type": "Organization", name: data.organizer || "" },
    }),
    LocalBusiness: () => ({
      ...base,
      "@type": "LocalBusiness",
      name: data.name || "",
      description: data.description || "",
      url: data.url || "",
      telephone: data.telephone || "",
      address: {
        "@type": "PostalAddress",
        streetAddress: data.street || "",
        addressLocality: data.city || "",
        addressRegion: data.region || "",
        postalCode: data.postalCode || "",
        addressCountry: data.country || "",
      },
    }),
    Recipe: () => ({
      ...base,
      "@type": "Recipe",
      name: data.name || "",
      description: data.description || "",
      image: data.image || "",
      author: { "@type": "Person", name: data.author || "" },
      prepTime: data.prepTime || "",
      cookTime: data.cookTime || "",
      recipeYield: data.yield || "",
      recipeIngredient: data.ingredients ? data.ingredients.split("\n") : [],
      recipeInstructions: data.instructions ? data.instructions.split("\n").map((s) => ({ "@type": "HowToStep", text: s })) : [],
    }),
    SoftwareApplication: () => ({
      ...base,
      "@type": "SoftwareApplication",
      name: data.name || "",
      description: data.description || "",
      applicationCategory: data.category || "",
      operatingSystem: data.os || "",
      offers: {
        "@type": "Offer",
        price: data.price || "0",
        priceCurrency: data.currency || "USD",
      },
    }),
  };

  return JSON.stringify(schemas[type](), null, 2);
}

const fieldsByType: Record<SchemaType, { key: string; label: string; type?: "textarea" }[]> = {
  Organization: [
    { key: "name", label: "Organization Name" },
    { key: "url", label: "Website URL" },
    { key: "logo", label: "Logo URL" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "sameAs", label: "Social Profiles (comma-separated)" },
  ],
  Person: [
    { key: "name", label: "Full Name" },
    { key: "url", label: "Website URL" },
    { key: "jobTitle", label: "Job Title" },
    { key: "email", label: "Email" },
    { key: "image", label: "Image URL" },
  ],
  Product: [
    { key: "name", label: "Product Name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image", label: "Image URL" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "currency", label: "Currency" },
    { key: "availability", label: "Availability URL" },
  ],
  Article: [
    { key: "headline", label: "Headline" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image", label: "Image URL" },
    { key: "author", label: "Author Name" },
    { key: "datePublished", label: "Date Published" },
    { key: "dateModified", label: "Date Modified" },
    { key: "publisher", label: "Publisher Name" },
  ],
  FAQ: [
    { key: "faqItems", label: "FAQ Items (Question on line 1, Answer on line 2, blank line between items)", type: "textarea" },
  ],
  Breadcrumb: [
    { key: "items", label: "Breadcrumb Items (Name|URL, one per line)", type: "textarea" },
  ],
  Event: [
    { key: "name", label: "Event Name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "startDate", label: "Start Date (ISO)" },
    { key: "endDate", label: "End Date (ISO)" },
    { key: "location", label: "Location Name" },
    { key: "address", label: "Address" },
    { key: "organizer", label: "Organizer" },
  ],
  LocalBusiness: [
    { key: "name", label: "Business Name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "url", label: "Website URL" },
    { key: "telephone", label: "Phone Number" },
    { key: "street", label: "Street Address" },
    { key: "city", label: "City" },
    { key: "region", label: "State/Region" },
    { key: "postalCode", label: "Postal Code" },
    { key: "country", label: "Country" },
  ],
  Recipe: [
    { key: "name", label: "Recipe Name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image", label: "Image URL" },
    { key: "author", label: "Author" },
    { key: "prepTime", label: "Prep Time (e.g., PT15M)" },
    { key: "cookTime", label: "Cook Time (e.g., PT30M)" },
    { key: "yield", label: "Yield (e.g., 4 servings)" },
    { key: "ingredients", label: "Ingredients (one per line)", type: "textarea" },
    { key: "instructions", label: "Instructions (one step per line)", type: "textarea" },
  ],
  SoftwareApplication: [
    { key: "name", label: "App Name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "category", label: "Category" },
    { key: "os", label: "Operating System" },
    { key: "price", label: "Price" },
    { key: "currency", label: "Currency" },
  ],
};

const seoTips = [
  "Use JSON-LD format for structured data — Google recommends it over Microdata.",
  "Test your markup with Google's Rich Results Test before deploying.",
  "Add FAQ schema to pages with Q&A content to get rich snippets in search.",
  "Product schema with pricing can lead to rich product results in Google.",
  "Always keep structured data accurate and up-to-date with your page content.",
];

const faqs = [
  {
    question: "What is Schema Markup?",
    answer: "Schema markup is structured data you add to your HTML to help search engines understand your content. It can result in rich snippets, knowledge panels, and other enhanced search results.",
  },
  {
    question: "What is JSON-LD?",
    answer: "JSON-LD (JavaScript Object Notation for Linked Data) is the recommended format for adding structured data to web pages. It's placed in a <script> tag in the head or body of your HTML.",
  },
  {
    question: "How do I test my schema markup?",
    answer: "Use Google's Rich Results Test (search.google.com/test/rich-results) or Schema.org's validator to test your markup before deploying.",
  },
];

export function SchemaGeneratorTool() {
  const dict: any = {};
  const [activeType, setActiveType] = useState<SchemaType>("Organization");
  const [data, setData] = useState<Record<string, Record<string, string>>>({});
  const [output, setOutput] = useState("");


  const ui = dict?.ui || {};
  const t = dict?.tools_deep?.schema_generator || {};
  const toolFaqs = t.faqs || faqs;
  const toolSeoTips = t.seoTips || seoTips;

  const currentData = data[activeType] || {};

  const updateField = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [activeType]: { ...prev[activeType], [key]: value },
    }));
    setOutput("");
  };

  return (
    <ToolLayout tool={tool} content={toolContent["schema-generator"]} seoTips={toolSeoTips} faqs={toolFaqs}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.configTitle || "Schema Type"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {schemaTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setOutput(""); }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeType === type
                    ? "bg-violet-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">{activeType} Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldsByType[activeType].map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={`schema-${field.key}`}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={`schema-${field.key}`}
                  value={currentData[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  rows={4}
                />
              ) : (
                <Input
                  id={`schema-${field.key}`}
                  value={currentData[field.key] || ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              setOutput(generateSchema(activeType, currentData));
              toast.success(t.successGenerate || `${activeType} Schema generated successfully!`);
            }}
            size="lg"
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:opacity-95 mt-6"
          >
            <Code2 className="h-5 w-5" /> {t.generateBtn || "Generate Schema Markup"}
          </Button>
        </CardContent>
      </Card>

      {output && (
      <div className="mt-6 space-y-4">
        <CodePreview code={output} language="json" label={t.generatedCode || "JSON-LD Output"} />
        <div className="flex flex-wrap gap-2">
          <CopyButton text={`<script type="application/ld+json">\n${output}\n</script>`} label={ui.copy || "Copy with Script Tag"} />
          <CopyButton text={output} label={t.copyJson || "Copy JSON"} variant="outline" />
          <DownloadButton content={output} filename={`${activeType.toLowerCase()}-schema.json`} mimeType="application/json" label={ui.download || "Download JSON"} />
          <ResetButton onReset={() => { setData((prev) => ({ ...prev, [activeType]: {} })); setOutput(""); }} />
        </div>
      </div>
      )}
    </ToolLayout>
  );
}
