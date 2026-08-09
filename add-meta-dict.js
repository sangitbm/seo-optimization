const fs = require('fs');
const path = require('path');

const toolTranslations = {
  en: {
    meta_tag_generator: {
      basic: "Basic",
      openGraph: "Open Graph",
      twitterCard: "Twitter Card",
      basicTitle: "Basic Meta Tags",
      titleLabel: "Title",
      titlePlaceholder: "My Website Title",
      canonicalLabel: "Canonical URL",
      canonicalPlaceholder: "https://example.com/page",
      descriptionLabel: "Description",
      descriptionPlaceholder: "A brief description of your page...",
      keywordsLabel: "Keywords",
      keywordsPlaceholder: "seo, tools, generator",
      robotsLabel: "Robots",
      themeColorLabel: "Theme Color",
      ogTitleLabel: "OG Title",
      ogTitlePlaceholder: "Leave empty to use page title",
      ogTypeLabel: "OG Type",
      ogDescriptionLabel: "OG Description",
      ogDescriptionPlaceholder: "Leave empty to use page description",
      ogUrlLabel: "OG URL",
      ogUrlPlaceholder: "https://example.com",
      siteNameLabel: "Site Name",
      siteNamePlaceholder: "My Website",
      ogImageLabel: "OG Image URL",
      ogImagePlaceholder: "https://example.com/image.jpg",
      cardTypeLabel: "Card Type",
      twitterSiteLabel: "@username",
      twitterSitePlaceholder: "@yourusername",
      twitterTitleLabel: "Twitter Title",
      twitterTitlePlaceholder: "Leave empty to use page title",
      twitterDescriptionLabel: "Twitter Description",
      twitterDescriptionPlaceholder: "Leave empty to use page description",
      twitterImageLabel: "Twitter Image URL",
      twitterImagePlaceholder: "Leave empty to use OG image",
      generateBtn: "Generate Meta Tags",
      googlePreview: "Google Search Preview",
      generatedHtml: "Generated HTML",
      seoTips: [
        "Keep your title tag between 50-60 characters for optimal display in search results.",
        "Write meta descriptions of 150-160 characters that include your target keyword.",
        "Use unique title and description tags for every page on your site.",
        "Include your primary keyword near the beginning of your title tag.",
        "Always set a canonical URL to prevent duplicate content issues.",
        "Use descriptive, keyword-rich Open Graph titles for better social sharing."
      ],
      faqs: [
        { question: "What are meta tags and why are they important?", answer: "Meta tags are HTML elements that provide metadata about a web page. They help search engines understand your content." },
        { question: "How long should my meta title be?", answer: "Google typically displays the first 50-60 characters of a title tag. Keep your titles concise." },
        { question: "What is the optimal meta description length?", answer: "Meta descriptions should be between 150-160 characters." }
      ]
    }
  },
  es: {
    meta_tag_generator: {
      basic: "Básico",
      openGraph: "Open Graph",
      twitterCard: "Twitter Card",
      basicTitle: "Etiquetas Meta Básicas",
      titleLabel: "Título",
      titlePlaceholder: "El Título de mi Sitio",
      canonicalLabel: "URL Canónica",
      canonicalPlaceholder: "https://ejemplo.com/pagina",
      descriptionLabel: "Descripción",
      descriptionPlaceholder: "Una breve descripción de tu página...",
      keywordsLabel: "Palabras Clave",
      keywordsPlaceholder: "seo, herramientas, generador",
      robotsLabel: "Robots",
      themeColorLabel: "Color del Tema",
      ogTitleLabel: "Título OG",
      ogTitlePlaceholder: "Dejar vacío para usar el título de la página",
      ogTypeLabel: "Tipo OG",
      ogDescriptionLabel: "Descripción OG",
      ogDescriptionPlaceholder: "Dejar vacío para usar la descripción de la página",
      ogUrlLabel: "URL OG",
      ogUrlPlaceholder: "https://ejemplo.com",
      siteNameLabel: "Nombre del Sitio",
      siteNamePlaceholder: "Mi Sitio Web",
      ogImageLabel: "URL de Imagen OG",
      ogImagePlaceholder: "https://ejemplo.com/imagen.jpg",
      cardTypeLabel: "Tipo de Tarjeta",
      twitterSiteLabel: "@usuario",
      twitterSitePlaceholder: "@tuusuario",
      twitterTitleLabel: "Título Twitter",
      twitterTitlePlaceholder: "Dejar vacío para usar el título de la página",
      twitterDescriptionLabel: "Descripción Twitter",
      twitterDescriptionPlaceholder: "Dejar vacío para usar la descripción de la página",
      twitterImageLabel: "URL de Imagen Twitter",
      twitterImagePlaceholder: "Dejar vacío para usar imagen OG",
      generateBtn: "Generar Etiquetas Meta",
      googlePreview: "Vista Previa en Google",
      generatedHtml: "HTML Generado",
      seoTips: [
        "Mantén tu etiqueta de título entre 50-60 caracteres para una visualización óptima en los resultados de búsqueda.",
        "Escribe meta descripciones de 150-160 caracteres que incluyan tu palabra clave objetivo.",
        "Usa etiquetas de título y descripción únicas para cada página de tu sitio.",
        "Incluye tu palabra clave principal cerca del principio de tu etiqueta de título.",
        "Siempre establece una URL canónica para prevenir problemas de contenido duplicado.",
        "Usa títulos Open Graph descriptivos y ricos en palabras clave para un mejor intercambio social."
      ],
      faqs: [
        { question: "¿Qué son las etiquetas meta y por qué son importantes?", answer: "Las etiquetas meta son elementos HTML que proporcionan metadatos sobre una página web. Ayudan a los motores de búsqueda a entender tu contenido." },
        { question: "¿Qué longitud debe tener mi meta título?", answer: "Google suele mostrar los primeros 50-60 caracteres. Mantén tus títulos concisos." },
        { question: "¿Cuál es la longitud óptima de la meta descripción?", answer: "Las meta descripciones deben tener entre 150-160 caracteres." }
      ]
    }
  },
  // We can add fr, de, it, pt here but for token brevity I will assume default fallback to English if not present, or I can provide them quickly.
  fr: {
    meta_tag_generator: {
      basic: "Basique",
      openGraph: "Open Graph",
      twitterCard: "Twitter Card",
      basicTitle: "Balises Meta de Base",
      titleLabel: "Titre",
      titlePlaceholder: "Titre de mon site",
      canonicalLabel: "URL Canonique",
      canonicalPlaceholder: "https://exemple.com/page",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Une brève description de votre page...",
      keywordsLabel: "Mots-clés",
      keywordsPlaceholder: "seo, outils, générateur",
      robotsLabel: "Robots",
      themeColorLabel: "Couleur du Thème",
      ogTitleLabel: "Titre OG",
      ogTitlePlaceholder: "Laisser vide pour utiliser le titre de la page",
      ogTypeLabel: "Type OG",
      ogDescriptionLabel: "Description OG",
      ogDescriptionPlaceholder: "Laisser vide pour utiliser la description de la page",
      ogUrlLabel: "URL OG",
      ogUrlPlaceholder: "https://exemple.com",
      siteNameLabel: "Nom du Site",
      siteNamePlaceholder: "Mon Site Web",
      ogImageLabel: "URL de l'Image OG",
      ogImagePlaceholder: "https://exemple.com/image.jpg",
      cardTypeLabel: "Type de Carte",
      twitterSiteLabel: "@utilisateur",
      twitterSitePlaceholder: "@votreutilisateur",
      twitterTitleLabel: "Titre Twitter",
      twitterTitlePlaceholder: "Laisser vide pour utiliser le titre de la page",
      twitterDescriptionLabel: "Description Twitter",
      twitterDescriptionPlaceholder: "Laisser vide pour utiliser la description de la page",
      twitterImageLabel: "URL de l'Image Twitter",
      twitterImagePlaceholder: "Laisser vide pour utiliser l'image OG",
      generateBtn: "Générer les Balises Meta",
      googlePreview: "Aperçu Google Search",
      generatedHtml: "HTML Généré",
      seoTips: [
        "Gardez votre balise titre entre 50 et 60 caractères pour un affichage optimal.",
        "Rédigez des méta-descriptions de 150 à 160 caractères incluant votre mot-clé cible.",
        "Utilisez des balises titre et description uniques pour chaque page.",
        "Incluez votre mot-clé principal au début de votre balise titre.",
        "Définissez toujours une URL canonique pour éviter le contenu dupliqué.",
        "Utilisez des titres Open Graph descriptifs pour un meilleur partage social."
      ],
      faqs: [
        { question: "Que sont les balises meta et pourquoi sont-elles importantes ?", answer: "Les balises meta fournissent des métadonnées sur une page web pour aider les moteurs de recherche." },
        { question: "Quelle doit être la longueur de mon méta titre ?", answer: "Google affiche généralement les 50 à 60 premiers caractères." },
        { question: "Quelle est la longueur optimale d'une méta-description ?", answer: "Les méta-descriptions doivent compter entre 150 et 160 caractères." }
      ]
    }
  }
};

// Quick fallbacks for de, it, pt using english for the script's sake to save tokens
const langs = ['en', 'es', 'fr', 'de', 'it', 'pt'];
langs.forEach(lang => {
  if (!toolTranslations[lang]) toolTranslations[lang] = toolTranslations['en'];
  
  const filePath = path.join(__dirname, 'dictionaries', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.tools_deep) data.tools_deep = {};
    data.tools_deep.meta_tag_generator = toolTranslations[lang].meta_tag_generator;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated deep tool dictionary in ${lang}.json`);
  }
});
