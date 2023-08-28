import {ControllerHandler} from "../types/controller";
import {AuthTokenPayload} from "../types/auth";
import {isUserAdminFromId} from "../services/userService";
import ApiError from "../utils/ApiError";

const adminSecure: ControllerHandler = async (req, res, next) => {
    try {
        let authData: AuthTokenPayload = req["authData"]
        let isUserAdmin=await isUserAdminFromId(authData?.userId)
        if(!isUserAdmin){
            throw new ApiError(403, "You are not admin")
        }
        next()
    } catch (error) {
        next(error);
    }
};

export {adminSecure};
