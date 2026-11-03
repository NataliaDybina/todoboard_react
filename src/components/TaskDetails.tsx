import type {Dispatch, SetStateAction} from "react";
import {type SubmitEvent} from "react";
import {Status, type Task} from "./TaskCard.tsx";
import axios, {type AxiosError, type AxiosResponse} from "axios";

type AddTaskProps = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    onTaskSaved: (task: Task) => void;
    taskToEdit?: Task
}

type NewTaskDTO = {
    description: string;
    status: Status;
}
export default function TaskDetails({setIsModalOpen, onTaskSaved, taskToEdit}: AddTaskProps) {

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = Object.fromEntries(form);

        if (!taskToEdit) {
            const newTask: NewTaskDTO = {
                description: data.description.toString(),
                status: data.status.toString() as Status
            };
            axios.post("/api/todo", newTask)
                .then((response: AxiosResponse<Task>) => {
                    onTaskSaved(response.data);
                    setIsModalOpen(false);
                    console.log(response);
                })
                .catch((error: AxiosError) => {
                    console.log(error)
                });
        } else {
            const task: Task = {
                id: taskToEdit.id,
                description: data.description.toString(),
                status: data.status.toString() as Status
            }
            axios.put(`/api/todo/${task.id}/update`, task)
                .then(response => {
                    console.log(response);
                    onTaskSaved(response.data);
                    setIsModalOpen(false);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add Task</h2>
                    <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                </div>
                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="task-description">Description / Title</label>
                        <input type="text" id="task-description" name="description"
                               placeholder="What needs to be done?"
                               defaultValue={taskToEdit ? taskToEdit.description : ""}
                               required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="task-status">Status</label>
                        <select id="task-status" name="status"
                                defaultValue={taskToEdit ? taskToEdit.status : Status.OPEN}
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}