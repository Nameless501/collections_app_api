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

import { ITagModel, TagsCredentialsType } from './tags.types.js';

import { IFieldModel } from './fields.type.js';

import { IItemTagModel } from './itemTags.type.js';

export interface IItemModel
    extends Model<
        InferAttributes<IItemModel>,
        InferCreationAttributes<IItemModel>
    > {
    id: CreationOptional<number>;
    title: string;
    createdAt: CreationOptional<Date>;
    collectionId: CreationOptional<number>;
    userId: CreationOptional<number>;
    createItemField: (
        payload: FieldValueCredentialsType
    ) => Promise<IFieldValueModel>;
    getItemFields: () => Promise<IFieldValueModel[]>;
    addTag: (tag: ITagModel) => Promise<IItemTagModel>;
}

export type ItemCredentialsType = {
    title: string;
    collectionId: number;
    userId: number;
    fields: Array<FieldValueCredentialsType>;
    tags: Array<TagsCredentialsType>;
};

export type ItemResponseType = {
    item: IItemModel;
    fields: Array<IFieldValueModel>;
};
