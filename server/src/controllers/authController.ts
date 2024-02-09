import bcryptjs from 'bcryptjs';
import {
    activeUser,
    createNewUser,
    fetchUserFromEmail,
    fetchUserFromEmailAndPassword,
    sendCode,
    updatePassword, validateCode,
    verifyCurrentPassword,
    verifyUserFromRefreshTokenPayload
} from '../services/authService';
import {
    clearRefreshToken,
    generateAccessTokenFromRefreshTokenPayload,
    generateAuthTokens,
    verifyRefreshToken,
} from '../services/tokenService';
import {OAuth2Client} from 'google-auth-library';
import moment from "moment";
import {userMapper} from "../utils/mapper/userMapper";
import ApiError from "../utils/ApiError";
import {ROLE} from "../models/UserModel";
import {ControllerHandler} from "../types/controller";
import logger from "../config/logger";
import httpStatus from "http-status";


const register: ControllerHandler = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await createNewUser({
            email: email,
            password: hashedPassword,
            source: "email",
            role: ROLE.USER,
        });
        const tokens = await generateAuthTokens(newUser)
        await sendCode(newUser._id);
        res.json({user: userMapper(newUser), tokens});
    } catch (error) {
        next(error);
    }
};

const validateActivateCode: ControllerHandler = async (req, res, next) => {
    try {
        const {code}=req.body
        logger.info(JSON.stringify(req["authData"]))
        let userId=req["authData"]["userId"]
        logger.info(userId);
        let result = await validateCode(userId, code);
        if(!result){
            throw new ApiError(httpStatus.BAD_REQUEST, "Activate code is forbidden")
        }
        await activeUser(userId)
        res.json({
            success: true,
            message: "Verified!"
        })
    }catch (e) {
        next(e)
    }
}

const login: ControllerHandler = async (req, res, next) => {
    try {
        const user = await fetchUserFromEmailAndPassword(req.body);
        const tokens = await generateAuthTokens(user);
        res.json({user: userMapper(user), tokens});
    } catch (error) {
        next(error);
    }
};

// const requestCode: ControllerHandler = async (req, res, next) => {
//     try {
        //TODO manual request code

//         res.json({});
//     } catch (error) {
//         next(error);
//     }
// }

const logout: ControllerHandler = async (req, res, next) => {
    try {
        await clearRefreshToken(req.body.refreshToken);
        res.json({});
    } catch (error) {
        next(error);
    }
};

const refreshToken: ControllerHandler = async (req, res, next) => {
    try {
        let refreshToken = req.cookies.refreshToken || '';
        let refreshTokenPayload = await verifyRefreshToken(refreshToken);
        await verifyUserFromRefreshTokenPayload(refreshTokenPayload);
        let newAccessToken = await generateAccessTokenFromRefreshTokenPayload(
            refreshTokenPayload
        );
        res.json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        next(error);
    }
};

const resetPassword: ControllerHandler = async (req, res, next) => {
    try {
        await verifyCurrentPassword(req["authData"].userId, req.body.password);
        await updatePassword(req["authData"].userId, req.body.newPassword);
        res.json({});
    } catch (error) {
        next(error);
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleUserRegister: ControllerHandler = async (req, res, next) => {
    try {
        const {token} = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        if (typeof ticket.getPayload() !== "undefined") {
            const {email, picture, name} = ticket.getPayload();
            const newUser = await createNewUser({
                email,
                name,
                image: picture,
                source: "google",
                role: ROLE.USER,
            });
            const tokens = await generateAuthTokens(newUser)
            res.json({user: newUser, tokens});
        } else {
            throw new ApiError(400, "Not authentication")
        }
    } catch (error) {
        next(error);
    }
}
const googleUserLogin: ControllerHandler = async (req, res, next) => {
    try {
        const {token} = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        if (typeof ticket.getPayload() !== "undefined") {
            const {email} = ticket.getPayload();
            const user = await fetchUserFromEmail({email});
            const tokens = await generateAuthTokens(user);
            res.json({user, tokens});
        } else {
            throw new ApiError(400, "Not authentication")
        }
    } catch (error) {
        next(error);
    }
}

export default {
    login, logout, refreshToken, resetPassword, register, googleUserRegister, googleUserLogin, validateActivateCode
}