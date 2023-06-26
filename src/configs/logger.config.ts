import winston, { LoggerOptions } from 'winston';

import { LoggerConfigType } from '../types/common.types.js';

export enum LoggerFiles {
    request = 'logs/request.log',
    error = 'logs/error.log',
    database = 'logs/database.log',
}

const getTransportsOption = (
    filename: string
): Array<typeof winston.transports.File> => [
    new winston.transports.File({
        filename,
    }),
];

export const loggerConfig: LoggerConfigType<
    LoggerFiles,
    typeof winston.transports.File,
    LoggerOptions
> = {
    getExpressWinstonOptions: (filename) => ({
        transports: getTransportsOption(filename),
    }),
    getWinstonOptions: (filename) => ({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: getTransportsOption(filename),
    }),
};
