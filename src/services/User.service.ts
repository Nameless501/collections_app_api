import { ModelCtor } from 'sequelize';

import UserModel from '../models/user.model.js';

import {
    CreateUser,
    DeleteUsers,
    FindAllUsers,
    FindUserByCredentials,
    FindUsers,
    IUserModel,
    UpdateUsers,
} from '../types/users.types.js';

import WrongCredentialsError from '../errors/WrongCredentials.error.js';

class UserService {
    constructor(private userModel: ModelCtor<IUserModel>) {}

    public createUser: CreateUser = (payload) => this.userModel.create(payload);

    private findUsers: FindUsers = ({ credentials, scopes = [] }) =>
        this.userModel.scope(scopes).findAll({ where: credentials });

    public findUserByCredentials: FindUserByCredentials = async (
        credentials,
        scopes
    ) => {
        const [result] = await this.findUsers({ credentials, scopes });
        if (!result) {
            throw new WrongCredentialsError();
        }
        return result;
    };

    public findAllUsers: FindAllUsers = (scopes) => this.findUsers({ scopes });

    public updateUsers: UpdateUsers = async (payload, id) => {
        await this.userModel.update(payload, { where: { id } });
    };

    public deleteUsers: DeleteUsers = async (id) => {
        await this.userModel.destroy({ where: { id } });
    };
}

export default new UserService(UserModel);
