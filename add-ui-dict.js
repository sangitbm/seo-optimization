const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    ui: {
      copy: "Copy",
      download: "Download",
      reset: "Reset",
      generate: "Generate",
      preview: "Preview",
      livePreview: "Live Preview",
      code: "Code",
      success: "Success",
      error: "Error",
      required: "Required",
      optional: "Optional"
    },
    features: {
      title: "Why SEO Utilities?",
      subtitle: "Built for speed, privacy, and developer experience",
      fast: {
        title: "Lightning Fast",
        desc: "All tools run in your browser with zero server round-trips. Get instant results without waiting."
      },
      private: {
        title: "100% Private",
        desc: "Your data never leaves your browser. No tracking, no storage, no server-side processing."
      },
      seo: {
        title: "SEO Optimized",
        desc: "Every tool follows SEO best practices and generates standards-compliant output ready for production."
      }
    },
    faq: {
      title: "Frequently Asked Questions"
    }
  },
  es: {
    ui: {
      copy: "Copiar",
      download: "Descargar",
      reset: "Restablecer",
      generate: "Generar",
      preview: "Vista Previa",
      livePreview: "Vista Previa en Vivo",
      code: "Código",
      success: "Éxito",
      error: "Error",
      required: "Requerido",
      optional: "Opcional"
    },
    features: {
      title: "¿Por qué SEO Utilities?",
      subtitle: "Construido para velocidad, privacidad y experiencia del desarrollador",
      fast: {
        title: "Increíblemente Rápido",
        desc: "Todas las herramientas se ejecutan en tu navegador sin viajes al servidor. Resultados al instante."
      },
      private: {
        title: "100% Privado",
        desc: "Tus datos nunca salen de tu navegador. Sin rastreo, sin almacenamiento, sin procesamiento en servidor."
      },
      seo: {
        title: "Optimizado para SEO",
        desc: "Cada herramienta sigue las mejores prácticas de SEO y genera resultados estándar para producción."
      }
    },
    faq: {
      title: "Preguntas Frecuentes"
    }
  },
  fr: {
    ui: {
      copy: "Copier",
      download: "Télécharger",
      reset: "Réinitialiser",
      generate: "Générer",
      preview: "Aperçu",
      livePreview: "Aperçu en Direct",
      code: "Code",
      success: "Succès",
      error: "Erreur",
      required: "Requis",
      optional: "Optionnel"
    },
    features: {
      title: "Pourquoi SEO Utilities ?",
      subtitle: "Conçu pour la vitesse, la confidentialité et l'expérience développeur",
      fast: {
        title: "Ultra Rapide",
        desc: "Tous les outils s'exécutent dans votre navigateur sans requête serveur. Résultats instantanés."
      },
      private: {
        title: "100% Privé",
        desc: "Vos données ne quittent jamais votre navigateur. Pas de suivi, pas de stockage sur serveur."
      },
      seo: {
        title: "Optimisé SEO",
        desc: "Chaque outil suit les meilleures pratiques SEO et génère un code conforme pour la production."
      }
    },
    faq: {
      title: "Questions Fréquentes"
    }
  },
  de: {
    ui: {
      copy: "Kopieren",
      download: "Herunterladen",
      reset: "Zurücksetzen",
      generate: "Generieren",
      preview: "Vorschau",
      livePreview: "Live-Vorschau",
      code: "Code",
      success: "Erfolg",
      error: "Fehler",
      required: "Erforderlich",
      optional: "Optional"
    },
    features: {
      title: "Warum SEO Utilities?",
      subtitle: "Gebaut für Geschwindigkeit, Privatsphäre und Entwicklererfahrung",
      fast: {
        title: "Blitzschnell",
        desc: "Alle Tools laufen in Ihrem Browser ohne Server-Roundtrips. Sofortige Ergebnisse ohne Warten."
      },
      private: {
        title: "100% Privat",
        desc: "Ihre Daten verlassen nie Ihren Browser. Kein Tracking, keine Speicherung, keine Server-Verarbeitung."
      },
      seo: {
        title: "SEO Optimiert",
        desc: "Jedes Tool folgt SEO-Best-Practices und generiert standardkonforme Ergebnisse für die Produktion."
      }
    },
    faq: {
      title: "Häufig Gestellte Fragen"
    }
  },
  it: {
    ui: {
      copy: "Copia",
      download: "Scarica",
      reset: "Ripristina",
      generate: "Genera",
      preview: "Anteprima",
      livePreview: "Anteprima dal Vivo",
      code: "Codice",
      success: "Successo",
      error: "Errore",
      required: "Richiesto",
      optional: "Opzionale"
    },
    features: {
      title: "Perché SEO Utilities?",
      subtitle: "Progettato per velocità, privacy e l'esperienza degli sviluppatori",
      fast: {
        title: "Estremamente Veloce",
        desc: "Tutti gli strumenti vengono eseguiti nel browser senza richieste al server. Risultati immediati."
      },
      private: {
        title: "100% Privato",
        desc: "I tuoi dati non lasciano mai il browser. Nessun tracciamento, né archiviazione sui server."
      },
      seo: {
        title: "Ottimizzato per SEO",
        desc: "Ogni strumento segue le migliori pratiche SEO e genera codice pronto per la produzione."
      }
    },
    faq: {
      title: "Domande Frequenti"
    }
  },
  pt: {
    ui: {
      copy: "Copiar",
      download: "Baixar",
      reset: "Redefinir",
      generate: "Gerar",
      preview: "Visualizar",
      livePreview: "Prévia ao Vivo",
      code: "Código",
      success: "Sucesso",
      error: "Erro",
      required: "Obrigatório",
      optional: "Opcional"
    },
    features: {
      title: "Por que SEO Utilities?",
      subtitle: "Construído para velocidade, privacidade e experiência do desenvolvedor",
      fast: {
        title: "Ultra Rápido",
        desc: "Todas as ferramentas rodam no seu navegador sem idas ao servidor. Resultados instantâneos."
      },
      private: {
        title: "100% Privado",
        desc: "Seus dados nunca saem do seu navegador. Sem rastreamento, sem armazenamento em servidor."
      },
      seo: {
        title: "Otimizado para SEO",
        desc: "Cada ferramenta segue as melhores práticas de SEO e gera saídas prontas para produção."
      }
    },
    faq: {
      title: "Perguntas Frequentes"
    }
  }
};

const langs = ['en', 'es', 'fr', 'de', 'it', 'pt'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, 'dictionaries', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.ui = newTranslations[lang].ui;
    data.features = newTranslations[lang].features;
    data.faqTitle = newTranslations[lang].faq.title;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated UI/Features in ${lang}.json`);
  }
});
