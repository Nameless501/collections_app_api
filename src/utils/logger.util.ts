import expressWinston from 'express-winston';

import winston from 'winston';

import { loggerConfig, LoggerFiles } from '../configs/logger.config.js';

const { getExpressWinstonOptions, getWinstonOptions } = loggerConfig;

export const requestLogger = expressWinston.logger(
    getExpressWinstonOptions(LoggerFiles.request)
);

export const errorLogger = expressWinston.errorLogger(
    getExpressWinstonOptions(LoggerFiles.error)
);

export const databaseLogger = winston.createLogger(
    getWinstonOptions(LoggerFiles.database)
);
