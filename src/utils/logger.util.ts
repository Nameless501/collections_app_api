import expressWinston from 'express-winston';

import { loggerConfig, LoggerFiles } from '../configs/logger.config.js';

export function createRequestLogger() {
    return expressWinston.logger(loggerConfig.getOptions(LoggerFiles.request));
}

export function createErrorLogger() {
    return expressWinston.errorLogger(
        loggerConfig.getOptions(LoggerFiles.error)
    );
}
