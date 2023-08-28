import mongoose from 'mongoose';

export interface ICategory {
    name: string,
    description: string,
    difficult: number,
    id: mongoose.Types.ObjectId
}


const category = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficult: {
        type: Number,
    },
}, {
    versionKey: false,
});

const Category = mongoose.model('Category', category);

export default Category;
