import {ActivateCode, UserModel} from '../models';
import httpStatus from 'http-status';

import APIError from '../utils/ApiError';
import bcrypt from 'bcryptjs';
import {JwtPayload} from "jsonwebtoken";
import {IUser} from "../models/UserModel";
import {ObjectId} from "mongoose";
import {randomInt} from "crypto";
import moment from "moment";
import {sendEmail} from "./emailService";
import logger from "../config/logger";

export const createNewUser = async (user: Partial<Omit<IUser, "_id">>) => {
    const oldUser = await UserModel.findOne({email: user.email.toLowerCase()});
    if (oldUser)
        throw new APIError(httpStatus.BAD_REQUEST, "Email already exists.")
    const newUser = await UserModel.create(user);
    if (!newUser)
        throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
    return newUser;
}

// export const createNewGoogleUser = async ({email, firstName, lastName, profilePhoto}) => {
//     const oldUser = await UserModel.findOne({email: email.toLowerCase()});
//     if (oldUser)
//         throw new APIError(httpStatus.BAD_REQUEST, "Email already exists.")
//     const newUser = await UserModel.create({email, source: "google", firstName, lastName, profilePhoto});
//     if (!newUser)
//         throw new APIError(httpStatus.BAD_REQUEST, "Oops...seems our server needed a break!")
//     return newUser;
// }

export const fetchUserFromEmailAndPassword = async ({email, password}) => {
    const user = await UserModel.findOne({
        email: email.toLowerCase(),
    })
        .lean();

    if (!user)
        throw new APIError(httpStatus.BAD_REQUEST, 'invalid credentials');

    let passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
        throw new APIError(httpStatus.BAD_REQUEST, 'invalid credentials');

    return user;
};
export const fetchUserFromEmail = async ({email}) => {
    const user = await UserModel.findOne({
        email: email.toLowerCase(),
    })
        .lean();

    if (!user)
        throw new APIError(httpStatus.BAD_REQUEST, 'please sign up - this email does not exist');

    return user;
};

export const verifyUserFromRefreshTokenPayload = async ({userId}: JwtPayload) => {
    const userExists = await UserModel.exists({
        _id: userId,
    });

    if (!userExists)
        throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token - logout');
};

// export const fetchUserFromAuthData = async ({userId}) => {
//     const user = await UserModel.findOne({
//         _id: userId,
//     })
//         .lean();
//
//     if (!user)
//         throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
//
//     return user;
// };

export const verifyCurrentPassword = async (userId, password) => {
    const user = await UserModel.findOne({
        _id: userId,
    })
        .select('password')
        .lean();

    let passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
        throw new APIError(httpStatus.BAD_REQUEST, 'invalid current password');
};

export const updatePassword = async (userId, newPassword) => {
    let newHash = await bcrypt.hash(newPassword, 10);

    let user = await UserModel.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            password: newHash,
        },
        {
            new: true,
        }
    );
    if (!user)
        throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
};

export const sendCode = async (userId: string | ObjectId) => {
    let user = await UserModel.findById(userId);
    if (!user)
        throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
    let activateCode = await generateActivateCode(userId);
    const text: string = `
    <h1>Hello ${user.email}</h1>
    <p>While ago someone register this email to service <b>${process.env.CURRENT_PROJECT}</b>.
    If it is not you please ignore this message.
    
    Your code:
    
    <h3>${activateCode.code}</h3>
    </p>
    <p style="margin-top: 5rem"></p>
    `
    let sentMessageInfo = await sendEmail({
        to: user.email,
        subject: "Verification code",
        html: text,
    });
    logger.info(sentMessageInfo)
}


export const generateActivateCode = async (userId: string | ObjectId) => {
    let user = await UserModel.findById(userId);
    if (!user)
        throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
    let exciteCode = await ActivateCode.findOne({userId});
    if (exciteCode) {
        await ActivateCode.deleteMany({userId})
    }
    let code = randomInt(100000, 999999);
    logger.info(`Code is ${code}`)
    let activateCode = new ActivateCode({
        code,
        userId,
        expireTime: moment().clone().add(process.env.ACTIVATE_CODE_EXPIRATION_MINUTES, "minutes").toDate(),
    });
    return await activateCode.save();
}

export const validateCode = async (userId: string | ObjectId, code: number): Promise<Boolean> => {
    let activateCode = await ActivateCode.findOne({userId});
    if(!activateCode){
        throw new APIError(httpStatus.BAD_REQUEST, "Code didn't request")
    }
    return code === activateCode.code;

}

export const activeUser = async (userId: string | ObjectId) => {
    let user = await UserModel.findOneAndUpdate({_id: userId}, {active: true}, {new: true});
    if (!user)
        throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
}

  