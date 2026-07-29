import './styles.css'
import { FiSend } from "react-icons/fi";
import { useEffect, useRef, useState, type SetStateAction } from 'react';
import { useTasks } from '../../contexts/tasksContext';
import type { Task } from '../../@types/task';
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import OpenAI from 'openai';
import { ToastContainer, toast } from 'react-toastify';

function Chat() {

  let client: OpenAI;
  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;

  const { t } = useTranslation();
  const { tasks } = useTasks() as {tasks: Task[]};
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLElement | null>(null);
  const theme = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light';

  const instructions = `
    Usar linguagem informal e cotidiana. 
    Não utilizar efeitos como negrito ou itálico. 
    Não ofereça para alterar tarefas do usuário.
    Responda em ${i18next.resolvedLanguage == "pt" ? "português" : "inglês"}.
    Considere que o usuário tem as tarefas: ${JSON.stringify(tasks)}
  `;

  try {
    client = new OpenAI({
      apiKey: openAI_API,
      dangerouslyAllowBrowser: true
    });

  } catch (error) {
    toast.error('Ocorreu um erro ao tentar conectar à OpenAI');
    console.error('Failed to connect to OpenAI:', error);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  useEffect(scrollToBottom, [messages]);


  const handleChange = (e: { currentTarget: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.currentTarget.value)
  }

  const handleEnter = (e: { key: string; preventDefault: () => void; }) => {
    if(e.key === "Enter"){
      e.preventDefault();
      sendMessage()
    }
  }

  const sendMessage = () => {
    messages.push({
        role: "user",
        content: inputValue,
    })
    setInputValue('');
    getResponse();
  }

  const getResponse = async () => {
    try {
      const response = await client.responses.create({
        model: 'gpt-5.4-mini',
        instructions: instructions,
        input: messages
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.output_text,
        }
      ])

    } catch (error) {
      console.error('Failed to get response from OpenAI:', error);
      toast.error('Ocorreu um erro ao tentar obter uma resposta');
    }
  }

  return (
    <>
    <section id="chat">
        <h2>Chat</h2>
        <div className="chat-content">
          {
            messages.map((el, key) => (
              <div key={key} className={`${el.role} message-wrapper`}>
                <p className='message'>{el.content}</p>
              </div>
            ))
          }
        </div>
        <div className="chat-input">
          <input type="text" value={inputValue} placeholder={t('chat.inputPlaceholder')} onChange={handleChange}  onKeyDown={handleEnter}/>

          <button className='button' onClick={sendMessage} disabled={inputValue == ''}>
            <FiSend />
          </button>
        </div>
    </section>
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

export default Chat
