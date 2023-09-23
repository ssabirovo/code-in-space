import mongoose from 'mongoose';

export interface ITask {
    name: string,
    description: string,
    difficult: number,
    id: mongoose.Types.ObjectId,
    categoryId: string,
    
}


const task = new mongoose.Schema<ITask>({
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
    categoryId: {
        ref: "Category",
        type: String,
        required: true,
        index: true,
    }
}, {
    versionKey: false,
});

const Task = mongoose.model('Task', task);

export default Task;
