import {UserModel} from '../models/index.js'
import ApiError from '../utils/APIError.js';
import httpStatus from "http-status";

export const getUserFromId = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user)
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User Id")
    return user;
}