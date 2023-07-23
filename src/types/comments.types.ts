import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IUserModel } from './users.types.js';

import { ScopeType } from './common.types.js';

import { CommentScopes } from '../configs/enums.config.js';

export interface ICommentModel
    extends Model<
        InferAttributes<ICommentModel>,
        InferCreationAttributes<ICommentModel>
    > {
    id: CreationOptional<number>;
    itemId: number;
    userId: number;
    value: string;
    createdAt: CreationOptional<Date>;
    user?: IUserModel;
    getUser: () => Promise<IUserModel>;
}

export type CommentRequestType = {
    itemId: number;
    userId: number;
    value: string;
};

export type CreateComment = (
    payload: CommentRequestType
) => Promise<ICommentModel>;

export type FindAllComments = (
    param?: Partial<ICommentModel>,
    scopes?: ScopeType<CommentScopes>
) => Promise<ICommentModel[]>;

export type FindItemComments = (
    itemId: number,
    scopes?: ScopeType<CommentScopes>
) => Promise<ICommentModel[]>;

export type DeleteItemComments = (id: number) => Promise<void>;

export type FindCommentById = (id: number) => Promise<ICommentModel>;
