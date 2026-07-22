import OpenAI from 'openai';
import { useTasks } from '../../contexts/tasksContext';
import { useEffect, useState } from 'react';
import type { Task } from '../../@types/task';
import i18next from 'i18next';

function AISuggestion() {

  const { tasks } = useTasks() as {tasks: Task[]};
  const { createTask } = useTasks() as {createTask: any};
  const [suggestedTask, setSuggestedTask] = useState<Task>();

  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;
  const client = new OpenAI({
    apiKey: openAI_API,
    dangerouslyAllowBrowser: true
  });

  const getSuggestion = async () => {
    const instructions = `Utilize o idioma atual para a descrição: ${i18next.resolvedLanguage}`;
    const input = `Crie uma nova tarefa baseado na lista de tarefas do usuário: ${JSON.stringify(tasks)}. Responda com objeto no formato { description: <descrição da tarefa>, date: <data no formato yyyy-mm-ddThh:mm> }`;
      
    const response = await client.responses.create({
      model: 'gpt-5.4-mini',
      instructions: instructions,
      input: input,
    });
    console.log(response.output_text);
    //setSuggestedTask()
  }

  useEffect(() => {
    getSuggestion();
  },[])

  return (
    <div id="ai-summary">
      IA SUGGESTION
      {suggestedTask?.description}
      {suggestedTask?.date}
    </div>
  )
}

export default AISuggestion