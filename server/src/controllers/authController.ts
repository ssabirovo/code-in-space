import bcryptjs from 'bcryptjs';
import {
    createNewUser,
    fetchUserFromEmail,
    fetchUserFromEmailAndPassword,
    updatePassword,
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


const register = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await createNewUser({
            email: email,
            password: hashedPassword,
            source: "email"
        });
        const tokens = await generateAuthTokens(newUser)
        res.cookie("refreshToken", tokens.refreshToken, {
            expires: moment().day(process.env.REFRESH_TOKEN_EXPIRATION_DAYS ?? 0).toDate(),
            httpOnly: true,
            secure: true,
            path: "/",
        })
        res.json({user: userMapper(newUser), tokens});
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await fetchUserFromEmailAndPassword(req.body);
        const tokens = await generateAuthTokens(user);
        res.cookie("refreshToken", tokens.refreshToken, {
            expires: moment().day(process.env.REFRESH_TOKEN_EXPIRATION_DAYS ?? 0).toDate(),
            httpOnly: true,
            secure: true,
            path: "/",
        })
        res.json({user: userMapper(user), tokens});
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        await clearRefreshToken(req.body.refreshToken);
        res.json({});
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
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

const resetPassword = async (req, res, next) => {
    try {
        await verifyCurrentPassword(req.authData.userId, req.body.password);
        await updatePassword(req.authData.userId, req.body.newPassword);
        res.json({});
    } catch (error) {
        next(error);
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleUserRegister = async (req, res, next) => {
    try {
        const {token} = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        if (typeof ticket.getPayload() !== "undefined") {
            const {email, picture} = ticket.getPayload();
            const newUser = await createNewUser({
                email: email,
                name: name,
                image: picture,
                source: "google"
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
const googleUserLogin = async (req, res, next) => {
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
    login, logout, refreshToken, resetPassword, register, googleUserRegister, googleUserLogin
}