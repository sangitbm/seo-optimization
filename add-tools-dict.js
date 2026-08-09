const fs = require('fs');
const path = require('path');

const toolTranslations = {
  en: {
    robots_txt_generator: {
      basic: "Basic Rules",
      advanced: "Advanced",
      basicTitle: "Basic Configuration",
      defaultRule: "Default Rule",
      allowAll: "Allow all robots (index everything)",
      disallowAll: "Disallow all robots (index nothing)",
      customRules: "Custom Rules",
      userAgent: "User Agent",
      directive: "Directive",
      path: "Path",
      addRule: "Add Rule",
      sitemapUrl: "Sitemap URL",
      delay: "Crawl Delay",
      generateBtn: "Generate robots.txt",
      generatedCode: "Generated robots.txt",
      seoTips: [
        "Be careful with Disallow: / as it blocks all search engines from indexing your site.",
        "Always include a link to your XML sitemap at the bottom of your robots.txt file.",
        "Use the Crawl-delay directive sparingly, as Googlebot doesn't strictly follow it."
      ],
      faqs: [
        { question: "What is a robots.txt file?", answer: "A robots.txt file tells search engine crawlers which URLs the crawler can access on your site." },
        { question: "Do I need a robots.txt file?", answer: "Yes, it's highly recommended to control crawler traffic and keep private areas out of search results." }
      ]
    },
    sitemap_generator: {
      basic: "Sitemap Config",
      urls: "URLs",
      baseUrl: "Base URL",
      priority: "Default Priority",
      changefreq: "Default Change Frequency",
      addUrl: "Add URL",
      urlPath: "URL Path",
      generateBtn: "Generate sitemap.xml",
      generatedCode: "Generated sitemap.xml",
      seoTips: [
        "Only include canonical, indexable URLs in your sitemap.",
        "Submit your sitemap to Google Search Console to speed up indexing.",
        "Keep your sitemap under 50MB and 50,000 URLs."
      ],
      faqs: [
        { question: "What is an XML Sitemap?", answer: "An XML sitemap is a file that lists a website's essential pages, making sure search engines can find and crawl them all." }
      ]
    },
    canonical_url_generator: {
      configTitle: "Canonical Tag Builder",
      urlLabel: "Page URL",
      urlPlaceholder: "https://example.com/page",
      generateBtn: "Generate Tag",
      generatedCode: "Generated Canonical Tag",
      seoTips: [
        "Every indexable page should have a self-referencing canonical tag.",
        "Use absolute URLs (including https://) in canonical tags, not relative URLs."
      ],
      faqs: [
        { question: "What is a canonical URL?", answer: "A canonical URL is the URL of the best representative page from a group of duplicate pages." }
      ]
    }
  },
  es: {
    robots_txt_generator: {
      basic: "Reglas Básicas",
      advanced: "Avanzado",
      basicTitle: "Configuración Básica",
      defaultRule: "Regla por Defecto",
      allowAll: "Permitir todos los robots",
      disallowAll: "Bloquear todos los robots",
      customRules: "Reglas Personalizadas",
      userAgent: "Agente de Usuario",
      directive: "Directiva",
      path: "Ruta",
      addRule: "Añadir Regla",
      sitemapUrl: "URL del Sitemap",
      delay: "Retraso de Rastreo (Crawl Delay)",
      generateBtn: "Generar robots.txt",
      generatedCode: "robots.txt Generado",
      seoTips: [
        "Ten cuidado con Disallow: / ya que bloquea la indexación de todo tu sitio.",
        "Siempre incluye un enlace a tu sitemap XML."
      ],
      faqs: [
        { question: "¿Qué es un archivo robots.txt?", answer: "Le dice a los rastreadores a qué URLs pueden acceder." },
        { question: "¿Necesito un archivo robots.txt?", answer: "Sí, es muy recomendable." }
      ]
    },
    sitemap_generator: {
      basic: "Configuración del Sitemap",
      urls: "URLs",
      baseUrl: "URL Base",
      priority: "Prioridad por Defecto",
      changefreq: "Frecuencia de Cambio",
      addUrl: "Añadir URL",
      urlPath: "Ruta de URL",
      generateBtn: "Generar sitemap.xml",
      generatedCode: "sitemap.xml Generado",
      seoTips: [
        "Solo incluye URLs canónicas e indexables.",
        "Envía tu sitemap a Google Search Console."
      ],
      faqs: [
        { question: "¿Qué es un Sitemap XML?", answer: "Es un archivo que enumera las páginas esenciales de un sitio web." }
      ]
    },
    canonical_url_generator: {
      configTitle: "Constructor de Etiqueta Canónica",
      urlLabel: "URL de la Página",
      urlPlaceholder: "https://ejemplo.com/pagina",
      generateBtn: "Generar Etiqueta",
      generatedCode: "Etiqueta Canónica Generada",
      seoTips: [
        "Cada página debe tener una etiqueta canónica que haga referencia a sí misma.",
        "Usa URLs absolutas (incluyendo https://)."
      ],
      faqs: [
        { question: "¿Qué es una URL canónica?", answer: "Es la URL representativa de un grupo de páginas duplicadas." }
      ]
    }
  },
  fr: {
    robots_txt_generator: {
      basic: "Règles de base",
      advanced: "Avancé",
      basicTitle: "Configuration",
      defaultRule: "Règle par défaut",
      allowAll: "Autoriser tous les robots",
      disallowAll: "Bloquer tous les robots",
      customRules: "Règles personnalisées",
      userAgent: "Agent utilisateur",
      directive: "Directive",
      path: "Chemin",
      addRule: "Ajouter une règle",
      sitemapUrl: "URL du Sitemap",
      delay: "Délai d'exploration",
      generateBtn: "Générer robots.txt",
      generatedCode: "robots.txt Généré",
      seoTips: ["Soyez prudent avec Disallow: /"],
      faqs: [{ question: "Qu'est-ce qu'un fichier robots.txt ?", answer: "Il indique aux robots les URL accessibles." }]
    },
    sitemap_generator: {
      basic: "Configuration",
      urls: "URLs",
      baseUrl: "URL de base",
      priority: "Priorité",
      changefreq: "Fréquence",
      addUrl: "Ajouter une URL",
      urlPath: "Chemin",
      generateBtn: "Générer sitemap.xml",
      generatedCode: "sitemap.xml Généré",
      seoTips: ["Soumettez votre sitemap à Google Search Console."],
      faqs: [{ question: "Qu'est-ce qu'un Sitemap XML ?", answer: "Il liste les pages essentielles du site." }]
    },
    canonical_url_generator: {
      configTitle: "Générateur Canonique",
      urlLabel: "URL de la page",
      urlPlaceholder: "https://exemple.com/page",
      generateBtn: "Générer la balise",
      generatedCode: "Balise Canonique",
      seoTips: ["Utilisez des URL absolues."],
      faqs: [{ question: "Qu'est-ce qu'une URL canonique ?", answer: "C'est l'URL représentative d'une page." }]
    }
  }
};

const langs = ['en', 'es', 'fr', 'de', 'it', 'pt'];
langs.forEach(lang => {
  if (!toolTranslations[lang]) toolTranslations[lang] = toolTranslations['en'];
  
  const filePath = path.join(__dirname, 'dictionaries', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.tools_deep) data.tools_deep = {};
    data.tools_deep.robots_txt_generator = toolTranslations[lang].robots_txt_generator;
    data.tools_deep.sitemap_generator = toolTranslations[lang].sitemap_generator;
    data.tools_deep.canonical_url_generator = toolTranslations[lang].canonical_url_generator;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated dictionary for 3 tools in ${lang}.json`);
  }
});
