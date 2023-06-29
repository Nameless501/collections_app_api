import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { IItemModel } from './items.types.js';
import { IItemTagModel } from './itemTags.type.js';

export interface ITagModel
    extends Model<
        InferAttributes<ITagModel>,
        InferCreationAttributes<ITagModel>
    > {
    id: CreationOptional<number>;
    value: string;
    itemTagId: CreationOptional<number>;
    addItem: (item: IItemModel) => Promise<IItemTagModel>;
}

export type TagsCredentialsType = {
    value: string;
};
