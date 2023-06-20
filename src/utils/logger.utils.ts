import expressWinston from 'express-winston';

import { loggerConfig, LoggerFilenames } from '../configs/logger.config.js'

export function createRequestLogger() {
    return expressWinston.logger(loggerConfig.getOptions(LoggerFilenames.request));
}

export function createErrorLogger() {
    return expressWinston.errorLogger(loggerConfig.getOptions(LoggerFilenames.error));
}