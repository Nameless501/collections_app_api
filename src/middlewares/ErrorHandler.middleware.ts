import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

import { isCelebrateError, CelebrateError } from 'celebrate';

import HttpError from '../errors/Http.error.js';

import DefaultError from '../errors/Default.error.js';

import ValidationError from '../errors/Validation.error.js';

class ErrorHandler {
    private error: HttpError = new DefaultError();

    private handleValidationError = (err: CelebrateError): void => {
        const errorBody = err.details.get('body');
        const message = errorBody?.message;
        this.error = new ValidationError(undefined, message);
    };

    private handleCustomError = (err: Error): void => {
        this.error = err instanceof HttpError ? err : new DefaultError();
    };

    private checkError = (err: Error): void => {
        isCelebrateError(err)
            ? this.handleValidationError(err)
            : this.handleCustomError(err);
    };

    private sendResponse = (res: Response): void => {
        res.status(this.error.statusCode).send({ message: this.error.message });
    };

    public watch: ErrorRequestHandler = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        console.log(err);
        this.checkError(err);
        this.sendResponse(res);
    };
}

const errorHandler = new ErrorHandler();

export default errorHandler;
