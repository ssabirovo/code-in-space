import jwt from 'jsonwebtoken';

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

export const verify = async (token, secret) => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                resolve(null);
            } else {
                resolve(payload);
            }
        });
    });
};

