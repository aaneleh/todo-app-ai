import './styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useTasks } from '../../contexts/tasksContext';
import type { Task } from '../../@types/task';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import OpenAI from 'openai';
import { ToastContainer, toast } from 'react-toastify';

function AISummary() {

  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;
  const { t } = useTranslation();
  const { tasks } = useTasks() as {tasks: Task[]};
  const [ summary, setSummary ] = useState<string>('');
  const AI = useState(JSON.parse(localStorage.getItem('AI')));
  const theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light';

  useEffect(() => {
    getSuggestion();
  },[])

  const getSuggestion = async () => {
    try {
      const client = new OpenAI({
        apiKey: openAI_API,
        dangerouslyAllowBrowser: true
      });
  
      const instructions = `Usar linguagem informal e cotidiana. Não utilizar efeitos como negrito ou itálico. Responda em ${i18next.resolvedLanguage == "pt" ? "português" : "inglês"}`;
      const input = `Escreva um paragrafo curto informando o usuário sobre as tarefas que estão na lista: ${JSON.stringify(tasks)}`;
      const response = await client.responses.create({
        model: 'gpt-5.4-mini',
        instructions: instructions,
        input: input,
      });
      setSummary(response.output_text);

    } catch (error) {
      console.error(t("openAI.conectionError"), error);
      toast.error(t("openAI.conectionError"))
    }
  }

  return (
    <>
    <div id="ai-summary">

      { summary ? 
        <p className='summary-text'>{summary}</p>
        : 
        <p className='summary-text'> 
          <span className="skeleton">a</span> <span className="skeleton">a</span>
        </p>
        }
        { AI.chat && 
          <Link to="/chat"> 
            <p className="button">    
              {t('menu.chat')} 
            </p>
          </Link>  
        }
    </div>
    <div className="toast">
      <ToastContainer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={theme}
      />
    </div>
    </>
  )
}

export default AISummary