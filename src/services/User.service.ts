import { ModelCtor } from 'sequelize';

import UserModel from '../models/user.model.js';

import { IUserModel, SignUpInputType } from '../types/users.types.js';

import WrongCredentialsError from '../errors/WrongCredentials.error.js';

import { UsersScopes } from '../configs/common.config.js';

class UserService {
    constructor(private userModel: ModelCtor<IUserModel>) {}

    public createUser = async (payload: SignUpInputType): Promise<IUserModel> =>
        await this.userModel.create(payload);

    private findUsers = ({
        where,
        scopes = [],
    }: {
        where?: Partial<IUserModel>;
        scopes?: Array<UsersScopes>;
    }): Promise<IUserModel[]> =>
        this.userModel.scope(scopes).findAll({ where });

    public findUserByEmail = async (
        email: string,
        scopes?: Array<UsersScopes>
    ): Promise<IUserModel> | never => {
        const result = await this.findUsers({ where: { email }, scopes });
        if (result.length === 0) {
            throw new WrongCredentialsError();
        }
        return result[0];
    };

    public findAllUsers = (
        scopes: Array<UsersScopes> = []
    ): Promise<IUserModel[]> => this.findUsers({ scopes });

    public updateUser = (payload: Partial<IUserModel>, id: number) =>
        this.userModel.update(payload, { where: { id } });

    public deleteUsers = (id: Array<number>) =>
        this.userModel.destroy({ where: { id } });
}

const userService = new UserService(UserModel);

export default userService;
