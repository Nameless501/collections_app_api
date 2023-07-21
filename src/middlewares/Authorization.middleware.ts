import { NextFunction, Response } from 'express';

import { UserRequest } from '../types/common.types.js';

import DataAccessError from '../errors/DataAccess.error.js';

import { verifyToken } from '../utils/token.util.js';

import { IUserModel } from '../types/users.types.js';

import userService from '../services/User.service.js';

class Authorization {
    private token?: string;

    private userId?: number;

    constructor(
        private findUserByCredentials: (
            credentials: Partial<IUserModel>
        ) => Promise<IUserModel>
    ) {}

    private getToken = (req: UserRequest): void => {
        this.token = req.cookies.jwt;
        if (!this.token) {
            throw new DataAccessError();
        }
    };

    private verifyToken = (): void => {
        try {
            const payload = verifyToken(this.token as string);
            this.userId = payload.id;
        } catch (err) {
            throw new DataAccessError();
        }
    };

    private findUserData = (): Promise<IUserModel> =>
        this.findUserByCredentials({ id: this.userId });

    private saveUserData = async (req: UserRequest): Promise<void> => {
        const { id, isAdmin } = await this.findUserData();
        req.userId = id;
        req.isAdmin = isAdmin;
    };

    private verifyUser = async (req: UserRequest): Promise<void> => {
        this.getToken(req);
        this.verifyToken();
        await this.saveUserData(req);
    };

    public authorize = async (
        req: UserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.verifyUser(req);
            next();
        } catch (err) {
            next(err);
        }
    };
}

export default new Authorization(userService.findUserByCredentials);
