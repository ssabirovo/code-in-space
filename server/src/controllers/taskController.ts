import {addTask, deleteTask, editTask, getAllTask} from "../services/taskService";
import {ControllerHandler} from "../types/controller";

const getAll: ControllerHandler = async (req, res, next) => {
    try {
        let categories = await getAllTask()
        res.status(200).jsonp(categories)
    } catch (e) {
        next(e)
    }
}


const add: ControllerHandler = async (req, res, next) => {
    try {
        let task = req.body;
        let newTask = await addTask(task);
        res.status(200).jsonp(newTask)
    } catch (e) {
        next(e)
    }
}


const remove: ControllerHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        await deleteTask(id);
        res.status(200).jsonp({
            message: "Successfully deleted"
        })
    } catch (e) {
        next(e)
    }
}

const edit: ControllerHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        let task = req.body;
        let newTask = await editTask(id, task);
        res.status(200).jsonp(newTask)
    } catch (e) {
        next(e)
    }
}


export default {getAll, add, remove, edit}