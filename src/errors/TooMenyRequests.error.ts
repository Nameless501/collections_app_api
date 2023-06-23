import HttpError from './Http.error.js';

import errorsConfig from '../configs/errors.config.js';

const config = errorsConfig.tooManyRequests;

class TooManyRequestsError extends HttpError {
    constructor(
        public statusCode: number = config.statusCode,
        public message: string = config.message
    ) {
        super(statusCode, message);
    }
}

export default TooManyRequestsError;
