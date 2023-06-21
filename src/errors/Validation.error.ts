import HttpError from './Http.error.js'

import errorsConfig from '../configs/errors.config.js'

const config = errorsConfig.validation

class ValidationError extends HttpError {
    constructor(
        public statusCode: number = config.statusCode,
        public message: string = config.message
    ) {
        super(statusCode, message)
    }
}

export default ValidationError
