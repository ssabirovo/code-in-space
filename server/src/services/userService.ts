import {UserModel} from '../models'
import ApiError from '../utils/ApiError';
import httpStatus from "http-status";

export const getUserFromId = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user)
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User Id")
    return user;
}