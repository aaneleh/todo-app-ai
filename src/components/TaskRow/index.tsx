import { useState } from "react";
import { FiTrash, FiEdit3, FiCheck } from "react-icons/fi";
import { formatDistance } from "date-fns";
import { enGB } from "date-fns/locale";
import { useTasks } from "../../contexts/tasksContext";
import type { Task } from "../../@types/task"
import './styles.css';
import UpdateTask from "../UpdateTask";

const TaskRow: React.FC<Task> = (task) => {

  const { deleteTask } = useTasks() as {deleteTask: any};
  const { toggleStatus } = useTasks() as {toggleStatus : any};

  const [ checkbox, setCheckbox ] = useState(task.status);
  const [ modal, setModal ] = useState(false);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    setModal(true);
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
