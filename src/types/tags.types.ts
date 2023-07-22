import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IItemTagModel } from './itemTags.type.js';

export interface ITagModel
    extends Model<
        InferAttributes<ITagModel>,
        InferCreationAttributes<ITagModel>
    > {
    id: CreationOptional<number>;
    value: string;
    itemTagId: CreationOptional<number>;
    itemTags?: IItemTagModel | IItemTagModel[];
}
