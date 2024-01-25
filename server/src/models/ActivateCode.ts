import mongoose from 'mongoose';


export interface IActivateCode {
    userId: string,
    code: number,
    createTime: Date,
    expireTime: Date,
    id: mongoose.Types.ObjectId,
}

const activateCode = new mongoose.Schema<IActivateCode>({
    userId: {
        type: String,
        ref: 'users',
        required: true,
        index: true,
        unique: true,
    },
    code: {
        type: Number,
        required: true,
    },
    createTime: {
        type: Date,
        required: true,
        default: new Date(),
    },
    expireTime: {
        type: Date,
        required: true,
    },
});

const RefreshToken = mongoose.model('ActivateCode', activateCode);

export default RefreshToken;
