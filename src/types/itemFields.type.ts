import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IFieldModel } from './fields.type.js';

export interface IItemFieldModel
    extends Model<
        InferAttributes<IItemFieldModel>,
        InferCreationAttributes<IItemFieldModel>
    > {
    id: CreationOptional<number>;
    itemId: CreationOptional<number>;
    fieldId: CreationOptional<number>;
    value: string;
    getField: () => Promise<IFieldModel>;
}

export type ItemFieldCredentialsType = {
    itemId: number;
    fieldId: number;
    value: string;
};

export type ItemFieldResultType = {
    field: IFieldModel;
    value: IItemFieldModel;
};
