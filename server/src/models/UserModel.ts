import mongoose from "mongoose";

export enum ROLE{
    ADMIN="ADMIN",
    USER="USER",
}

export type Source="email" | "google"

export interface IUser {
    username: string,
    name: string,
    image: string,
    about: string,
    email: string,
    password: string,
    source: Source,
    role: ROLE,
    _id: string,
    active: boolean,
}

const userSchema = new mongoose.Schema<IUser>({
    username: {type: String},
    name: {type: String,},
    image: {type: String},
    about: {type: String},
    email: {type: String, required: true,},
    password: {type: String},
    source: {type: String},
    role: {
        type: String,
        enum: Object.values(ROLE)
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {collection: "users"})

const UserModel = mongoose.model('UserSchema', userSchema)

export default UserModel;