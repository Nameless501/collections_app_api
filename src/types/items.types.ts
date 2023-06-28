import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    DateDataType,
} from 'sequelize';

import { ItemFieldCredentialsType } from './itemFields.type.js';

import { TagsCredentialsType } from './tags.types.js';

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
}

export type ItemCredentialsType = {
    title: string;
    collectionId: number;
    userId: number;
    itemFields: Array<ItemFieldCredentialsType>;
    tags: Array<TagsCredentialsType>;
};
