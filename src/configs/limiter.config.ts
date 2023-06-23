import { NextFunction, Request, Response } from 'express';

import rateLimit, {
    Options,
    RateLimitRequestHandler,
} from 'express-rate-limit';

import TooManyRequestsError from '../errors/TooMenyRequests.error.js';

const errorHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    next(new TooManyRequestsError());
};

const options: Partial<Options> = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: errorHandler,
};

const limiter: RateLimitRequestHandler = rateLimit(options);

export default limiter;
