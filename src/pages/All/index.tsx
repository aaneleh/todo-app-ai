import { useTasks } from "../../contexts/tasksContext";
import TaskRow from "../../components/TaskRow";
import type { Task } from "../../@types/task";
import NewTask from "../../components/NewTask";
import './styles.css';
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import AISuggestion from "../../components/AISuggestion";

function All() {
  const { tasks } = useTasks() as {tasks: Task[]};
  const { t } = useTranslation();

  const [ AI, setAI ] = useState({
    chat: false,
    summary: false,
    suggestions: false
  });

  useEffect(() => {
    if(localStorage.getItem('AI')) setAI(JSON.parse(localStorage.getItem('AI')))
  },[])

  return (
    <section id="all">
      <h2> {t('tasks.title')} </h2>

      {(tasks === null || tasks.length === 0) 
        && 
        <div className="all-list">
          <p> {t('tasks.notfound')} </p>
        </div>}

      <div className="all-list"> 
        {tasks?.map((el : Task) => {
          return <div key={el.id}>
            <TaskRow id={el.id} status={el.status} description={el.description} date={el.date}/>
          </div>
        })}
      
        { 
          AI.summary && 
          
          <AISuggestion></AISuggestion>
        }
      </div>

      <div className="new-task-form-wrapper">
        <NewTask/>
      </div>
    </section>
  )
}

export default All