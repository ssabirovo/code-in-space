import {sign, verify} from '../utils/jwtHelpers.js';
import {tokenTypes} from '../config/tokens.js';

import {RefreshTokenModel} from '../models/index.js';
import moment from 'moment';
import httpStatus from 'http-status';

import APIError from '../utils/APIError.js';

export const generateToken = async (userId, loginTime, expires, type) => {
    const payload = {
        userId,
        loginTime: new Date(loginTime),
        exp: expires.unix(),
        type,
    };
    return await sign(payload, process.env.JWT_SECRET);
};

export const saveRefreshToken = async (userId, loginTime, token) => {
    await RefreshTokenModel.findOneAndUpdate(
        {userRef: userId},
        {
            loginTime: new Date(loginTime),
            token: token,
        },
        {
            upsert: true,
        }
    );
};

export const clearRefreshToken = async (token) => {
    await RefreshTokenModel.findOneAndDelete({token: token});
};

export const generateAuthTokens = async (user) => {
    const loginTime = moment();
    let accessTokenExpiresAt = loginTime
        .clone()
        .add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, 'minutes');

    const accessToken = await generateToken(
        user._id,
        loginTime,
        accessTokenExpiresAt,
        tokenTypes.ACCESS,
    );

    let refreshTokenExpiresAt = loginTime
        .clone()
        .add(process.env.REFRESH_TOKEN_EXPIRATION_DAYS, 'days');

    const refreshToken = await generateToken(
        user._id,
        loginTime,
        refreshTokenExpiresAt,
        tokenTypes.REFRESH,
    );

    await saveRefreshToken(user._id, loginTime, refreshToken);

    return {
        accessToken,
        refreshToken,
    };
};

export const generateAccessTokenFromRefreshTokenPayload = async ({
                                                                     userId,
                                                                     loginTime,
                                                                     platform,
                                                                 }) => {
    const now = moment();
    let accessTokenExpiresAt = now.add(
        process.env.ACCESS_TOKEN_EXPIRATION_MINUTES,
        'minutes'
    );

    return await generateToken(
        userId,
        moment(loginTime),
        accessTokenExpiresAt,
        tokenTypes.ACCESS,
        platform
    );
};

export const verifyRefreshToken = async (token) => {
    let tokenPayload = await verify(token, process.env.JWT_SECRET);
    if (!tokenPayload || tokenPayload.type !== tokenTypes.REFRESH)
        throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token - logout');

    let refreshTokenExists = await RefreshTokenModel.exists({token: token});
    if (!refreshTokenExists)
        throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token - logout');

    return tokenPayload;
};

