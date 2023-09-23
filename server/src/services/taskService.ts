import {Task} from "../models";
import {ITask} from "../models/Task";
import ApiError from "../utils/ApiError";

export const getAllTask = async (): Promise<ITask[]> => {
    let tasks = await Task.find();
    return tasks.map(o => ({name: o.name, description: o.description, difficult: o.difficult ?? 0, id: o._id, categoryId: o.categoryId}))
}

export const addTask = async (task: Omit<Partial<ITask>, "id">): Promise<ITask> => {
    let newTask = new Task(task);
    return newTask.save();
}

export const editTask = async (id: string, task: Omit<Partial<ITask>, "id">): Promise<ITask> => {
    await Task.findByIdAndUpdate(id, task);
    return Task.findById(id);
}

export const deleteTask = async (id: string) => {
    let task = await Task.findById(id);
    if (!task) {
        throw new ApiError(400, "Task not found")
    }
    await Task.findByIdAndDelete(id);
}