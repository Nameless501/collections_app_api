import { NextFunction, Request, Response } from 'express';

import userService from '../services/User.service.js';

import {
    CreateUser,
    FindUserByCredentials,
    IUserModel,
    SignInInputType,
    SignUpInputType,
} from '../types/users.types.js';

import {
    CookiesConfigType,
    TypedRequest,
    ResponseWithMessage,
    ComparePasswords,
    HashPassword,
} from '../types/common.types.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

import { assignToken } from '../utils/token.util.js';

import { cookiesConfig } from '../configs/common.config.js';

import { comparePassword, hashPassword } from '../utils/passwordHash.util.js';

class AuthenticationController {
    constructor(
        private findUserByCredentials: FindUserByCredentials,
        private createUser: CreateUser,
        private assignToken: (id: number) => string,
        private hashPassword: HashPassword,
        private comparePassword: ComparePasswords,
        private readonly cookiesConfig: CookiesConfigType
    ) {}

    private handleUserCreate = async (
        payload: SignUpInputType
    ): Promise<IUserModel> => {
        const password = await this.hashPassword(payload.password);
        return this.createUser({ ...payload, password });
    };

    private hideUserPassword = (user: IUserModel): void => {
        user.password = undefined;
    };

    public handleSignUp = async (
        req: TypedRequest<SignUpInputType>,
        res: Response<IUserModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.handleUserCreate(req.body);
            this.hideUserPassword(user);
            res.status(HttpStatusCodes.dataCreated).send(user);
        } catch (err) {
            next(err);
        }
    };

    private setCookieToken = (id: number, res: Response): void => {
        const token = this.assignToken(id);
        res.cookie(this.cookiesConfig.name, token, this.cookiesConfig.options);
    };

    private prepareUserData = (user: IUserModel, res: Response): void => {
        this.setCookieToken(user.id, res);
        this.hideUserPassword(user);
    };

    public handleSignIn = async (
        req: TypedRequest<SignInInputType>,
        res: Response<IUserModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.findUserByCredentials({ email });
            await this.comparePassword(password, user.password ?? '');
            this.prepareUserData(user, res);
            res.send(user);
        } catch (err) {
            next(err);
        }
    };

    public handleSignOut = (
        req: Request,
        res: ResponseWithMessage,
        next: NextFunction
    ): void => {
        try {
            res.clearCookie(this.cookiesConfig.name, this.cookiesConfig.options)
                .status(HttpStatusCodes.success)
                .send({ message: HttpMessages.signOut });
        } catch (err) {
            next(err);
        }
    };
}

export default new AuthenticationController(
    userService.findUserByCredentials,
    userService.createUser,
    assignToken,
    hashPassword,
    comparePassword,
    cookiesConfig
);
