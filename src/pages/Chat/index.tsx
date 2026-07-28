import { useEffect, useRef, useState, type SetStateAction } from 'react';
import './styles.css'
import { useTranslation } from "react-i18next";
import { useTasks } from '../../contexts/tasksContext';
import type { Task } from '../../@types/task';
import OpenAI from 'openai';
import { FiSend } from "react-icons/fi";
import i18next from 'i18next';

function Chat() {

  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;

  const client = new OpenAI({
    apiKey: openAI_API,
    dangerouslyAllowBrowser: true
  });

  const { t } = useTranslation();
  const { tasks } = useTasks() as {tasks: Task[]};
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLElement | null>(null);

  const instructions = `
  Usar linguagem informal e cotidiana. 
  Não utilizar efeitos como negrito ou itálico. 
  Utilize o idioma atual: ${i18next.resolvedLanguage}
  `;

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
  }

  return (
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
          <input type="text" value={inputValue} placeholder='Envie sua mensagem' onChange={handleChange}  onKeyDown={handleEnter}/>

          <button className='button' onClick={sendMessage} disabled={inputValue == ''}>
            <FiSend />
          </button>
        </div>
    </section>
  )
}

export default Chat
