import { useTasks } from "../../contexts/tasksContext";
import NewTask from "../../components/NewTask"
import TaskRow from "../../components/TaskRow";
import type { Task } from "../../@types/task";
import ProgressBar from "../../components/ProgressBar"
import './styles.css'
import { useTranslation } from "react-i18next";
import AISummary from "../../components/AISummary";
import { useEffect, useState } from "react";

function Home() {

  const { t } = useTranslation();
  const d = new Date();
  const { tasks } = useTasks() as {tasks: Task[]};

  const [ AI, setAI ] = useState({
    chat: false,
    summary: false,
    suggestions: false
  });

  useEffect(() => {
    if(localStorage.getItem('AI')) setAI(JSON.parse(localStorage.getItem('AI')))
  },[])

  return (
    <section id="home">
      <h2> {t("home.title")} </h2>
      
      <div className="progress-card card">
        <h3> {t("home.progressTitle")}</h3>
        <ProgressBar total={tasks.length} completed={tasks.filter(task => task.status === true).length}/>
      </div>

      <div className="today-card card">
        <h3> {t("home.todayTitle")} </h3>
        {(tasks === undefined || tasks.length === 0 || tasks === null) 
          && 
          <div>
            <p> {t("home.todayNoTasks")} </p>
          </div>}

        <div> 
          { tasks.filter(el => el.date?.toDateString() === d.toDateString()).map((el : Task) => {
            return <div key={el.id}>
              <TaskRow id={el.id} status={el.status} description={el.description} date={el.date}/>
            </div>
          })}
        </div>
        <NewTask/>
      </div>

      { 
        AI.summary && 
        <div className="card">
          <h3> Resumo Inteligente </h3>
          <AISummary></AISummary>
        </div>  
      }

    </section>
  )
}

export default Home
