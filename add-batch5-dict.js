const fs = require('fs');
const path = require('path');

const toolTranslations = {
  en: {
    hreflang_generator: {
      urlsTitle: "URL & Language Entries",
      addUrl: "Add URL",
      urlLabel: "URL",
      languageLabel: "Language",
      regionLabel: "Region (Optional)",
      defaultLabel: "Set as x-default (fallback)",
      generateBtn: "Generate Hreflang Tags",
      generatedCode: "Hreflang Tags",
      seoTips: [
        "Use absolute URLs (including https://) for all hreflang tags.",
        "Always include a self-referencing hreflang tag.",
        "The 'x-default' tag is used for unmatched languages (often English)."
      ],
      faqs: [{ question: "What is an hreflang tag?", answer: "It tells search engines which language you are using on a specific page, so the search engine can serve that result to users searching in that language." }]
    },
    keyword_density_checker: {
      inputLabel: "Text to Analyze",
      inputPlaceholder: "Paste your article or webpage content here...",
      analyzeBtn: "Analyze Density",
      resultsTitle: "Analysis Results",
      wordCount: "Word Count",
      charCount: "Characters",
      uniqueWords: "Unique Words",
      keywordLabel: "Keyword",
      countLabel: "Count",
      densityLabel: "Density",
      seoTips: [
        "Aim for a keyword density of 1-2%. Avoid keyword stuffing.",
        "Focus on natural language and semantic variations (LSI keywords)."
      ],
      faqs: [{ question: "What is keyword density?", answer: "The percentage of times a keyword or phrase appears on a web page compared to the total number of words on the page." }]
    },
    qr_code_generator: {
      configTitle: "QR Code Content",
      urlLabel: "URL or Text",
      urlPlaceholder: "https://example.com",
      colorLabel: "Foreground Color",
      bgLabel: "Background Color",
      generateBtn: "Generate QR Code",
      previewTitle: "Generated QR Code",
      seoTips: [
        "Use QR codes on physical marketing materials to drive offline traffic to your website.",
        "Track QR code scans by using a URL with UTM parameters."
      ],
      faqs: [{ question: "Do QR codes expire?", answer: "Static QR codes (like these) never expire because the URL is encoded directly in the image." }]
    },
    slug_generator: {
      configTitle: "Enter Text",
      inputLabel: "Text to Convert",
      inputPlaceholder: "Enter your blog post title or text here...",
      generateBtn: "Generate Slug",
      outputLabel: "URL Slug",
      seoTips: [
        "Keep slugs short and descriptive (3-5 words).",
        "Remove stop words (a, and, the) from your slugs.",
        "Use hyphens to separate words. Don't use underscores."
      ],
      faqs: [{ question: "What is a URL slug?", answer: "The part of a URL that identifies a particular page on a website in an easy-to-read form." }]
    }
  },
  es: {
    hreflang_generator: {
      urlsTitle: "Entradas de URL e Idioma",
      addUrl: "Añadir URL",
      urlLabel: "URL",
      languageLabel: "Idioma",
      regionLabel: "Región (Opcional)",
      defaultLabel: "Establecer como x-default (respaldo)",
      generateBtn: "Generar Etiquetas Hreflang",
      generatedCode: "Etiquetas Hreflang",
      seoTips: ["Usa URLs absolutas (incluyendo https://)."],
      faqs: [{ question: "¿Qué es una etiqueta hreflang?", answer: "Le dice a los motores de búsqueda qué idioma usas." }]
    },
    keyword_density_checker: {
      inputLabel: "Texto a Analizar",
      inputPlaceholder: "Pega tu contenido aquí...",
      analyzeBtn: "Analizar Densidad",
      resultsTitle: "Resultados del Análisis",
      wordCount: "Palabras",
      charCount: "Caracteres",
      uniqueWords: "Palabras Únicas",
      keywordLabel: "Palabra Clave",
      countLabel: "Recuento",
      densityLabel: "Densidad",
      seoTips: ["Apunta a una densidad de 1-2%. Evita el relleno."],
      faqs: [{ question: "¿Qué es la densidad de palabras clave?", answer: "El porcentaje de veces que aparece una palabra." }]
    },
    qr_code_generator: {
      configTitle: "Contenido del Código QR",
      urlLabel: "URL o Texto",
      urlPlaceholder: "https://ejemplo.com",
      colorLabel: "Color Frontal",
      bgLabel: "Color de Fondo",
      generateBtn: "Generar Código QR",
      previewTitle: "Código QR Generado",
      seoTips: ["Usa códigos QR en material impreso."],
      faqs: [{ question: "¿Caducan los códigos QR?", answer: "Los códigos estáticos no caducan." }]
    },
    slug_generator: {
      configTitle: "Introducir Texto",
      inputLabel: "Texto a Convertir",
      inputPlaceholder: "Introduce el título aquí...",
      generateBtn: "Generar Slug",
      outputLabel: "Slug de URL",
      seoTips: ["Mantén los slugs cortos (3-5 palabras)."],
      faqs: [{ question: "¿Qué es un slug de URL?", answer: "La parte final amigable de una URL." }]
    }
  },
  fr: {
    hreflang_generator: {
      urlsTitle: "Entrées d'URL et Langue",
      addUrl: "Ajouter une URL",
      urlLabel: "URL",
      languageLabel: "Langue",
      regionLabel: "Région (Optionnel)",
      defaultLabel: "Définir comme x-default",
      generateBtn: "Générer les Balises",
      generatedCode: "Balises Hreflang",
      seoTips: ["Utilisez des URL absolues."],
      faqs: [{ question: "Qu'est-ce qu'une balise hreflang ?", answer: "Elle indique la langue de la page." }]
    },
    keyword_density_checker: {
      inputLabel: "Texte à Analyser",
      inputPlaceholder: "Collez votre contenu ici...",
      analyzeBtn: "Analyser la Densité",
      resultsTitle: "Résultats",
      wordCount: "Mots",
      charCount: "Caractères",
      uniqueWords: "Mots Uniques",
      keywordLabel: "Mot-Clé",
      countLabel: "Compte",
      densityLabel: "Densité",
      seoTips: ["Visez une densité de 1-2%."],
      faqs: [{ question: "Qu'est-ce que la densité ?", answer: "Le pourcentage d'apparition d'un mot." }]
    },
    qr_code_generator: {
      configTitle: "Contenu du QR Code",
      urlLabel: "URL ou Texte",
      urlPlaceholder: "https://exemple.com",
      colorLabel: "Couleur",
      bgLabel: "Fond",
      generateBtn: "Générer QR Code",
      previewTitle: "QR Code Généré",
      seoTips: ["Utilisez les QR codes sur les supports physiques."],
      faqs: [{ question: "Les QR codes expirent-ils ?", answer: "Les QR codes statiques n'expirent jamais." }]
    },
    slug_generator: {
      configTitle: "Entrer le Texte",
      inputLabel: "Texte à Convertir",
      inputPlaceholder: "Entrez le titre ici...",
      generateBtn: "Générer le Slug",
      outputLabel: "Slug de l'URL",
      seoTips: ["Gardez les slugs courts (3-5 mots)."],
      faqs: [{ question: "Qu'est-ce qu'un slug ?", answer: "La partie lisible d'une URL." }]
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
    data.tools_deep.hreflang_generator = toolTranslations[lang].hreflang_generator;
    data.tools_deep.keyword_density_checker = toolTranslations[lang].keyword_density_checker;
    data.tools_deep.qr_code_generator = toolTranslations[lang].qr_code_generator;
    data.tools_deep.slug_generator = toolTranslations[lang].slug_generator;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated dictionary for batch 5 tools in ${lang}.json`);
  }
});
