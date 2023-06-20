type ErrorsConfigType = {
    [key: string]: {
        statusCode: number,
        message: string,
    }
};

const errorsConfig: ErrorsConfigType = {
    badRequest: {
        statusCode: 400,
        message: 'Некорректные данные',
    },
    notFound: {
        statusCode: 404,
        message: 'Данные не найдены',
    },
    forbidden: {
        statusCode: 403,
        message: 'Ошибка доступа',
    },
    emailConflict: {
        statusCode: 409,
        message: 'Такой email уже зарегистрирован',
    },
    dataAccess: {
        statusCode: 401,
        message: 'Необходима авторизация',
    },
    wrongCredentials: {
        statusCode: 401,
        message: 'Неправильные почта или пароль',
    },
    default: {
        statusCode: 500,
        message: 'Произошла ошибка',
    },
} as const;

export default errorsConfig;