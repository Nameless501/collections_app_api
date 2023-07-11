import { NextFunction, Request, Response } from 'express';

import userService from '../services/User.service.js';

import {
    IUserModel,
    SignInInputType,
    SignOutputType,
    SignUpInputType,
} from '../types/users.types.js';

import {
    CookiesConfigType,
    TypedRequest,
    ResponseWithMessage,
} from '../types/common.types.js';

import {
    HttpStatusCodes,
    HttpMessages,
} from '../configs/httpResponse.config.js';

import { assignToken } from '../utils/token.util.js';

import { cookiesConfig } from '../configs/common.config.js';

import { comparePassword, hashPassword } from '../utils/passwordHash.util.js';

import { UsersScopes } from '../configs/enums.config.js';

class AuthenticationController {
    constructor(
        private findUserByCredentials: (
            credentials: Partial<IUserModel>,
            scopes?: Array<UsersScopes>
        ) => Promise<IUserModel> | never,
        private createUser: (payload: SignUpInputType) => Promise<IUserModel>,
        private assignToken: (id: number) => string,
        private hashPassword: (password: string) => Promise<string>,
        private comparePassword: (
            password: string,
            passwordHash: string
        ) => Promise<void> | never,
        private readonly cookiesConfig: CookiesConfigType
    ) {}

    private handleUserCreate = async (
        payload: SignUpInputType
    ): Promise<IUserModel> => {
        const password = await this.hashPassword(payload.password);
        return this.createUser({ ...payload, password });
    };

    private hideUserPassword = (user: SignOutputType): SignOutputType => {
        user.password = undefined;
        return user;
    };

    public handleSignUp = async (
        req: TypedRequest<SignUpInputType>,
        res: Response<SignOutputType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.handleUserCreate(req.body);
            res.status(HttpStatusCodes.dataCreated).send(
                this.hideUserPassword(user)
            );
        } catch (err) {
            next(err);
        }
    };

    private setCookieToken = (id: number, res: Response): void => {
        const token = this.assignToken(id);
        res.cookie(this.cookiesConfig.name, token, this.cookiesConfig.options);
    };

    public handleSignIn = async (
        req: TypedRequest<SignInInputType>,
        res: Response<SignOutputType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.findUserByCredentials({ email });
            await this.comparePassword(password, user.password as string);
            this.setCookieToken(user.id as number, res);
            res.send(this.hideUserPassword(user));
        } catch (err) {
            next(err);
        }
    };

    public handleSignOut = (
        req: Request,
        res: ResponseWithMessage<HttpMessages.signOut>,
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
