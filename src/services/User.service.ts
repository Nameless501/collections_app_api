import { UniqueConstraintError, ModelCtor } from 'sequelize';

import UserModel, { IUserModel } from '../models/user.model.js';

import EmailConflictError from '../errors/EmailConflict.error.js';

import WrongCredentialsError from '../errors/WrongCredentials.error.js';

import DefaultError from '../errors/Default.error.js';

class UserService {
    constructor(private model: ModelCtor<IUserModel>) {}

    public createUser = async (payload: {
        name: string;
        email: string;
        password: string;
    }): Promise<IUserModel> | never => {
        try {
            return await this.model.create(payload);
        } catch (err) {
            const error =
                err instanceof UniqueConstraintError
                    ? EmailConflictError
                    : DefaultError;
            throw new error();
        }
    };

    public findUser = async (email: string): Promise<IUserModel> | never => {
        const user: IUserModel | null = await this.model.findOne({
            where: { email },
        });
        if (!user) {
            throw new WrongCredentialsError();
        }
        return user;
    };
}

const userService = new UserService(UserModel);

export default userService;
