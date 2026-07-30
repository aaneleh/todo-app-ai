import './styles.css'
import { VscSparkleCompact } from "react-icons/vsc";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useTasks } from '../../contexts/tasksContext';
import type { Task } from '../../@types/task';
import i18next from 'i18next';
import { formatDistance } from "date-fns";
import { enGB, ptBR } from "date-fns/locale";
import OpenAI from 'openai';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function AISuggestion() {
  
  let client: OpenAI;
  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;
  const { t } = useTranslation();
  const { tasks } = useTasks() as {tasks: Task[]};
  const { createTask } = useTasks() as {createTask: any};
  const [suggestedTask, setSuggestedTask] = useState<Task>();
  const [visible, setVisible] = useState<boolean>(true);
  const theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light';

  
  try {
    client = new OpenAI({
      apiKey: openAI_API,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error('Failed to connect to OpenAI:', error);
    toast.error('Ocorreu ao conectar à OpenAI')
  }

  const getSuggestion = async () => {
    try {
      const instructions = `Responda em ${i18next.resolvedLanguage == "pt" ? "português" : "inglês"}`;
      const input = `Crie uma nova tarefa baseado na lista de tarefas do usuário: ${JSON.stringify(tasks)}. Responda com objeto no formato { description: <descrição da tarefa>, date: <data no formato yyyy-mm-ddThh:mm> }`;
      const response = await client.responses.create({
        model: 'gpt-5.4-mini',
        instructions: instructions,
        input: input,
      });
      
      const resJSON = JSON.parse(response.output_text);
      setSuggestedTask({description: resJSON.description, date: resJSON.date})
      
    } catch (error) {
      console.error('Failed to get response from OpenAI:', error);
      toast.error('Ocorreu um erro ao gerar a sugestão')
    }
  }

  const handleCreate = () => {
    createTask({description: suggestedTask.description, date: new Date(suggestedTask.date)})
    setVisible(false);
  }

  useEffect(() => {
    getSuggestion();
  },[])

  return (
    <>
      { visible &&
        <div id="ai-suggestion">
          <VscSparkleCompact />

          <div className="suggestion-content">
            <p className="suggestion-title">
              Sugestão
            </p>

            {
              suggestedTask?.description ?
                <div className="suggestion-line">
                  <p className='description'>
                    {suggestedTask?.description}
                  </p>
                  <p className="date">
                    {suggestedTask?.date < new Date() ? "" : `${t("date.futurePrefix")} `} 
                    { formatDistance(suggestedTask?.date, new Date(), {locale: i18next.resolvedLanguage == 'pt' ? ptBR : enGB })}
                    {suggestedTask?.date < new Date() ? ` ${t("date.pastSufix")}` : ""} 
                  </p>
                </div>
              :
                <div className="suggestion-line">
                  <p className='skeleton description'>
                    description
                  </p>
                  <p className='skeleton date'>
                    date
                  </p>
                </div>
            }

          </div>

          <button className='icon' onClick={handleCreate} onKeyDown={handleCreate} tabIndex={0}>
            <FiPlusCircle />
          </button>
        </div>
      }
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

export default AISuggestion