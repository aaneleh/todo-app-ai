import type { Task } from "../../@types/task"
import { useTasks } from "../../contexts/tasksContext";
import './styles.css';
import { FiTrash, FiEdit3 } from "react-icons/fi";

const TaskRow: React.FC<Task> = (task) => {

  console.log(task)
  const { deleteTask } = useTasks() as {deleteTask};


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
            <p>{task.status ? "CHECKED" : "UNCHECKED"}</p>
            <p>{task.description}</p>
            <p>{task.date.toString()}</p>
            <p>
              <FiEdit3 />
            </p>
            <p onClick={(handleDelete)} onKeyDown={(handleDelete)}>
              <FiTrash />
            </p>
          </div>
        }
    </>
  )
}

export default TaskRow
