import React from "react";
import "./TaskItem.css"

const TaskItem = ({task}) => {

    let button = '';

    if (task.done === false) {
        button = (
            <div>
                <button id="done-button" title="Done">Done</button>
            </div>
        );
    }

    return (
        <div className="two">
            <div className="px-3">
                <div className="round">
                    <img
                        src="https://img.icons8.com/bubbles/100/000000/girl-with-glasses-art-palette.png"
                        alt="picture of task"
                        width="23"/>
                </div>
            </div>
            <div className="px-3 pt-3">
                <h3 className="name">Friendly Painter</h3>
                <p className="quote2">
                    Within the exercise, we design a room in a scandinavian
                    style.
                </p>
            </div>
            <div className="d-flex justify-content-start px-3 align-items-center">
                <span className="quote2 pl-2">Task: {task.title}</span>
            </div>
            <div className="d-flex justify-content-between px-3 align-items-center pb-3">
                <div className="d-flex justify-content-start align-items-center">
                    <span className="quote2 pl-2">Date: 01.07.2020</span>
                </div>
            </div>
            {button}
        </div>
    )
}

export default TaskItem;