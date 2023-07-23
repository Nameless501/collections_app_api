import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import {
    IFieldValueModel,
    FieldValueCredentialsType,
} from './fieldValues.types.js';

import { ITagModel } from './tags.types.js';

import { IItemTagModel } from './itemTags.types.js';

import { ICollectionModel } from './collections.types.js';

import { ScopeType } from './common.types.js';

import { ItemScopes } from '../configs/enums.config.js';

export interface IItemModel
    extends Model<
        InferAttributes<IItemModel>,
        InferCreationAttributes<IItemModel>
    > {
    id: CreationOptional<number>;
    title: string;
    createdAt: CreationOptional<Date>;
    collectionId: CreationOptional<number>;
    collection?: ICollectionModel;
    fields?: Array<IFieldValueModel>;
    tags?: Array<ITagModel>;
    getFieldValues: () => Promise<IFieldValueModel[]>;
    addTag: (tag: ITagModel) => Promise<IItemTagModel>;
    getCollection: () => Promise<ICollectionModel>;
}

export type ItemRequestType = {
    collectionId: number;
    title: string;
    fields?: FieldValueCredentialsType[];
    tags?: string[];
};

export type ItemCredentialsType = {
    collectionId: number;
    title: string;
};

export type CreateItem = (payload: ItemCredentialsType) => Promise<IItemModel>;

export type FindItems = (
    param?: Partial<IItemModel>,
    scopes?: ScopeType<ItemScopes>
) => Promise<IItemModel[]>;

export type FindCollectionItems = (
    collectionId: number,
    scopes?: ScopeType<ItemScopes>
) => Promise<IItemModel[]>;

export type FindAllItems = (
    scopes?: ScopeType<ItemScopes>
) => Promise<IItemModel[]>;

export type FindItemById = (
    id: number,
    scopes?: ScopeType<ItemScopes>
) => Promise<IItemModel>;

export type DeleteItem = (id: number) => Promise<void>;

export type BulkFindItemById = (
    id: number[],
    scopes?: ScopeType<ItemScopes>
) => Promise<IItemModel[]>;
