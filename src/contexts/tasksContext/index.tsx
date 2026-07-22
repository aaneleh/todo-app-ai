import { useContext, createContext, useState } from 'react';
import type { Task } from '../../@types/task';

const TasksContext = createContext({});

export function useTasks(){
    return useContext(TasksContext);
}

export function TasksProvider( { children } ) {
    const [tasks, setTasks] = useState<Task[]>([
    {   
        id: 0,
        status: false,
        description: "Crie sua primeira tarefa",
        date: new Date()
    },
    ]);
    const [nextId, setNextId] = useState<number>(1);

    function updateState(){
        setTasks(JSON.parse(localStorage.getItem("tasks")))
        setNextId(JSON.parse(localStorage.getItem("nextId")))
    }

    function updateLocalstorage(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
        localStorage.setItem("nextId", JSON.stringify(nextId))
    }
    
    const getTasks = () => {
        updateState()
        return tasks.filter(task => task.id !== undefined) || null;
    }

    const getTask = (id : number) => {
        updateState()
        return tasks.find(task => task.id === id) || null;
    }
    
    const createTask = (newTask : Task) => {
        if(tasks === null){
            setTasks([{
                id: nextId,
                status: false,
                description: newTask.description,
                date: newTask.date
            }]);
        } else {
            setTasks([...tasks, {
                id: nextId,
                status: false,
                description: newTask.description,
                date: newTask.date
            }]);
        }
        setNextId(nextId + 1);
        updateLocalstorage();
    }

    const toggleStatus = (id : number, status : boolean) => {
        setTasks(tasks => {
            return tasks.map((task) => {
                if(task.id === id) {
                    return {...task, status: status}
                }
                return task;
            })
        })
        updateLocalstorage()
    }

    const updateTask = ( updatedTask : Task ) => {
        setTasks(tasks => {
            return tasks.map((task) => {
                if(task.id === updatedTask.id) {
                    return {...task, description: updatedTask.description, date: updatedTask.date}
                }
                return task;
            })
        })
        updateLocalstorage()
    }

    const deleteTask = (id : number) => {
        setTasks(tasks.filter(task => task.id !== id))
        updateLocalstorage()
    }

    return (
        <TasksContext.Provider value={ { tasks, getTasks, getTask, createTask, toggleStatus, updateTask, deleteTask } }>
            { children }
        </TasksContext.Provider> 
    )
}