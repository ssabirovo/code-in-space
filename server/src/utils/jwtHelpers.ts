import jwt, {JwtPayload} from 'jsonwebtoken';

export const sign = async (payload, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};

export const verify = async <T extends {[key: string]: any}>(token: string, secret: string): Promise<JwtPayload & T> => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                resolve(null);
            } else if (typeof payload !== "string") {
                resolve(payload as JwtPayload & T);
            } else {
                resolve(null)
            }
        });
    });
};

