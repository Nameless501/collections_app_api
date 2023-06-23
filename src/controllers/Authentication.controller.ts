import { Request, Response, NextFunction } from 'express';

import userService from '../services/User.service.js';

import {
    IUserModel,
    SignUpInputType,
    SignOutputType,
} from '../types/users.types.js';

import { CookiesConfigType } from '../types/common.types.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

import { assignToken } from '../utils/token.util.js';

import { cookiesConfig } from '../configs/authorization.config.js';

import { comparePassword, hashPassword } from '../utils/passwordHash.util.js';

class AuthenticationController {
    constructor(
        private findUser: (email: string) => Promise<IUserModel> | never,
        private createUser: (
            payload: SignUpInputType
        ) => Promise<IUserModel> | never,
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
        req: Request,
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
        req: Request,
        res: Response<SignOutputType>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.findUser(email);
            await this.comparePassword(password, user.password as string);
            this.setCookieToken(user.id as number, res);
            res.send(this.hideUserPassword(user));
        } catch (err) {
            next(err);
        }
    };

    public handleSignOut = (
        req: Request,
        res: Response<HttpStatusCodes>,
        next: NextFunction
    ): void => {
        try {
            res.clearCookie(
                this.cookiesConfig.name,
                this.cookiesConfig.options
            ).sendStatus(HttpStatusCodes.success);
        } catch (err) {
            next(err);
        }
    };
}

const authenticationController = new AuthenticationController(
    userService.findUser,
    userService.createUser,
    assignToken,
    hashPassword,
    comparePassword,
    cookiesConfig
);

export default authenticationController;
