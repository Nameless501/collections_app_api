import HttpStatusCodes from './httpCodes.config.js';

import HttpMessages from './httpMessages.config.js';

import { ErrorsConfigType } from '../types/common.types.js';

const errorsConfig: ErrorsConfigType<HttpStatusCodes, HttpMessages> = {
    badRequest: {
        statusCode: HttpStatusCodes.badRequest,
        message: HttpMessages.badRequest,
    },
    validation: {
        statusCode: HttpStatusCodes.badRequest,
        message: HttpMessages.validationError,
    },
    notFound: {
        statusCode: HttpStatusCodes.notFound,
        message: HttpMessages.notFound,
    },
    forbidden: {
        statusCode: HttpStatusCodes.forbidden,
        message: HttpMessages.forbidden,
    },
    emailConflict: {
        statusCode: HttpStatusCodes.emailConflict,
        message: HttpMessages.emailConflict,
    },
    dataAccess: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: HttpMessages.dataAccessError,
    },
    wrongCredentials: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: HttpMessages.wrongCredentials,
    },
    tooManyRequests: {
        statusCode: HttpStatusCodes.tooManyRequests,
        message: HttpMessages.tooManyRequests,
    },
    default: {
        statusCode: HttpStatusCodes.defaultError,
        message: HttpMessages.defaultError,
    },
} as const;

export default errorsConfig;
