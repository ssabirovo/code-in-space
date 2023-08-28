class ApiError extends Error {
    statusCode: number;
    type: string
    uuid: string

    constructor(statusCode, message, type = 'API Error', uuid = '') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.uuid = uuid;
    }
}

export default ApiError;
