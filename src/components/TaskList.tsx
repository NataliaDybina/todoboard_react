import TaskCard from "./TaskCard.tsx";
import {type Task} from './TaskCard.tsx';

type TaskListProps = {
    status: string;
    title: string;
    tasks: Task[];
    onTaskUpdated: (updatedTask: Task) => void;
    onTaskDeleted: (taskId: string) => void;
    onTaskEdit: (task: Task) => void;
}
export default function TaskList({status, title, tasks, onTaskUpdated, onTaskDeleted, onTaskEdit}: TaskListProps) {
    return (
        <section className="kanban-column" data-status={status}>
            <div className="column-header">
                <h2>{title}</h2>
                <span className="task-count">{tasks.length}</span>
            </div>
            <div className="task-list">
                {tasks.map((task: Task) => (
                    <TaskCard key={task.id} task={task}
                              onTaskUpdated={onTaskUpdated}
                              onTaskDeleted={onTaskDeleted}
                              onTaskEdit={onTaskEdit}/>
                ))}
            </div>
        </section>
    )
}