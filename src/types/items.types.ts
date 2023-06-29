import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    DateDataType,
} from 'sequelize';

import {
    IItemFieldModel,
    ItemFieldCredentialsType,
} from './itemFields.type.js';

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
    createdAt: CreationOptional<DateDataType>;
    collectionId: CreationOptional<number>;
    itemFieldId: CreationOptional<number>;
    userId: CreationOptional<number>;
    createItemField: (
        payload: ItemFieldCredentialsType
    ) => Promise<IItemFieldModel>;
    getItemFields: () => Promise<IItemFieldModel[]>;
    addTag: (tag: ITagModel) => Promise<IItemTagModel>;
}

export type ItemCredentialsType = {
    title: string;
    collectionId: number;
    userId: number;
    fields: Array<ItemFieldCredentialsType>;
    tags: Array<TagsCredentialsType>;
};

export type ItemResponseType = {
    item: IItemModel;
    fields: Array<{
        field: IFieldModel;
        value: IItemFieldModel;
    }>;
    tags: Array<ITagModel>;
};
