const { ClientError } = require('./ClientError');

class NotFoundError extends ClientError {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.Name = 'NotFoundError';
    }
}

module.exports = { NotFoundError };
