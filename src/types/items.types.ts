import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import {
    IFieldValueModel,
    FieldValueCredentialsType,
} from './fieldValues.type.js';

import { ITagModel } from './tags.types.js';

import { IItemTagModel } from './itemTags.type.js';

import { ICollectionModel } from './collections.type.js';

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
    getItemFields: () => Promise<IFieldValueModel[]>;
    addTag: (tag: ITagModel) => Promise<IItemTagModel>;
    getCollection: () => Promise<ICollectionModel>;
}

export type ItemRequestType = {
    collectionId: number;
    title: string;
    fields: Array<FieldValueCredentialsType>;
    tags: string[];
};

export type ItemCredentialsType = {
    collectionId: number;
    title: string;
};

export type ItemResponseType = {
    item: IItemModel;
    fields: Array<IFieldValueModel>;
    tags?: Array<ITagModel>;
};
