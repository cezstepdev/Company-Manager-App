import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import Tasks from "../../../pages/Tasks";
import {DataTableCrudDemo} from "../DataTableCrudDemo";

const TaskList = ({tasks}) => {
    const taskItems = tasks.map((task, index) => {
        return <TaskItem
            key={index}
            task={task}/>
    });

    return (
       <div className="main">
           {/*{taskItems}*/}
           <DataTableCrudDemo/>
       </div>
    )
}

export default TaskList;