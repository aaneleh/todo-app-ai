import { useEffect, useState } from "react";
import { useTasks } from "../../contexts/tasksContext";
import TaskRow from "../../components/TaskRow";
import type { Task } from "../../@types/task";
import NewTask from "../../components/NewTask";
import './styles.css';

function All() {
  const { tasks } = useTasks() as {tasks: Task[]};

  return (
    <section id="all">
      <h2>All</h2>
      <div className="all-list">
        {tasks === undefined && <p>No tasks</p>}

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
