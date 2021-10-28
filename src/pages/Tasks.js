import React from "react";
import './Tasks.css';

const Tasks = () => {
    return (
        <div id="main-task-container">
            <div className="main">
                <div className="two">
                    <div className="px-3">
                        <div className="round">
                            <img
                                src="https://img.icons8.com/bubbles/100/000000/girl-with-glasses-art-palette.png"
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
                        <span className="quote2 pl-2">Task: Practice</span>
                    </div>
                    <div className="d-flex justify-content-between px-3 align-items-center pb-3">
                        <div className="d-flex justify-content-start align-items-center">
                            <span className="quote2 pl-2">Date: 01.07.2020</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;