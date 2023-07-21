import { Response, NextFunction } from 'express';

import {
    TypedRequest,
    UserRequest,
    ResponseWithMessage,
} from '../types/common.types.js';

import userService from '../services/User.service.js';

import {
    IUserModel,
    UpdateRoleRequestType,
    DeleteUsersRequestType,
} from '../types/users.types.js';

import { UsersScopes } from '../configs/enums.config.js';

import { HttpMessages } from '../configs/httpResponse.config.js';

import { hashPassword } from '../utils/passwordHash.util.js';

import { checkEditRights } from '../utils/helpers.util.js';

import ForbiddenError from '../errors/Forbidden.error.js';

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

    private findUserData = (id: number): Promise<IUserModel> =>
        this.findUserByCredentials({ id }, [UsersScopes.withoutPassword]);

    public handleGetCurrentUser = async (
        req: UserRequest,
        res: Response<IUserModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.findUserData(req.userId as number);
            res.send(user);
        } catch (err) {
            next(err);
        }
    };

    public handleGetUserData = async (
        req: UserRequest,
        res: Response<IUserModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            checkEditRights(req, Number(req.params.userId));
            const user = await this.findUserData(Number(req.params.userId));
            res.send(user);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteUsers = async (
        req: TypedRequest<DeleteUsersRequestType>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteUsers(req.body.id);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };

    private updatePassword = async (
        payload: Partial<IUserModel>
    ): Promise<void> => {
        if (payload.password) {
            payload.password = await this.hashPassword(payload.password);
        }
    };

    private updateUserData = async (
        req: TypedRequest<Partial<IUserModel>>
    ): Promise<void> => {
        const payload = req.body;
        await this.updatePassword(payload);
        await this.updateUser(payload, Number(req.params.userId));
    };

    public handleUpdateUser = async (
        req: TypedRequest<Partial<IUserModel>>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            checkEditRights(req, Number(req.params.userId));
            await this.updateUserData(req);
            res.send({
                message: HttpMessages.updateSuccess,
            });
        } catch (err) {
            next(err);
        }
    };

    private checkIsAdmin = (req: TypedRequest<UpdateRoleRequestType>): void => {
        if (!req.isAdmin) {
            throw new ForbiddenError();
        }
    };

    public handleUsersRoleUpdate = async (
        req: TypedRequest<UpdateRoleRequestType>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            this.checkIsAdmin(req);
            const { id, isAdmin } = req.body;
            await this.updateUser({ isAdmin }, id);
            res.send({
                message: HttpMessages.updateSuccess,
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
