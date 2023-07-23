import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { ScopeType } from './common.types.js';
import { UsersScopes } from '../configs/enums.config.js';

export interface IUserModel
    extends Model<
        InferAttributes<IUserModel>,
        InferCreationAttributes<IUserModel>
    > {
    name: string;
    email: string;
    password?: string;
    isAdmin: CreationOptional<boolean>;
    id: CreationOptional<number>;
}

export type SignInInputType = {
    email: string;
    password: string;
};

export type SignUpInputType = SignInInputType & {
    name: string;
};

export type UpdateRoleRequestType = {
    id: number[];
    isAdmin: boolean;
};

export type DeleteUsersRequestType = {
    id: number[];
};

export type CreateUser = (payload: SignUpInputType) => Promise<IUserModel>;

type FindUserArgsType = {
    credentials?: Partial<IUserModel>;
    scopes?: ScopeType<UsersScopes>;
};

export type FindUsers = (args: FindUserArgsType) => Promise<IUserModel[]>;

export type FindUserByCredentials = (
    credentials: Partial<IUserModel>,
    scopes?: ScopeType<UsersScopes>
) => Promise<IUserModel> | never;

export type FindAllUsers = (
    scopes?: ScopeType<UsersScopes>
) => Promise<IUserModel[]>;

export type UpdateUsers = (
    payload: Partial<IUserModel>,
    id: number | number[]
) => Promise<void>;

export type DeleteUsers = (id: number | number[]) => Promise<void>;
