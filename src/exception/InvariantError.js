const { ClientError } = require('./ClientError');

class InvariantError extends ClientError {
    constructor(message) {
        super(message);
        this.Name = 'InvariantError';
    }
}

module.exports = { InvariantError };
