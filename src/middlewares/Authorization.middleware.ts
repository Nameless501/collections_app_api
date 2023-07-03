import { NextFunction, Response } from 'express';

import { UserRequest } from '../types/common.types.js';

import DataAccessError from '../errors/DataAccess.error.js';

import { verifyToken } from '../utils/token.util.js';

class Authorization {
    private token?: string;

    private getToken = (req: UserRequest): void => {
        this.token = req.cookies.jwt;
        if (!this.token) {
            throw new DataAccessError();
        }
    };

    private verifyToken = (req: UserRequest): void => {
        try {
            const payload = verifyToken(this.token as string);
            req.userId = payload.id;
        } catch (err) {
            throw new DataAccessError();
        }
    };

    public authorize = (
        req: UserRequest,
        res: Response,
        next: NextFunction
    ): void => {
        this.getToken(req);
        this.verifyToken(req);
        next();
    };
}

export default new Authorization();
