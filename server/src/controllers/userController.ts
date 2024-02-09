import {getUserFromId} from '../services/userService';
import {ControllerHandler} from "../types/controller";

const getUserInfo: ControllerHandler = async (req, res, next) => {
    const userId = req["authData"].userId
    try {
        const user = await getUserFromId(userId)
        const responseUser = {
            id: user._id,
            email: user.email,
            role: user.role,
        }
        res.json({user: responseUser});
    } catch (error) {
        next(error);
    }
};

export default {
    getUserInfo
}