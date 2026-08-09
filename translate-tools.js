const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    categoriesMap: {
      "Meta Tags": "Meta Tags",
      "Structured Data": "Structured Data",
      "Technical SEO": "Technical SEO",
      "Social Media": "Social Media",
      "Content": "Content",
      "Code": "Code",
      "Utilities": "Utilities"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Meta Tag Generator", "shortDescription": "Generate title, description, OG tags, Twitter cards and more." },
      "schema-generator": { "name": "Schema Markup Generator", "shortDescription": "Create JSON-LD structured data for rich snippets." },
      "sitemap-generator": { "name": "Sitemap Generator", "shortDescription": "Create XML sitemaps with priority and frequency settings." },
      "robots-txt-generator": { "name": "Robots.txt Generator", "shortDescription": "Build robots.txt visually with allow/disallow rules." },
      "open-graph-generator": { "name": "Open Graph Image Generator", "shortDescription": "Design OG images with custom colors, text, and gradients." },
      "twitter-card-generator": { "name": "Twitter Card Generator", "shortDescription": "Create Twitter Card meta tags with live preview." },
      "canonical-url-generator": { "name": "Canonical URL Generator", "shortDescription": "Generate canonical link tags for duplicate content prevention." },
      "hreflang-generator": { "name": "Hreflang Generator", "shortDescription": "Create hreflang tags for multilingual SEO." },
      "redirect-generator": { "name": "Redirect Generator", "shortDescription": "Generate redirect rules for Apache, Nginx, Vercel & Netlify." },
      "keyword-density-checker": { "name": "Keyword Density Checker", "shortDescription": "Analyze word count, keyword frequency, and density." },
      "meta-tag-preview": { "name": "Meta Tag Preview", "shortDescription": "Preview your page on Google, Facebook, and Twitter." },
      "favicon-generator": { "name": "Favicon Generator", "shortDescription": "Generate all favicon sizes from a single image." },
      "slug-generator": { "name": "Slug Generator", "shortDescription": "Convert titles into clean, SEO-friendly URL slugs." },
      "html-minifier": { "name": "HTML Minifier", "shortDescription": "Minify and beautify HTML code for better performance." },
      "css-minifier": { "name": "CSS Minifier", "shortDescription": "Minify and beautify CSS stylesheets." },
      "js-minifier": { "name": "JavaScript Minifier", "shortDescription": "Minify and beautify JavaScript code." },
      "qr-code-generator": { "name": "QR Code Generator", "shortDescription": "Generate customizable QR codes in PNG and SVG." }
    }
  },
  es: {
    categoriesMap: {
      "Meta Tags": "Etiquetas Meta",
      "Structured Data": "Datos Estructurados",
      "Technical SEO": "SEO Técnico",
      "Social Media": "Redes Sociales",
      "Content": "Contenido",
      "Code": "Código",
      "Utilities": "Utilidades"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Generador de Etiquetas Meta", "shortDescription": "Genera títulos, descripciones, etiquetas OG, Twitter cards y más." },
      "schema-generator": { "name": "Generador de Marcado Schema", "shortDescription": "Crea datos estructurados JSON-LD para rich snippets." },
      "sitemap-generator": { "name": "Generador de Sitemap", "shortDescription": "Crea sitemaps XML con ajustes de prioridad y frecuencia." },
      "robots-txt-generator": { "name": "Generador de Robots.txt", "shortDescription": "Crea robots.txt visualmente con reglas de allow/disallow." },
      "open-graph-generator": { "name": "Generador de Imágenes Open Graph", "shortDescription": "Diseña imágenes OG con colores, texto y degradados personalizados." },
      "twitter-card-generator": { "name": "Generador de Twitter Card", "shortDescription": "Crea etiquetas meta Twitter Card con vista previa en vivo." },
      "canonical-url-generator": { "name": "Generador de URL Canónica", "shortDescription": "Genera etiquetas de enlace canónico para prevenir contenido duplicado." },
      "hreflang-generator": { "name": "Generador de Hreflang", "shortDescription": "Crea etiquetas hreflang para SEO multilingüe." },
      "redirect-generator": { "name": "Generador de Redirecciones", "shortDescription": "Genera reglas de redirección para Apache, Nginx, Vercel y Netlify." },
      "keyword-density-checker": { "name": "Comprobador de Densidad de Palabras Clave", "shortDescription": "Analiza recuento de palabras, frecuencia de palabras clave y densidad." },
      "meta-tag-preview": { "name": "Vista Previa de Etiquetas Meta", "shortDescription": "Previsualiza tu página en Google, Facebook y Twitter." },
      "favicon-generator": { "name": "Generador de Favicon", "shortDescription": "Genera todos los tamaños de favicon desde una sola imagen." },
      "slug-generator": { "name": "Generador de Slug", "shortDescription": "Convierte títulos en slugs de URL limpios y amigables para SEO." },
      "html-minifier": { "name": "Minificador HTML", "shortDescription": "Minifica y embellece código HTML para mejor rendimiento." },
      "css-minifier": { "name": "Minificador CSS", "shortDescription": "Minifica y embellece hojas de estilo CSS." },
      "js-minifier": { "name": "Minificador JavaScript", "shortDescription": "Minifica y embellece código JavaScript." },
      "qr-code-generator": { "name": "Generador de Código QR", "shortDescription": "Genera códigos QR personalizables en PNG y SVG." }
    }
  },
  fr: {
    categoriesMap: {
      "Meta Tags": "Balises Meta",
      "Structured Data": "Données Structurées",
      "Technical SEO": "SEO Technique",
      "Social Media": "Réseaux Sociaux",
      "Content": "Contenu",
      "Code": "Code",
      "Utilities": "Utilitaires"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Générateur de Balises Meta", "shortDescription": "Générez titre, description, balises OG, cartes Twitter et plus." },
      "schema-generator": { "name": "Générateur de Schéma", "shortDescription": "Créez des données structurées JSON-LD pour les rich snippets." },
      "sitemap-generator": { "name": "Générateur de Sitemap", "shortDescription": "Créez des sitemaps XML avec paramètres de priorité et fréquence." },
      "robots-txt-generator": { "name": "Générateur de Robots.txt", "shortDescription": "Créez un robots.txt visuellement avec des règles allow/disallow." },
      "open-graph-generator": { "name": "Générateur d'Images Open Graph", "shortDescription": "Concevez des images OG avec couleurs, texte et dégradés personnalisés." },
      "twitter-card-generator": { "name": "Générateur de Twitter Card", "shortDescription": "Créez des balises meta Twitter Card avec aperçu en direct." },
      "canonical-url-generator": { "name": "Générateur d'URL Canonique", "shortDescription": "Générez des balises de lien canonique pour éviter le contenu dupliqué." },
      "hreflang-generator": { "name": "Générateur Hreflang", "shortDescription": "Créez des balises hreflang pour le SEO multilingue." },
      "redirect-generator": { "name": "Générateur de Redirections", "shortDescription": "Générez des règles de redirection pour Apache, Nginx, Vercel et Netlify." },
      "keyword-density-checker": { "name": "Vérificateur de Densité de Mots-Clés", "shortDescription": "Analysez le nombre de mots, la fréquence des mots-clés et la densité." },
      "meta-tag-preview": { "name": "Aperçu des Balises Meta", "shortDescription": "Prévisualisez votre page sur Google, Facebook et Twitter." },
      "favicon-generator": { "name": "Générateur de Favicon", "shortDescription": "Générez toutes les tailles de favicon à partir d'une seule image." },
      "slug-generator": { "name": "Générateur de Slug", "shortDescription": "Convertissez les titres en slugs d'URL propres et optimisés pour le SEO." },
      "html-minifier": { "name": "Minificateur HTML", "shortDescription": "Minifiez et embellissez le code HTML pour de meilleures performances." },
      "css-minifier": { "name": "Minificateur CSS", "shortDescription": "Minifiez et embellissez les feuilles de style CSS." },
      "js-minifier": { "name": "Minificateur JavaScript", "shortDescription": "Minifiez et embellissez le code JavaScript." },
      "qr-code-generator": { "name": "Générateur de QR Code", "shortDescription": "Générez des QR codes personnalisables en PNG et SVG." }
    }
  },
  de: {
    categoriesMap: {
      "Meta Tags": "Meta-Tags",
      "Structured Data": "Strukturierte Daten",
      "Technical SEO": "Technisches SEO",
      "Social Media": "Social Media",
      "Content": "Inhalt",
      "Code": "Code",
      "Utilities": "Dienstprogramme"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Meta-Tag-Generator", "shortDescription": "Generieren Sie Titel, Beschreibung, OG-Tags, Twitter Cards und mehr." },
      "schema-generator": { "name": "Schema-Markup-Generator", "shortDescription": "Erstellen Sie strukturierte JSON-LD-Daten für Rich Snippets." },
      "sitemap-generator": { "name": "Sitemap-Generator", "shortDescription": "Erstellen Sie XML-Sitemaps mit Prioritäts- und Frequenzeinstellungen." },
      "robots-txt-generator": { "name": "Robots.txt-Generator", "shortDescription": "Erstellen Sie robots.txt visuell mit Allow/Disallow-Regeln." },
      "open-graph-generator": { "name": "Open Graph-Bildgenerator", "shortDescription": "Entwerfen Sie OG-Bilder mit benutzerdefinierten Farben, Texten und Verläufen." },
      "twitter-card-generator": { "name": "Twitter Card-Generator", "shortDescription": "Erstellen Sie Twitter Card-Meta-Tags mit Live-Vorschau." },
      "canonical-url-generator": { "name": "Canonical URL-Generator", "shortDescription": "Generieren Sie Canonical-Link-Tags zur Vermeidung von Duplicate Content." },
      "hreflang-generator": { "name": "Hreflang-Generator", "shortDescription": "Erstellen Sie Hreflang-Tags für mehrsprachiges SEO." },
      "redirect-generator": { "name": "Weiterleitungs-Generator", "shortDescription": "Generieren Sie Weiterleitungsregeln für Apache, Nginx, Vercel & Netlify." },
      "keyword-density-checker": { "name": "Keyword-Dichte-Checker", "shortDescription": "Analysieren Sie Wortanzahl, Keyword-Häufigkeit und Dichte." },
      "meta-tag-preview": { "name": "Meta-Tag-Vorschau", "shortDescription": "Sehen Sie sich die Vorschau Ihrer Seite auf Google, Facebook und Twitter an." },
      "favicon-generator": { "name": "Favicon-Generator", "shortDescription": "Generieren Sie alle Favicon-Größen aus einem einzigen Bild." },
      "slug-generator": { "name": "Slug-Generator", "shortDescription": "Wandeln Sie Titel in saubere, SEO-freundliche URL-Slugs um." },
      "html-minifier": { "name": "HTML-Minifier", "shortDescription": "Minimieren und verschönern Sie HTML-Code für bessere Leistung." },
      "css-minifier": { "name": "CSS-Minifier", "shortDescription": "Minimieren und verschönern Sie CSS-Stylesheets." },
      "js-minifier": { "name": "JavaScript-Minifier", "shortDescription": "Minimieren und verschönern Sie JavaScript-Code." },
      "qr-code-generator": { "name": "QR-Code-Generator", "shortDescription": "Generieren Sie anpassbare QR-Codes in PNG und SVG." }
    }
  },
  it: {
    categoriesMap: {
      "Meta Tags": "Meta Tag",
      "Structured Data": "Dati Strutturati",
      "Technical SEO": "SEO Tecnico",
      "Social Media": "Social Media",
      "Content": "Contenuto",
      "Code": "Codice",
      "Utilities": "Utilità"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Generatore di Meta Tag", "shortDescription": "Genera titolo, descrizione, tag OG, Twitter card e altro." },
      "schema-generator": { "name": "Generatore di Markup Schema", "shortDescription": "Crea dati strutturati JSON-LD per rich snippet." },
      "sitemap-generator": { "name": "Generatore di Sitemap", "shortDescription": "Crea sitemap XML con impostazioni di priorità e frequenza." },
      "robots-txt-generator": { "name": "Generatore di Robots.txt", "shortDescription": "Costruisci robots.txt visivamente con regole allow/disallow." },
      "open-graph-generator": { "name": "Generatore di Immagini Open Graph", "shortDescription": "Progetta immagini OG con colori, testo e sfumature personalizzate." },
      "twitter-card-generator": { "name": "Generatore di Twitter Card", "shortDescription": "Crea meta tag Twitter Card con anteprima dal vivo." },
      "canonical-url-generator": { "name": "Generatore di URL Canonico", "shortDescription": "Genera tag di link canonici per prevenire contenuti duplicati." },
      "hreflang-generator": { "name": "Generatore Hreflang", "shortDescription": "Crea tag hreflang per SEO multilingue." },
      "redirect-generator": { "name": "Generatore di Reindirizzamenti", "shortDescription": "Genera regole di reindirizzamento per Apache, Nginx, Vercel e Netlify." },
      "keyword-density-checker": { "name": "Controllo Densità Parole Chiave", "shortDescription": "Analizza il conteggio delle parole, la frequenza delle parole chiave e la densità." },
      "meta-tag-preview": { "name": "Anteprima Meta Tag", "shortDescription": "Visualizza l'anteprima della tua pagina su Google, Facebook e Twitter." },
      "favicon-generator": { "name": "Generatore di Favicon", "shortDescription": "Genera tutte le dimensioni di favicon da una singola immagine." },
      "slug-generator": { "name": "Generatore di Slug", "shortDescription": "Converti i titoli in slug URL puliti e ottimizzati per la SEO." },
      "html-minifier": { "name": "Minificatore HTML", "shortDescription": "Minimizza e abbellisci il codice HTML per prestazioni migliori." },
      "css-minifier": { "name": "Minificatore CSS", "shortDescription": "Minimizza e abbellisci i fogli di stile CSS." },
      "js-minifier": { "name": "Minificatore JavaScript", "shortDescription": "Minimizza e abbellisci il codice JavaScript." },
      "qr-code-generator": { "name": "Generatore di Codici QR", "shortDescription": "Genera codici QR personalizzabili in PNG e SVG." }
    }
  },
  pt: {
    categoriesMap: {
      "Meta Tags": "Meta Tags",
      "Structured Data": "Dados Estruturados",
      "Technical SEO": "SEO Técnico",
      "Social Media": "Redes Sociais",
      "Content": "Conteúdo",
      "Code": "Código",
      "Utilities": "Utilidades"
    },
    toolsMap: {
      "meta-tag-generator": { "name": "Gerador de Meta Tags", "shortDescription": "Gere título, descrição, tags OG, Twitter cards e mais." },
      "schema-generator": { "name": "Gerador de Marcação Schema", "shortDescription": "Crie dados estruturados JSON-LD para rich snippets." },
      "sitemap-generator": { "name": "Gerador de Sitemap", "shortDescription": "Crie sitemaps XML com configurações de prioridade e frequência." },
      "robots-txt-generator": { "name": "Gerador de Robots.txt", "shortDescription": "Crie robots.txt visualmente com regras de allow/disallow." },
      "open-graph-generator": { "name": "Gerador de Imagens Open Graph", "shortDescription": "Projete imagens OG com cores, texto e gradientes personalizados." },
      "twitter-card-generator": { "name": "Gerador de Twitter Card", "shortDescription": "Crie meta tags de Twitter Card com visualização ao vivo." },
      "canonical-url-generator": { "name": "Gerador de URL Canônica", "shortDescription": "Gere tags de link canônico para prevenção de conteúdo duplicado." },
      "hreflang-generator": { "name": "Gerador Hreflang", "shortDescription": "Crie tags hreflang para SEO multilíngue." },
      "redirect-generator": { "name": "Gerador de Redirecionamentos", "shortDescription": "Gere regras de redirecionamento para Apache, Nginx, Vercel e Netlify." },
      "keyword-density-checker": { "name": "Verificador de Densidade de Palavras-chave", "shortDescription": "Analise a contagem de palavras, frequência de palavras-chave e densidade." },
      "meta-tag-preview": { "name": "Visualização de Meta Tag", "shortDescription": "Visualize sua página no Google, Facebook e Twitter." },
      "favicon-generator": { "name": "Gerador de Favicon", "shortDescription": "Gere todos os tamanhos de favicon a partir de uma única imagem." },
      "slug-generator": { "name": "Gerador de Slug", "shortDescription": "Converta títulos em slugs de URL limpos e amigáveis para SEO." },
      "html-minifier": { "name": "Minificador HTML", "shortDescription": "Minifique e embeleze o código HTML para melhor desempenho." },
      "css-minifier": { "name": "Minificador CSS", "shortDescription": "Minifique e embeleze folhas de estilo CSS." },
      "js-minifier": { "name": "Minificador JavaScript", "shortDescription": "Minifique e embeleze o código JavaScript." },
      "qr-code-generator": { "name": "Gerador de Código QR", "shortDescription": "Gere códigos QR personalizáveis em PNG e SVG." }
    }
  }
};

const langs = ['en', 'es', 'fr', 'de', 'it', 'pt'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, 'dictionaries', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.categoriesMap = translations[lang].categoriesMap;
    data.toolsMap = translations[lang].toolsMap;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
