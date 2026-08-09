const fs = require('fs');
const path = require('path');

const legalTranslations = {
  en: {
    about: {
      title: "About Us",
      mission: "Our Mission",
      missionText1: "Founded in 2025, SEO Utilities has come a long way. Our passion for creating clean, developer-friendly SEO tools drove us to build a platform that runs entirely in your browser.",
      missionText2: "We believe that essential webmaster tools should be free, fast, and accessible without requiring users to create accounts or sacrifice their privacy. Every tool processes your data locally.",
      whyChooseUs: "Why Choose Us?",
      whyFast: "Lightning Fast: Our tools are built with modern web technologies to ensure instant results.",
      whyPrivacy: "Privacy First: Your data never leaves your browser. Zero tracking.",
      whyFree: "Always Free: We are committed to keeping our core tools 100% free forever.",
      whyDev: "Developer Focused: Generated code is clean, semantic, and ready for production."
    },
    contact: {
      title: "Contact Us",
      desc: "Have a question, suggestion, or encountered an issue with one of our tools? We'd love to hear from you.",
      emailTitle: "Email Us",
      emailDesc: "For support or general inquiries, email us directly.",
      locationTitle: "Location"
    },
    privacy: {
      title: "Privacy Policy",
      p1: "At SEO Utilities, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SEO Utilities and how we use it.",
      localTitle: "Local Processing & Client-Side Tools",
      localText: "We do not collect or store your inputs. Almost all of the tools provided on SEO Utilities run entirely client-side (within your browser).",
      logTitle: "Log Files",
      logText: "SEO Utilities follows a standard procedure of using log files.",
      adsTitle: "Google DoubleClick DART Cookie",
      adsText: "Google uses DART cookies to serve ads based on visits. You may decline the use of DART cookies by visiting the Google ad network Privacy Policy.",
      consentTitle: "Consent",
      consentText: "By using our website, you hereby consent to our Privacy Policy."
    },
    terms: {
      title: "Terms of Service",
      p1: "Welcome to SEO Utilities! These terms and conditions outline the rules and regulations for the use of SEO Utilities's Website.",
      licenseTitle: "License",
      licenseText: "Unless otherwise stated, SEO Utilities and/or its licensors own the intellectual property rights for all material on SEO Utilities. You may use our free tools and the output they generate for both personal and commercial projects without restriction.",
      userCommentsTitle: "Disclaimer",
      userCommentsText: "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Our tools are provided 'as is' without any warranty."
    }
  },
  es: {
    about: {
      title: "Sobre Nosotros",
      mission: "Nuestra Misión",
      missionText1: "Fundada en 2025, SEO Utilities ha recorrido un largo camino. Nuestra pasión por crear herramientas SEO amigables para desarrolladores nos llevó a construir esta plataforma en el navegador.",
      missionText2: "Creemos que las herramientas esenciales para webmasters deben ser gratuitas, rápidas y accesibles sin sacrificar la privacidad.",
      whyChooseUs: "¿Por qué elegirnos?",
      whyFast: "Rayo Rápido: Resultados instantáneos.",
      whyPrivacy: "Privacidad Primero: Tus datos nunca salen de tu navegador.",
      whyFree: "Siempre Gratis: Herramientas 100% gratuitas.",
      whyDev: "Enfoque en el Desarrollador: Código listo para producción."
    },
    contact: {
      title: "Contáctenos",
      desc: "¿Tienes preguntas o sugerencias? Nos encantaría escucharte.",
      emailTitle: "Envíanos un correo",
      emailDesc: "Para soporte o consultas generales.",
      locationTitle: "Ubicación"
    },
    privacy: {
      title: "Política de Privacidad",
      p1: "En SEO Utilities, tu privacidad es nuestra prioridad.",
      localTitle: "Procesamiento Local",
      localText: "No recopilamos ni almacenamos tus entradas. Todas las herramientas se ejecutan en tu navegador.",
      logTitle: "Archivos de Registro",
      logText: "Seguimos un procedimiento estándar de uso de archivos de registro.",
      adsTitle: "Cookies de Google DART",
      adsText: "Google utiliza cookies DART para mostrar anuncios.",
      consentTitle: "Consentimiento",
      consentText: "Al usar nuestro sitio web, aceptas nuestra Política de Privacidad."
    },
    terms: {
      title: "Términos de Servicio",
      p1: "¡Bienvenido a SEO Utilities! Estos términos describen las reglas de uso.",
      licenseTitle: "Licencia",
      licenseText: "Puedes utilizar nuestras herramientas gratuitas y su resultado para proyectos personales y comerciales sin restricciones.",
      userCommentsTitle: "Aviso Legal",
      userCommentsText: "Nuestras herramientas se proporcionan 'tal cual' sin ninguna garantía."
    }
  },
  fr: {
    about: {
      title: "À Propos",
      mission: "Notre Mission",
      missionText1: "Fondé en 2025, SEO Utilities a pour passion de créer des outils propres et respectueux de la vie privée.",
      missionText2: "Nous croyons que les outils essentiels doivent être gratuits et rapides.",
      whyChooseUs: "Pourquoi nous choisir ?",
      whyFast: "Ultra Rapide",
      whyPrivacy: "Confidentialité d'abord",
      whyFree: "Toujours Gratuit",
      whyDev: "Axé Développeur"
    },
    contact: {
      title: "Contactez-nous",
      desc: "Une question ou suggestion ? Contactez-nous !",
      emailTitle: "Email",
      emailDesc: "Pour l'assistance.",
      locationTitle: "Emplacement"
    },
    privacy: {
      title: "Politique de Confidentialité",
      p1: "La protection de votre vie privée est notre priorité.",
      localTitle: "Traitement Local",
      localText: "Nous ne stockons pas vos données. Tout s'exécute localement.",
      logTitle: "Fichiers Journaux",
      logText: "Nous utilisons des fichiers journaux standard.",
      adsTitle: "Cookies DART",
      adsText: "Google utilise des cookies DART.",
      consentTitle: "Consentement",
      consentText: "En utilisant notre site, vous acceptez cette politique."
    },
    terms: {
      title: "Conditions d'Utilisation",
      p1: "Bienvenue sur SEO Utilities !",
      licenseTitle: "Licence",
      licenseText: "L'utilisation de nos outils est sans restriction.",
      userCommentsTitle: "Avertissement",
      userCommentsText: "Outils fournis 'tels quels'."
    }
  },
  // Default fallbacks for de, it, pt for brevity. 
  de: {}, it: {}, pt: {}
};

const langs = ['en', 'es', 'fr', 'de', 'it', 'pt'];
langs.forEach(lang => {
  if (!legalTranslations[lang] || Object.keys(legalTranslations[lang]).length === 0) {
    legalTranslations[lang] = legalTranslations['en'];
  }
  const filePath = path.join(__dirname, 'dictionaries', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.legal = legalTranslations[lang];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated legal dict in ${lang}.json`);
  }
});
