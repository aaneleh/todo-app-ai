import './styles.css';
import { FiTrash, FiEdit3, FiCheck } from "react-icons/fi";
import { useState } from "react";
import type { Task } from "../../@types/task"
import { useTasks } from "../../contexts/tasksContext";
import UpdateTask from "../UpdateTask";
import { formatDistance } from "date-fns";
import { enGB, ptBR } from "date-fns/locale";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const TaskRow: React.FC<Task> = (task) => {

  const { t } = useTranslation();
  
  const { deleteTask } = useTasks() as {deleteTask: any};
  const { toggleStatus } = useTasks() as {toggleStatus : any};

  const [ checkbox, setCheckbox ] = useState(task.status);
  const [ modal, setModal ] = useState(false);

  const handleCheckbox = () => {
    if(checkbox) {
      setCheckbox(false);
      toggleStatus(task.id, false);
    } else {
      setCheckbox(true);
      toggleStatus(task.id, true);
    }
  }

  const handleDelete = (e) => {
    if(e.key === "Enter" || e.type === "click"){
      e.preventDefault();
      deleteTask(task.id);
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setModal(true);
  }

  return (
    <>
        {task !== undefined && 
          <div id="task-row" className={`${checkbox ? "finished" : ""} ${task.date < new Date() ? "late" : ""}`}>

            <button className={`checkbox ${checkbox ? "checked" : "unchecked"}`} onClick={handleCheckbox}>
              <FiCheck />
            </button>
            
            <p className="description">{task.description}</p>
            <p className="date">
              {task.date < new Date() ? "" : `${t("date.futurePrefix")} `} 
              { formatDistance(task.date, new Date(), {locale: i18next.resolvedLanguage == 'pt' ? ptBR : enGB })}
              {task.date < new Date() ? ` ${t("date.pastSufix")}` : ""} 
            </p>

            <button className="icon" onClick={(handleUpdate)} onKeyDown={(handleUpdate)} tabIndex={0}>
              <FiEdit3 />
            </button>
            <button className="icon" onClick={(handleDelete)} onKeyDown={(handleDelete)} tabIndex={0}>
              <FiTrash />
            </button>

            {
              modal && <UpdateTask trigger={modal} setTrigger={setModal} id={task.id} description={task.description} date={task.date}/>
            }
          </div>
        }
    </>
  )
}

export default TaskRow
