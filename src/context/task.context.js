import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { initialColumns } from "../data/initColumns";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {

    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem("board")) || initialColumns);

    useEffect(() => {
        localStorage.setItem("board", JSON.stringify(columns))
    }, [columns]);

    const addTask = (columnName) => {

        const newTask = {
            taskTitle : `New ${columnName} Task`,
            id : uuidv4(),
        }
    
        const selectedColumn = columns[columnName]
        const selectedTasks = [...selectedColumn.items]
        selectedTasks.push(newTask)
        
        setColumns({...columns, [columnName] : {...selectedColumn, items: selectedTasks}})
    };

    const deleteTask = (columnName, id) => {

        const selectedColumn = columns[columnName]
        const selectedTasks = [...selectedColumn.items]
        const filteredTasks = selectedTasks.filter( t => t.id !== id)

        setColumns({...columns, [columnName] : {...selectedColumn, items: filteredTasks}})
    };

    const updateTitle = (value, t, columnName) => {

        const selectedColumn = columns[columnName];
        const selectedTasks = [...selectedColumn.items]
        const findTask = selectedTasks.find(item => item.id === t.id);
        console.log(findTask)
        setColumns({...columns, [columnName] : 
            {...selectedColumn, items: selectedTasks.map(task => {
                return task.id === t.id ? {...task, taskTitle: value} : task
            })}})

    }

    return <TaskContext.Provider
    value={{
        columns,
        setColumns,
        addTask,
        deleteTask,
        updateTitle
    }}>
    {children}</TaskContext.Provider>

}

export { TaskContext, TaskProvider }