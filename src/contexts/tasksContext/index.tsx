/* import { useContext, createContext, useState } from 'react';

const TasksContext = createContext({});

export function useTasksContext(){
    return useContext(TasksContext);
}

export function TasksProvider( { children } ) {
    const [tasks, setTasks] = useState([]);


    function getTasks(){
        return tasks;
    }

    function getTask(index : number){
        return tasks[index];
    }
    
    function createTask(description : string, date : Date){
        tasks.push({
            description: description,
            date: date
        })
        setTasks(tasks)
    }

    function updateTask(index : number, description : string, date : Date){
        tasks[index] = {
            description: description,
            date: date
        }
        setTasks(tasks)
    }

    function deleteTask(index : number){
        tasks.splice(index, 1)
        setTasks(tasks)
    }

    return (
        <TasksContext.Provider value={ { getTasks, getTask, createTask, updateTask, deleteTask } }>
            { children }
        </TasksContext.Provider> 
    )
} */