import HttpStatusCodes from './httpCodes.config.js'

type ErrorsConfigType = {
    [key: string]: {
        statusCode: HttpStatusCodes
        message: string
    }
}

const errorsConfig: ErrorsConfigType = {
    badRequest: {
        statusCode: HttpStatusCodes.badRequest,
        message: 'Некорректные данные',
    },
    notFound: {
        statusCode: HttpStatusCodes.notFound,
        message: 'Данные не найдены',
    },
    forbidden: {
        statusCode: HttpStatusCodes.forbidden,
        message: 'Ошибка доступа',
    },
    emailConflict: {
        statusCode: HttpStatusCodes.emailConflict,
        message: 'Такой email уже зарегистрирован',
    },
    dataAccess: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: 'Необходима авторизация',
    },
    wrongCredentials: {
        statusCode: HttpStatusCodes.dataAccessError,
        message: 'Неправильные почта или пароль',
    },
    default: {
        statusCode: HttpStatusCodes.defaultError,
        message: 'Произошла ошибка',
    },
} as const

export default errorsConfig
