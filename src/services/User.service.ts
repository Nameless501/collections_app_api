import { ModelCtor } from 'sequelize';

import UserModel from '../models/user.model.js';

import { IUserModel, SignUpInputType } from '../types/users.types.js';

import { ScopeType } from '../types/common.types.js';

import WrongCredentialsError from '../errors/WrongCredentials.error.js';

import { UsersScopes } from '../configs/enums.config.js';

class UserService {
    constructor(private userModel: ModelCtor<IUserModel>) {}

    public createUser = (payload: SignUpInputType): Promise<IUserModel> =>
        this.userModel.create(payload);

    private findUsers = ({
        where,
        scopes = [],
    }: {
        where?: Partial<IUserModel>;
        scopes?: ScopeType<UsersScopes>;
    }): Promise<IUserModel[]> =>
        this.userModel.scope(scopes).findAll({ where });

    public findUserByCredentials = async (
        credentials: Partial<IUserModel>,
        scopes?: ScopeType<UsersScopes>
    ): Promise<IUserModel> | never => {
        const result = await this.findUsers({ where: credentials, scopes });
        if (result.length === 0) {
            throw new WrongCredentialsError();
        }
        return result[0];
    };

    public findAllUsers = (
        scopes: ScopeType<UsersScopes> = []
    ): Promise<IUserModel[]> => this.findUsers({ scopes });

    public updateUser = (payload: Partial<IUserModel>, id: number) =>
        this.userModel.update(payload, { where: { id } });

    public deleteUsers = (id: Array<number>) =>
        this.userModel.destroy({ where: { id } });
}

export default new UserService(UserModel);
