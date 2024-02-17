class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.Name = 'ClientError';
    }
}

module.exports = { ClientError };
