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
            home: 'Home',
            all: 'All Tasks',
            chat: 'Chat',
            settings: 'Settings'
          },
          home: {
            title: 'Home',
            progressTitle: 'Progress',
            progressCompleted: 'finished',
            progressTotal: 'total',
            todayTitle: 'Today',
            todayNoTasks: 'No tasks for today',
            summaryTitle: 'Smart Summary'
          },
          tasks: {
            title: 'All tasks',
            notfound: 'No tasks found',
            description: 'Description',
            date: 'Date',
            submit: 'Create',
            updateModal: 'Updating task',
            close: 'Close',
            save: 'Save',
            suggestion: 'Suggestion'
          },
          chat: {
            inputPlaceholder: 'Send your message',
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
          },
          date: {
            futurePrefix: "In",
            pastSufix: "ago",
          },
          openAI: {
            conectionError: 'Failed to connect to OpenAI',
            responseError: 'Failed to get response from OpenAI',
          }
        }
      },
      pt: {
        translation: {
          menu: {
            home: 'Início',
            all: 'Tarefas',
            chat: 'Chat',
            settings: 'Preferências'
          },
          home: {
            title: 'Início',
            progressTitle: 'Progresso',
            progressCompleted: 'completas',
            progressTotal: 'totais',
            todayTitle: 'Hoje',
            todayNoTasks: 'Nenhuma tarefa para hoje',
            summaryTitle: 'Resumo Inteligente'
          },
          tasks: {
            title: 'Todas as tarefas',
            notfound: 'Nenhuma tarefa encontrada',
            description: 'Descrição',
            date: 'Data',
            submit: 'Criar',
            updateModal: 'Atualizando tarefa',
            close: 'Fechar',
            save: 'Salvar',
            suggestion: 'Sugestão'
          },
          chat: {
            inputPlaceholder: 'Envie sua mensagem',
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
          },
          date: {
            futurePrefix: "Daqui a",
            pastSufix: "atrás",
          },
          openAI: {
            conectionError: 'Ocorreu um erro ao conectar à OpenAI',
            responseError: 'Ocorreu um erro ao tentar obter uma resposta de OpenAI',
          }
        }
      }
    }
  });

export default i18n;