import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { FieldTypes } from '../configs/models.config.js';

export interface IFieldModel
    extends Model<
        InferAttributes<IFieldModel>,
        InferCreationAttributes<IFieldModel>
    > {
    id: CreationOptional<number>;
    type: FieldTypes;
    label: string;
}
