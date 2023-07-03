import { Response, NextFunction } from 'express';

import { TypedRequest, UserRequest } from '../types/common.types.js';

import userService from '../services/User.service.js';

import { IUserModel } from '../types/users.types.js';

import { UsersScopes } from '../configs/enums.config.js';

import { HttpStatusCodes } from '../configs/httpResponse.config.js';

import { hashPassword } from '../utils/passwordHash.util.js';

class UsersController {
    constructor(
        private findAllUsers: (
            scopes?: Array<UsersScopes>
        ) => Promise<IUserModel[]>,
        private updateUser: (
            payload: Partial<IUserModel>,
            id: number
        ) => Promise<[affectedCount: number]>,
        private deleteUsers: (id: Array<number>) => Promise<number>,
        private hashPassword: (password: string) => Promise<string>
    ) {}

    public handleGetAllUsers = async (
        req: UserRequest,
        res: Response<IUserModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const users = await this.findAllUsers([
                UsersScopes.withoutPassword,
                UsersScopes.withCollections,
            ]);
            res.send(users);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteUsers = async (
        req: TypedRequest<{ id: number[] }>,
        res: Response<HttpStatusCodes>,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteUsers(req.body.id);
            res.sendStatus(HttpStatusCodes.success);
        } catch (err) {
            next(err);
        }
    };

    public handleUpdateUser = async (
        req: TypedRequest<Partial<IUserModel>>,
        res: Response<HttpStatusCodes>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const payload = req.body;
            if (payload.password) {
                payload.password = await this.hashPassword(payload.password);
            }
            await this.updateUser(payload, Number(req.params.id));
            res.sendStatus(HttpStatusCodes.dataUpdated);
        } catch (err) {
            next(err);
        }
    };
}

export default new UsersController(
    userService.findAllUsers,
    userService.updateUser,
    userService.deleteUsers,
    hashPassword
);
