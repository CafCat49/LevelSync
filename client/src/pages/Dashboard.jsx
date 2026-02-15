import { useState } from 'react';
import mockTasks from "../data/mockTasks.json";
import TaskList from '../components/TaskList';

export default function Dashboard()
{
    const [tasks, setTasks] = useState(mockTasks);

    return (
        <div>
            <h1>Dashboard</h1>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
}