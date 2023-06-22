import { NextFunction, Request, Response } from 'express';

import DataAccessError from '../errors/DataAccess.error.js';

import { verifyToken } from '../utils/token.util.js';

class Authorization {
    private token: string | undefined;

    private getToken = (req: Request): void => {
        this.token = req.cookies.jwt;
        if (!this.token) {
            throw new DataAccessError();
        }
    };

    private verifyToken = (): void => {
        try {
            const payload = verifyToken(this.token as string);
        } catch (err) {
            throw new DataAccessError();
        }
    };

    public authorize = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        this.getToken(req);
        this.verifyToken();
        next();
    };
}

const authorization = new Authorization();

export default authorization;