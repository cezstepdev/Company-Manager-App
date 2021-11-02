import React, {useState} from "react";
import './Tasks.css';
import TaskList from "../components/tasks/TaskList/TaskList";
import {TabView, TabPanel} from 'primereact/tabview';

const Tasks = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="TO DO">
                    <TaskList tasks={[{title: 'sieasdasdasdma', done: false}, {title: 'elasdadasdo', done: false}]}/>
                </TabPanel>
                <TabPanel header="Done">
                    <TaskList tasks={[{title: 'siema', done: true}, {title: 'elo', done: true}]}/>
                </TabPanel>
            </TabView>
        </div>
    )
}

export default Tasks;