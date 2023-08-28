import {addCategory, deleteCategory, editCategory, getAllCategory} from "../services/categoryService";
import {ControllerHandler} from "../types/controller";

const getAll: ControllerHandler = async (req, res, next) => {
    try {
        let categories = await getAllCategory()
        res.status(200).jsonp(categories)
    } catch (e) {
        next(e)
    }
}


const add: ControllerHandler = async (req, res, next) => {
    try {
        let category = req.body;
        let newCategory = await addCategory(category);
        res.status(200).jsonp(newCategory)
    } catch (e) {
        next(e)
    }
}


const remove: ControllerHandler = async (req, res, next) => {
    try {
        let id = req.params.id;
        await deleteCategory(id);
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
        let category = req.body;
        let newCategory = await editCategory(id, category);
        res.status(200).jsonp(newCategory)
    } catch (e) {
        next(e)
    }
}


export default {getAll, add, remove, edit}