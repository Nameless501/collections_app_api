import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import {
    CollectionScopes,
    CollectionSubjects,
} from '../configs/enums.config.js';

import { FieldCredentialsType, IFieldModel } from './fields.types.js';

import { IItemModel } from './items.types.js';

import { IUserModel } from './users.types.js';

import { ScopeType } from './common.types.js';

export interface ICollectionModel
    extends Model<
        InferAttributes<ICollectionModel>,
        InferCreationAttributes<ICollectionModel>
    > {
    id: CreationOptional<number>;
    title: string;
    subject: CollectionSubjects;
    description: string;
    image: CreationOptional<string>;
    userId: CreationOptional<number>;
    items?: IItemModel[];
    user?: IUserModel;
    createField: (payload: FieldCredentialsType) => Promise<IFieldModel>;
    getUser: () => Promise<IUserModel>;
}

export type CollectionCredentialsType = {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: string;
    userId: number;
    id?: number;
};

type CollectionScopesType = ScopeType<CollectionScopes>;

export type CreateCollection = (
    payload: CollectionCredentialsType
) => Promise<ICollectionModel>;

export type FindCollections = (
    param?: Partial<CollectionCredentialsType>,
    scopes?: CollectionScopesType
) => Promise<ICollectionModel[]>;

export type FindUserCollections = (
    userId: number,
    scopes?: CollectionScopesType
) => Promise<ICollectionModel[]>;

export type UpdateCollection = (
    payload: Partial<CollectionCredentialsType>,
    id: number
) => Promise<void>;

export type FindAllCollections = (
    scopes?: CollectionScopesType
) => Promise<ICollectionModel[]>;

export type DeleteCollection = (collectionId: number) => Promise<void>;

export type FindCollectionById = (
    collectionId: number,
    scopes?: CollectionScopesType
) => Promise<ICollectionModel>;
