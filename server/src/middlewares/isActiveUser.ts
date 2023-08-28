import APIError from '../utils/ApiError';
import {RefreshTokenModel, UserModel,} from '../models';
import httpStatus from 'http-status';
import {verify} from '../utils/jwtHelpers';
import {AuthTokenPayload, TokenType} from "../types/auth";
import {ControllerHandler} from "../types/controller";

const isActiveUser: ControllerHandler = async (req, res, next) => {
    try {
        const accessToken = req.get('Authorization')?.replace("Bearer ", "");
        if (!accessToken)
            throw new APIError(httpStatus.UNAUTHORIZED, 'Invalid Access Token');

        let tokenPayload = await verify<AuthTokenPayload>(accessToken, process.env.JWT_SECRET);
        if (!tokenPayload || tokenPayload.type !== TokenType.ACCESS)
            throw new APIError(httpStatus.UNAUTHORIZED, 'Invalid Access Token');

        let userExists = await UserModel.exists({
            _id: tokenPayload.userId,
        });

        if (!userExists)
            throw new APIError(httpStatus.FORBIDDEN, 'Invalid Access Token - logout');

        let refreshTokenExists = await RefreshTokenModel.exists({
            userRef: tokenPayload.userId,
            loginTime: tokenPayload.loginTime,
        });

        if (!refreshTokenExists)
            throw new APIError(httpStatus.FORBIDDEN, 'Invalid Access Token - logout');
        req["authData"] = tokenPayload;


        next();
    } catch (error) {
        next(error);
    }
};

export {isActiveUser};
