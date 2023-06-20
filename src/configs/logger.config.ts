import winston from 'winston';

type LoggerOptions = {
    transports: Array<typeof winston.transports.File>,
}

export enum LoggerFilenames {
    request = 'logs/request.log',
    error = 'logs/error.log',
}

interface ILogger {
    getOptions: (filename: LoggerFilenames) => LoggerOptions,
}

export const loggerConfig: ILogger = {
    getOptions: (filename) => ({
            transports: [
                new winston.transports.File({
                    filename,
                }),
            ],
        })
};