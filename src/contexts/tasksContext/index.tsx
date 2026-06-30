import { useContext, createContext, useState } from 'react';

const TasksContext = createContext({});

export function useTasksContext(){
    return useContext(TasksContext);
}

export function TasksProvider( { children } ) {
    const [tasks, setTasks] = useState([]);


    function getTasks(){
        return tasks;
    }

    function getTask(index){
        return tasks[index];
    }
    
    function createTask(description, date){
        tasks.push({
            description: description,
            date: date
        })
        setTasks(tasks)
    }

    function updateTask(index, description, date){
        tasks[index] = {
            description: description,
            date: date
        }
        setTasks(tasks)
    }

    function deleteTask(index){
        tasks.splice(index, 1)
        setTasks(tasks)
    }

    return (
        <TasksContext.Provider value={ { getTasks, getTask, createTask, updateTask, deleteTask } }>
            { children }
        </TasksContext.Provider> 
    )
}