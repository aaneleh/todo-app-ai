import { useTasks } from "../../contexts/tasksContext";
import NewTask from "../../components/NewTask"
import TaskRow from "../../components/TaskRow";
import type { Task } from "../../@types/task";
import ProgressBar from "../../components/ProgressBar"
import './styles.css'

function Home() {
  const { tasks } = useTasks() as {tasks: Task[]};

  const d = new Date();

  return (
    <section id="home">
      <h2>Home</h2>
      
      <div className="progress-card card">
        <h3>Progress</h3>
        <ProgressBar total={10} completed={4}/>
      </div>

      <div className="today-card card">
        <h3>Today</h3>
        {(tasks === undefined || tasks.length === 0 || tasks === null) 
          && 
          <div>
            <p> No tasks for today </p>
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


    </section>
  )
}

export default Home
