import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          menu: {
            settings: 'Settings'
          },
          tasks: {
            notfound: 'No tasks found'
          },
          settings: {
            title: 'Settings',
            subtitleLanguage: 'Language',
            subtitleTheme: 'Theme',
            themeLight: 'Light',
            themeDark: 'Dark',
            subtitleAI: 'AI',
            AIChat: 'Chat',
            AISummary: 'Smart Summary',
            AISuggestions: 'Suggestions',
            save: 'Save',
          }
        }
      },
      pt: {
        translation: {
          menu: {
            settings: 'Configurações'
          },
          tasks: {
            notfound: 'Nenhuma tarefa encontrada'
          },
          settings: {
            title: 'Configurações',
            subtitleLanguage: 'Idioma',
            subtitleTheme: 'Tema',
            themeLight: 'Claro',
            themeDark: 'Escuro',
            subtitleAI: 'IA',
            AIChat: 'Chat',
            AISummary: 'Resumo inteligente',
            AISuggestions: 'Sugestões',
            save: 'Salvar',
          }
        }
      }
    }
  });

export default i18n;