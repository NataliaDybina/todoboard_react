import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import TaskList from "./components/TaskList.tsx";
import {Status, type Task} from "./components/TaskCard.tsx";
import TaskDetails from "./components/TaskDetails.tsx";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    useEffect(() => {
        function getAllTasks() {
            axios.get("/api/todo").then(res => setTasks(res.data))
                .catch(err => console.log(err));
        }

        getAllTasks()
    }, [])

    const handleSaveTask = (savedTask: Task) => {

        setTasks(prevTasks => {
            const exists = prevTasks.some(t => t.id === savedTask.id);
            if (exists)
                return prevTasks.map(t => t.id === savedTask.id ? savedTask : t);
            else
                return [...prevTasks, savedTask]
        });
    };

    const handleDeleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }
    const handleOpenAddModal = () => {
        setSelectedTask(undefined);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="kanban-app">

                <header className="kanban-header">
                    <h1>Kanban Board</h1>
                    <button id="open-modal-btn" className="btn btn-primary" onClick={handleOpenAddModal}>
                        + Add New Task
                    </button>
                </header>


                <main className="kanban-board">
                    <TaskList status={Status.OPEN} title="Open"
                              tasks={tasks.filter(task => task.status === Status.OPEN)}
                              onTaskUpdated={handleSaveTask}
                              onTaskDeleted={handleDeleteTask}
                              onTaskEdit={handleOpenEditModal}/>
                    <TaskList status={Status.IN_PROGRESS} title="In progress"
                              tasks={tasks.filter(task => task.status === Status.IN_PROGRESS)}
                              onTaskUpdated={handleSaveTask}
                              onTaskDeleted={handleDeleteTask}
                              onTaskEdit={handleOpenEditModal}/>
                    <TaskList status={Status.DONE} title="Done"
                              tasks={tasks.filter(task => task.status === Status.DONE)}
                              onTaskUpdated={handleSaveTask}
                              onTaskDeleted={handleDeleteTask}
                              onTaskEdit={handleOpenEditModal}/>

                </main>

                {isModalOpen && <TaskDetails setIsModalOpen={setIsModalOpen}
                                             onTaskSaved={handleSaveTask}
                                             taskToEdit={selectedTask}
                />}
            </div>
        </>
    )
}

export default App
