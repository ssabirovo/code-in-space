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

export const verify = async (token: string, secret: string): Promise<JwtPayload> => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                resolve(null);
            } else {
                if (typeof payload !== "string") {
                    resolve(payload);
                } else {
                    resolve(null)
                }
            }
        });
    });
};

