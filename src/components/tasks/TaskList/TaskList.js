import React from "react";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({tasks}) => {
    const taskItems = tasks.map((task, index) => {
        return <TaskItem
            key={index}
            task={task}/>
    });

    return (
       <div className="main">
           {taskItems}
       </div>
    )
}

export default TaskList;