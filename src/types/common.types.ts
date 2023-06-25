import { Request } from 'express';

export type ErrorsConfigType<T, U> = {
    [key: string]: {
        statusCode: T;
        message: U;
    };
};

export type RoutesConfigType = {
    [key: string]: {
        [key: string]: string;
    };
};

export type LoggerConfigType<T, U> = {
    getOptions: (filename: T) => { transports: Array<U> };
};

export type ValidationConfigTypes<T> = {
    [key: string]: T;
};

export type CookiesConfigType = {
    name: string;
    options: {
        [key: string]: string | boolean;
    };
};

export interface UserRequest extends Request {
    UserId?: number;
}

export interface TypedRequest<T> extends UserRequest {
    body: T;
    user?: {
        id: number;
    };
}
