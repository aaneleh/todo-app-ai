import { useState } from "react";
import { FiTrash, FiEdit3, FiCheck } from "react-icons/fi";
import { formatDistance } from "date-fns";
import { enGB, pt } from "date-fns/locale";

import { useTasks } from "../../contexts/tasksContext";
import type { Task } from "../../@types/task"
import './styles.css';

const TaskRow: React.FC<Task> = (task) => {

  const { deleteTask } = useTasks() as {deleteTask};
  const { toggleStatus } = useTasks() as {toggleStatus};

  const [ checkbox, setCheckbox ] = useState(task.status);

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
    toggleStatus(task.id, checkbox);
  }

  const handleDelete = (e) => {
    if(e.key === "Enter" || e.type === "click"){
      e.preventDefault();
      deleteTask(task.id);
    }
  }

  return (
    <>
        {task !== undefined && 
          <div id="task-row">
            <button className={`checkbox ${checkbox ? "checked" : "unchecked"}`} onClick={handleCheckbox}>
              <FiCheck />
            </button>
            <p>{task.description}</p>
            <p className="subtext">{ formatDistance(task.date, new Date(), {locale: enGB })}</p>
            <div className="icon">
              <FiEdit3 />
            </div>
            <button className="icon" onClick={(handleDelete)} onKeyDown={(handleDelete)} tabIndex={0}>
              <FiTrash />
            </button>
          </div>
        }
    </>
  )
}

export default TaskRow
