import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { FieldTypes } from '../configs/common.config.js';

export interface IFieldModel
    extends Model<
        InferAttributes<IFieldModel>,
        InferCreationAttributes<IFieldModel>
    > {
    id: CreationOptional<number>;
    type: FieldTypes;
    label: string;
    collectionId: CreationOptional<number>;
    itemFieldId: CreationOptional<number>;
}

export type FieldCredentialsType = {
    type: FieldTypes;
    label: string;
    collectionId: CreationOptional<number>;
    itemFieldId: CreationOptional<number>;
};
