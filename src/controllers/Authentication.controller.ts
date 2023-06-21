import { Request, Response, NextFunction } from 'express';

import { UniqueConstraintError } from 'sequelize';

import bcrypt from 'bcrypt';

import UserService from '../services/User.service.js';

import { IUserModel } from '../models/user.model.js';

import EmailConflictError from '../errors/EmailConflict.error.js';

import HttpStatusCodes from '../configs/httpCodes.config.js';

type UserCredentialsType = {
    password: string;
    name: string;
    email: string;
}

class AuthenticationController {
    constructor(
        private findUser: (email: string) => Promise<IUserModel>,
        private createUser: (payload: UserCredentialsType) => Promise<IUserModel>,
    ) {}

    private handleUserCreate = async ({ name, password, email }: UserCredentialsType): Promise<IUserModel> => {
        const passwordHash: string = await bcrypt.hash(password, 10);
        return this.createUser({ name, email, password: passwordHash });
    }

    private hideUserPassword = (user: IUserModel): IUserModel  => {
        user.password = undefined;
        return user;
    }

    public handleSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.handleUserCreate(req.body);
            res.status(HttpStatusCodes.dataCreated).send(this.hideUserPassword(user));
        } catch (err) {
            next(err instanceof UniqueConstraintError ? new EmailConflictError() : err);
        }
    }
}

const user = new UserService();

const authenticationController = new AuthenticationController(user.findUser, user.createUser);

export default authenticationController;