const fs = require('fs');
const path = require('path');

const toolTranslations = {
  en: {
    meta_tag_preview: {
      configTitle: "Input Metadata",
      urlLabel: "Page URL",
      titleLabel: "Meta Title",
      descLabel: "Meta Description",
      previewTitle: "Search Results Preview",
      desktopTab: "Desktop",
      mobileTab: "Mobile",
      seoTips: [
        "Keep meta titles under 60 characters to avoid truncation.",
        "Meta descriptions should be between 150-160 characters.",
        "Include your primary keyword in the title and description naturally."
      ],
      faqs: [{ question: "What is a meta tag preview?", answer: "It simulates how your webpage will appear in Google search results." }]
    },
    open_graph_generator: {
      configTitle: "Open Graph Tags",
      titleLabel: "Title",
      descLabel: "Description",
      urlLabel: "URL",
      imageLabel: "Image URL",
      typeLabel: "Content Type",
      generateBtn: "Generate OG Tags",
      generatedCode: "Open Graph Meta Tags",
      seoTips: [
        "Open Graph tags control how your content appears when shared on Facebook and LinkedIn.",
        "Use an image size of 1200x630 pixels for optimal display."
      ],
      faqs: [{ question: "What is Open Graph?", answer: "An internet protocol created by Facebook to standardize the use of metadata within a webpage to represent the content of a page." }]
    },
    redirect_generator: {
      configTitle: "Redirect Settings",
      typeLabel: "Server Type",
      redirectTypeLabel: "Redirect Type",
      fromLabel: "From URL",
      toLabel: "To URL",
      generateBtn: "Generate Redirect Code",
      generatedCode: "Redirect Code",
      seoTips: [
        "Use 301 redirects for permanent changes to preserve SEO value.",
        "Avoid redirect chains (A -> B -> C) as they slow down page loading."
      ],
      faqs: [{ question: "What is a 301 redirect?", answer: "A permanent redirect which passes between 90-99% of link equity (ranking power) to the redirected page." }]
    },
    schema_generator: {
      configTitle: "Schema Type",
      typeLabel: "Select Schema Type",
      generateBtn: "Generate Schema Markup",
      generatedCode: "JSON-LD Schema",
      seoTips: [
        "JSON-LD is Google's recommended format for structured data.",
        "Use Google's Rich Results Test tool to validate your schema."
      ],
      faqs: [{ question: "What is Schema Markup?", answer: "Code (semantic vocabulary) that you put on your website to help the search engines return more informative results for users." }]
    },
    twitter_card_generator: {
      configTitle: "Twitter Card Settings",
      cardTypeLabel: "Card Type",
      usernameLabel: "Twitter Username",
      titleLabel: "Title",
      descLabel: "Description",
      imageLabel: "Image URL",
      generateBtn: "Generate Twitter Card",
      generatedCode: "Twitter Card Meta Tags",
      seoTips: [
        "Twitter cards make your tweets stand out with rich media.",
        "Summary Card with Large Image performs best for engagement."
      ],
      faqs: [{ question: "Do Twitter cards affect SEO?", answer: "Not directly, but they improve click-through rates from social media, which can drive traffic." }]
    }
  },
  es: {
    meta_tag_preview: {
      configTitle: "Metadatos de Entrada",
      urlLabel: "URL de la Página",
      titleLabel: "Meta Título",
      descLabel: "Meta Descripción",
      previewTitle: "Vista Previa de Búsqueda",
      desktopTab: "Escritorio",
      mobileTab: "Móvil",
      seoTips: ["Mantén los títulos bajo 60 caracteres."],
      faqs: [{ question: "¿Qué es la vista previa de metaetiquetas?", answer: "Simula cómo aparecerá en Google." }]
    },
    open_graph_generator: {
      configTitle: "Etiquetas Open Graph",
      titleLabel: "Título",
      descLabel: "Descripción",
      urlLabel: "URL",
      imageLabel: "URL de la Imagen",
      typeLabel: "Tipo de Contenido",
      generateBtn: "Generar Etiquetas OG",
      generatedCode: "Metaetiquetas Open Graph",
      seoTips: ["Controlan cómo se ve tu contenido en Facebook."],
      faqs: [{ question: "¿Qué es Open Graph?", answer: "Un protocolo para estandarizar metadatos en redes." }]
    },
    redirect_generator: {
      configTitle: "Ajustes de Redirección",
      typeLabel: "Tipo de Servidor",
      redirectTypeLabel: "Tipo de Redirección",
      fromLabel: "URL de Origen",
      toLabel: "URL de Destino",
      generateBtn: "Generar Código de Redirección",
      generatedCode: "Código de Redirección",
      seoTips: ["Usa redirecciones 301 para cambios permanentes."],
      faqs: [{ question: "¿Qué es una redirección 301?", answer: "Una redirección permanente que preserva el SEO." }]
    },
    schema_generator: {
      configTitle: "Tipo de Schema",
      typeLabel: "Seleccionar Tipo",
      generateBtn: "Generar Marcado Schema",
      generatedCode: "Schema JSON-LD",
      seoTips: ["JSON-LD es el formato recomendado por Google."],
      faqs: [{ question: "¿Qué es Schema Markup?", answer: "Código para resultados de búsqueda más ricos." }]
    },
    twitter_card_generator: {
      configTitle: "Ajustes de Twitter Card",
      cardTypeLabel: "Tipo de Tarjeta",
      usernameLabel: "Usuario de Twitter",
      titleLabel: "Título",
      descLabel: "Descripción",
      imageLabel: "URL de la Imagen",
      generateBtn: "Generar Twitter Card",
      generatedCode: "Metaetiquetas Twitter Card",
      seoTips: ["Hacen que tus tuits destaquen."],
      faqs: [{ question: "¿Afectan al SEO?", answer: "Mejoran el CTR social." }]
    }
  },
  fr: {
    meta_tag_preview: {
      configTitle: "Métadonnées",
      urlLabel: "URL",
      titleLabel: "Méta Titre",
      descLabel: "Méta Description",
      previewTitle: "Aperçu de la Recherche",
      desktopTab: "Bureau",
      mobileTab: "Mobile",
      seoTips: ["Gardez les titres sous 60 caractères."],
      faqs: [{ question: "Qu'est-ce que c'est ?", answer: "Simule l'apparence sur Google." }]
    },
    open_graph_generator: {
      configTitle: "Balises Open Graph",
      titleLabel: "Titre",
      descLabel: "Description",
      urlLabel: "URL",
      imageLabel: "URL de l'Image",
      typeLabel: "Type de Contenu",
      generateBtn: "Générer les Balises OG",
      generatedCode: "Balises Open Graph",
      seoTips: ["Contrôle l'apparence sur Facebook."],
      faqs: [{ question: "Qu'est-ce que l'Open Graph ?", answer: "Protocole pour le partage social." }]
    },
    redirect_generator: {
      configTitle: "Paramètres de Redirection",
      typeLabel: "Serveur",
      redirectTypeLabel: "Type",
      fromLabel: "De l'URL",
      toLabel: "À l'URL",
      generateBtn: "Générer la Redirection",
      generatedCode: "Code de Redirection",
      seoTips: ["Utilisez les redirections 301 pour le SEO."],
      faqs: [{ question: "Qu'est-ce qu'une redirection 301 ?", answer: "Redirection permanente." }]
    },
    schema_generator: {
      configTitle: "Type de Schema",
      typeLabel: "Sélectionner",
      generateBtn: "Générer le Schema",
      generatedCode: "Schema JSON-LD",
      seoTips: ["Le JSON-LD est recommandé par Google."],
      faqs: [{ question: "Qu'est-ce que le Schema ?", answer: "Code pour enrichir les résultats de recherche." }]
    },
    twitter_card_generator: {
      configTitle: "Paramètres Twitter Card",
      cardTypeLabel: "Type",
      usernameLabel: "Utilisateur Twitter",
      titleLabel: "Titre",
      descLabel: "Description",
      imageLabel: "Image URL",
      generateBtn: "Générer Twitter Card",
      generatedCode: "Balises Twitter Card",
      seoTips: ["Fait ressortir vos tweets."],
      faqs: [{ question: "Impact sur le SEO ?", answer: "Améliore le taux de clics social." }]
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
    data.tools_deep.meta_tag_preview = toolTranslations[lang].meta_tag_preview;
    data.tools_deep.open_graph_generator = toolTranslations[lang].open_graph_generator;
    data.tools_deep.redirect_generator = toolTranslations[lang].redirect_generator;
    data.tools_deep.schema_generator = toolTranslations[lang].schema_generator;
    data.tools_deep.twitter_card_generator = toolTranslations[lang].twitter_card_generator;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated dictionary for batch 6 tools in ${lang}.json`);
  }
});
