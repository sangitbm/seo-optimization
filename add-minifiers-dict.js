const fs = require('fs');
const path = require('path');

const toolTranslations = {
  en: {
    css_minifier: {
      inputLabel: "CSS Input",
      inputPlaceholder: "/* Paste your CSS here */\n.example {\n  color: red;\n}",
      minifyBtn: "Minify CSS",
      outputLabel: "Minified CSS",
      statsPrefix: "Minified from",
      seoTips: [
        "Minifying CSS reduces file size and improves page load speed.",
        "Faster load times are a positive ranking factor for Google."
      ],
      faqs: [{ question: "What is CSS minification?", answer: "It removes whitespace, comments, and unnecessary characters from CSS code without changing its functionality." }]
    },
    html_minifier: {
      inputLabel: "HTML Input",
      inputPlaceholder: "<!-- Paste your HTML here -->\n<div class=\"example\">\n  <p>Hello World</p>\n</div>",
      minifyBtn: "Minify HTML",
      outputLabel: "Minified HTML",
      statsPrefix: "Minified from",
      seoTips: [
        "Minifying HTML can significantly decrease your Time to First Byte (TTFB).",
        "Smaller HTML payloads reduce bandwidth usage and improve SEO."
      ],
      faqs: [{ question: "Why minify HTML?", answer: "To reduce page size and improve loading speed." }]
    },
    js_minifier: {
      inputLabel: "JavaScript Input",
      inputPlaceholder: "// Paste your JavaScript here\nfunction example() {\n  console.log('Hello World');\n}",
      minifyBtn: "Minify JavaScript",
      outputLabel: "Minified JavaScript",
      statsPrefix: "Minified from",
      seoTips: [
        "Large JavaScript files can block rendering. Always minify them.",
        "Combine and minify JS files to reduce HTTP requests."
      ],
      faqs: [{ question: "Does minifying JS break code?", answer: "No, minification safely removes spaces and shortens variables without altering the logic." }]
    },
    favicon_generator: {
      configTitle: "Upload & Configure",
      uploadLabel: "Select Image (PNG, JPG, SVG)",
      previewTitle: "Favicon Preview",
      generateBtn: "Generate Favicons",
      generatedCode: "HTML Tags",
      seoTips: [
        "A favicon helps users easily identify your site in multiple browser tabs.",
        "Google may display your favicon in mobile search results."
      ],
      faqs: [{ question: "What sizes are generated?", answer: "Standard 16x16, 32x32, and Apple Touch Icon sizes." }]
    }
  },
  es: {
    css_minifier: {
      inputLabel: "Entrada CSS",
      inputPlaceholder: "/* Pega tu CSS aquí */",
      minifyBtn: "Minificar CSS",
      outputLabel: "CSS Minificado",
      statsPrefix: "Minificado de",
      seoTips: ["Minificar CSS reduce el tamaño del archivo y mejora la velocidad."],
      faqs: [{ question: "¿Qué es la minificación CSS?", answer: "Elimina espacios y comentarios del código CSS." }]
    },
    html_minifier: {
      inputLabel: "Entrada HTML",
      inputPlaceholder: "<!-- Pega tu HTML aquí -->",
      minifyBtn: "Minificar HTML",
      outputLabel: "HTML Minificado",
      statsPrefix: "Minificado de",
      seoTips: ["Minificar HTML disminuye el tiempo de carga."],
      faqs: [{ question: "¿Por qué minificar HTML?", answer: "Para reducir el tamaño de la página." }]
    },
    js_minifier: {
      inputLabel: "Entrada JavaScript",
      inputPlaceholder: "// Pega tu JavaScript aquí",
      minifyBtn: "Minificar JavaScript",
      outputLabel: "JavaScript Minificado",
      statsPrefix: "Minificado de",
      seoTips: ["Los archivos JS grandes pueden bloquear el renderizado."],
      faqs: [{ question: "¿Minificar JS rompe el código?", answer: "No, elimina espacios de forma segura." }]
    },
    favicon_generator: {
      configTitle: "Subir y Configurar",
      uploadLabel: "Seleccionar Imagen",
      previewTitle: "Vista Previa del Favicon",
      generateBtn: "Generar Favicons",
      generatedCode: "Etiquetas HTML",
      seoTips: ["Un favicon ayuda a los usuarios a identificar tu sitio."],
      faqs: [{ question: "¿Qué tamaños se generan?", answer: "Tamaños estándar de 16x16, 32x32 y Apple Touch." }]
    }
  },
  fr: {
    css_minifier: {
      inputLabel: "Entrée CSS",
      inputPlaceholder: "/* Collez votre CSS ici */",
      minifyBtn: "Minifier CSS",
      outputLabel: "CSS Minifié",
      statsPrefix: "Minifié de",
      seoTips: ["La minification CSS réduit la taille du fichier."],
      faqs: [{ question: "Qu'est-ce que la minification CSS ?", answer: "Elle supprime les espaces et commentaires." }]
    },
    html_minifier: {
      inputLabel: "Entrée HTML",
      inputPlaceholder: "<!-- Collez votre HTML ici -->",
      minifyBtn: "Minifier HTML",
      outputLabel: "HTML Minifié",
      statsPrefix: "Minifié de",
      seoTips: ["Minifier le HTML améliore la vitesse."],
      faqs: [{ question: "Pourquoi minifier le HTML ?", answer: "Pour réduire le poids de la page." }]
    },
    js_minifier: {
      inputLabel: "Entrée JavaScript",
      inputPlaceholder: "// Collez votre JS ici",
      minifyBtn: "Minifier JavaScript",
      outputLabel: "JS Minifié",
      statsPrefix: "Minifié de",
      seoTips: ["Les gros fichiers JS bloquent le rendu."],
      faqs: [{ question: "La minification casse-t-elle le code ?", answer: "Non, c'est sécurisé." }]
    },
    favicon_generator: {
      configTitle: "Uploader et Configurer",
      uploadLabel: "Sélectionner une Image",
      previewTitle: "Aperçu du Favicon",
      generateBtn: "Générer les Favicons",
      generatedCode: "Balises HTML",
      seoTips: ["Un favicon identifie votre site."],
      faqs: [{ question: "Quelles tailles sont générées ?", answer: "Tailles standards et Apple Touch." }]
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
    data.tools_deep.css_minifier = toolTranslations[lang].css_minifier;
    data.tools_deep.html_minifier = toolTranslations[lang].html_minifier;
    data.tools_deep.js_minifier = toolTranslations[lang].js_minifier;
    data.tools_deep.favicon_generator = toolTranslations[lang].favicon_generator;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated dictionary for 4 minifier/favicon tools in ${lang}.json`);
  }
});
