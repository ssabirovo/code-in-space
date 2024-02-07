import {Category} from "../models";
import {ICategory} from "../models/Category";
import ApiError from "../utils/ApiError";

export const getAllCategory = async (): Promise<ICategory[]> => {
    let categories = await Category.find();
    return categories.map(o => ({name: o.name, description: o.description, difficult: o.difficult ?? 0, id: o._id}))
}

export const addCategory = async (category: Omit<Partial<ICategory>, "id">): Promise<ICategory> => {
    let newCategory = new Category(category);
    return newCategory.save();
}

export const editCategory = async (id: string, category: Omit<Partial<ICategory>, "id">): Promise<ICategory> => {
    await Category.findByIdAndUpdate(id, category);
    return Category.findById(id);
}

export const deleteCategory = async (id: string) => {
    let category = await Category.findById(id);
    if (!category) {
        throw new ApiError(400, "Category not found")
    }
    await Category.findByIdAndDelete(id);
}