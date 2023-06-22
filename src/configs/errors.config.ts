import HttpStatusCodes from './httpCodes.config.js';

type ErrorsConfigType = {
    [key: string]: {
        statusCode: HttpStatusCodes;
        message: string;
    };
};

const errorsConfig: ErrorsConfigType = {
    badRequest: {
        statusCode: HttpStatusCodes.badRequest,
        message: 'Error: The request cannot be fulfilled.',
    },
    validation: {
        statusCode: HttpStatusCodes.badRequest,
        message: 'Error: Request parameters is not valid.',
    },
    notFound: {
        statusCode: HttpStatusCodes.notFound,
        message: 'Error: Data not found.',
    },
    forbidden: {
        statusCode: HttpStatusCodes.forbidden,
        message: "Error: You don't have permission to access this resource.",
    },
    emailConflict: {
        statusCode: HttpStatusCodes.emailConflict,
        message: 'Error: This email is already used.',
    },
    dataAccess: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: 'Error: Access error - needed authentication.',
    },
    wrongCredentials: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: 'Error: Wrong email or password.',
    },
    default: {
        statusCode: HttpStatusCodes.defaultError,
        message: 'Error: Something went wrong. Try again Later.',
    },
} as const;

export default errorsConfig;
