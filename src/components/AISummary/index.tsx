import OpenAI from 'openai';
import { useEffect, useState } from 'react';
import { useTasks } from '../../contexts/tasksContext';
import type { Task } from '../../@types/task';
import i18next from 'i18next';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

function AISummary() {

  const { t } = useTranslation();
  const { tasks } = useTasks() as {tasks: Task[]};
  const [ summary, setSummary ] = useState<string>('');
  const [ AI, setAI ] = useState({
    chat: false,
    summary: false,
    suggestions: false
  });

  useEffect(() => {
    if(localStorage.getItem('AI')) setAI(JSON.parse(localStorage.getItem('AI')))
  },[])

  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;

  const client = new OpenAI({
    apiKey: openAI_API,
    dangerouslyAllowBrowser: true
  });

  const getSuggestion = async () => {
    const instructions = `Usar linguagem informal e cotidiana. Não utilizar efeitos como negrito ou itálico. Utilize o idioma atual: ${i18next.resolvedLanguage}`;
    const input = `Escreva um paragrafo curto informando o usuário sobre as tarefas que estão na lista: ${JSON.stringify(tasks)}`;
    
    const response = await client.responses.create({
      model: 'gpt-5.4-mini',
      instructions: instructions,
      input: input,
    });
    setSummary(response.output_text);
  }

  useEffect(() => {
    getSuggestion();
  },[])

  return (
    <div id="ai-summary">
      <p>
        {/* {summary} */}
        No momento, não há tarefas na lista. Quando você adicionar novos itens, eles aparecerão aqui para acompanhar o que precisa ser feito.
      </p>
        { AI.chat && 
          <Link to="/chat"> 
            <p className="button">    
              {t('menu.chat')} 
            </p>
          </Link>  
        }
    </div>
  )
}

export default AISummary