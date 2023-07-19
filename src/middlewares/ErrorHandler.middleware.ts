import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

import { UniqueConstraintError } from 'sequelize';

import { isCelebrateError } from 'celebrate';

import { MulterError } from 'multer';

import HttpError from '../errors/Http.error.js';

import DefaultError from '../errors/Default.error.js';

import ValidationError from '../errors/Validation.error.js';

import EmailConflictError from '../errors/EmailConflict.error.js';

import FileSizeError from '../errors/FileSize.error.js';

class ErrorHandler {
    private error: HttpError = new DefaultError();

    private setError = (err: HttpError): void => {
        this.error = err;
    };

    private handleValidationError = (err: Error): void => {
        if (isCelebrateError(err)) {
            const errorBody = err.details.get('body');
            const message = errorBody?.message;
            this.setError(new ValidationError(undefined, message));
        }
    };

    private handleEmailConflictError = (err: Error): void => {
        if (err instanceof UniqueConstraintError) {
            this.setError(new EmailConflictError());
        }
    };

    private handleFileSizeError = (err: Error) => {
        if (err instanceof MulterError) {
            this.setError(new FileSizeError());
        }
    };

    private setDefaultError = (err: Error): void =>
        this.setError(err instanceof HttpError ? err : new DefaultError());

    private getErrorHandlersList = () => [
        this.setDefaultError,
        this.handleValidationError,
        this.handleEmailConflictError,
        this.handleFileSizeError,
    ];

    private checkError = (err: Error): void => {
        this.getErrorHandlersList().forEach((handler) => handler(err));
    };

    private sendResponse = (res: Response): void => {
        res.status(this.error.statusCode).send({ message: this.error.message });
    };

    public watch: ErrorRequestHandler = (
        err: Error,
        req: Request,
        res: Response,
        _next: NextFunction
    ): void => {
        console.log(err)
        this.checkError(err);
        this.sendResponse(res);
    };
}

export default new ErrorHandler();
