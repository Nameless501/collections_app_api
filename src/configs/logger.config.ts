import winston from 'winston';

import { LoggerConfigType } from '../types/common.types.js';

export enum LoggerFiles {
    request = 'logs/request.log',
    error = 'logs/error.log',
}

export const loggerConfig: LoggerConfigType<
    LoggerFiles,
    typeof winston.transports.File
> = {
    getOptions: (filename) => ({
        transports: [
            new winston.transports.File({
                filename,
            }),
        ],
    }),
};
