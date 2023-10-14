import {IUser, Source} from "../models/UserModel";

export enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
}

export type AuthTokenPayload = {
    userId: string,
    loginTime: Date,
    exp: number,
    type: TokenType,
    platform: Source,
}


