import { Response, NextFunction } from 'express';

import {
    TypedRequest,
    UserRequest,
    ResponseWithMessage,
} from '../types/common.types.js';

import userService from '../services/User.service.js';

import { IUserModel } from '../types/users.types.js';

import { UsersScopes } from '../configs/enums.config.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

import { hashPassword } from '../utils/passwordHash.util.js';

class UsersController {
    constructor(
        private findAllUsers: (
            scopes?: Array<UsersScopes>
        ) => Promise<IUserModel[]>,
        private findUserByCredentials: (
            credentials: Partial<IUserModel>,
            scopes?: Array<UsersScopes>
        ) => Promise<IUserModel> | never,
        private updateUser: (
            payload: Partial<IUserModel>,
            id: number | number[]
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

    public handleGetCurrentUser = async (
        req: UserRequest,
        res: Response<IUserModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.findUserByCredentials({ id: req.userId }, [
                UsersScopes.withoutPassword,
            ]);
            res.send(user);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteUsers = async (
        req: TypedRequest<{ id: number[] }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteUsers(req.body.id);
            res.send({ message: HttpMessages.deleteUsers });
        } catch (err) {
            next(err);
        }
    };

    public handleUpdateUser = async (
        req: TypedRequest<Partial<IUserModel>>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            const payload = req.body;
            if (payload.password) {
                payload.password = await this.hashPassword(payload.password);
            }
            await this.updateUser(payload, Number(req.params.id));
            res.status(HttpStatusCodes.dataUpdated).send({
                message: HttpMessages.updateUsers,
            });
        } catch (err) {
            next(err);
        }
    };

    public handleUsersRoleUpdate = async (
        req: TypedRequest<{ id: number[]; isAdmin: boolean }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id, isAdmin } = req.body;
            await this.updateUser({ isAdmin }, id);
            res.status(HttpStatusCodes.dataUpdated).send({
                message: HttpMessages.updateUsers,
            });
        } catch (err) {
            next(err);
        }
    };
}

export default new UsersController(
    userService.findAllUsers,
    userService.findUserByCredentials,
    userService.updateUser,
    userService.deleteUsers,
    hashPassword
);
