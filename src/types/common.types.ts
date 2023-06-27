import { Request } from 'express';

import { Model, ModelAttributes, ModelOptions } from 'sequelize';

import { migrator } from '../configs/migrations.config.js';

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

export type LoggerConfigType<T, U, W> = {
    getExpressWinstonOptions: (filename: T) => { transports: Array<U> };
    getWinstonOptions: (filename: T) => W;
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
    userId?: number;
}

export interface TypedRequest<T> extends UserRequest {
    body: T;
    user?: {
        id: number;
    };
}

export type TableConfigType<M extends Model = Model> = {
    name: string;
    attributes: ModelAttributes<M>;
    options?: ModelOptions;
};

export type Migration = typeof migrator._types.migration;
