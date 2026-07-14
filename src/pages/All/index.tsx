import { useTasks } from "../../contexts/tasksContext";
import TaskRow from "../../components/TaskRow";
import type { Task } from "../../@types/task";
import NewTask from "../../components/NewTask";
import './styles.css';
import { useTranslation } from "react-i18next";

function All() {
  const { tasks } = useTasks() as {tasks: Task[]};
  const { t } = useTranslation();

  return (
    <section id="all">
      <h2>All</h2>
      {(tasks === undefined || tasks.length === 0 || tasks === null) 
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
      </div>
      <NewTask/>
    </section>
  )
}

export default All
