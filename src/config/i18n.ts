// Import the i18n library and the necessary functions
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language JSON files containing translations
import English from '../localization/en.json';
import French from '../localization/fr.json';
import German from '../localization/de.json';

// Define resources object with language translations
const resources = {
  en: { translation: English },
  de: { translation: German },
  fr: { translation: French },
};

// Initialize i18n using the initReactI18next hook
i18n
  .use(initReactI18next)
  // Init i18next with specified configurations
  .init({
    resources,            // Language resources with translations
    lng: "en",            // Default language set to English
    compatibilityJSON: 'v3',  // Compatibility mode for older JSON structures
    fallbackLng: 'en',    // Fallback language in case the selected language is not available
    debug: true           // Enable debug mode for development
  });

// Export the configured i18n instance
export default i18n;
