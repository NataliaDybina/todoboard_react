import axios from "axios";
import type {MouseEvent} from "react";

export const Status = {
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
} as const;
export type Status = typeof Status[keyof typeof Status];

export type Task = {
    id: string;
    description: string;
    status: Status;
}

export type TaskCardProps = {
    task: Task;
    onTaskUpdated: (updatedTask: Task) => void;
    onTaskDeleted: (taskId: string) => void;
    onTaskEdit: (task: Task) => void;
}
export default function TaskCard({task, onTaskUpdated, onTaskDeleted, onTaskEdit}: TaskCardProps) {
    function handleDeleteTask(e: MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();

        axios.delete(`/api/todo/${task.id}`, {})
            .then(r => {
                    console.log(r);
                    onTaskDeleted(task.id);
                }
            )
            .catch(err => console.log(err));
    }

    function handleUpdateStatus(e: MouseEvent<HTMLButtonElement>, direction: string): void {
        e.stopPropagation();

        let newStatus;
        if (direction === "back")
            newStatus = task.status === Status.DONE ? Status.IN_PROGRESS : Status.OPEN;
        else
            newStatus = task.status === Status.OPEN ? Status.IN_PROGRESS : Status.DONE;

        const updatedTask: Task = {
            id: task.id,
            description: task.description,
            status: newStatus
        }
        axios.put(`/api/todo/${task.id}/update`, updatedTask)
            .then(r => {
                console.log(r);
                onTaskUpdated(updatedTask);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="task-card" data-id={task.id} onClick={() => onTaskEdit(task)}>
            <div className="task-content">
                <h3>{task.description}</h3>
            </div>
            <div className="task-footer">
                <span className="badge open">{task.status}</span>
                <div className="task-actions">
                    {task.status != Status.OPEN &&
                        <button className="btn-icon" title="Move Back"
                                onClick={(e) => handleUpdateStatus(e, "back")}>⬅️</button>}
                    {task.status != Status.DONE &&
                        <button className="btn-icon" title="Move Forward"
                                onClick={(e) => handleUpdateStatus(e, "forward")}>➡️</button>}
                    <button className="btn-icon" title="Edit" onClick={() => onTaskEdit(task)}>✏️</button>
                    <button className="btn-icon delete" title="Delete" onClick={handleDeleteTask}>🗑️</button>
                </div>
            </div>
        </div>
    )
}