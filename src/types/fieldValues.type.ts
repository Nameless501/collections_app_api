import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IFieldModel } from './fields.type.js';

export interface IFieldValueModel
    extends Model<
        InferAttributes<IFieldValueModel>,
        InferCreationAttributes<IFieldValueModel>
    > {
    id: CreationOptional<number>;
    itemId: CreationOptional<number>;
    fieldId: CreationOptional<number>;
    value: string;
    field?: IFieldModel;
    getField: () => Promise<IFieldModel>;
}

export type FieldValueCredentialsType = {
    itemId: number;
    fieldId: number;
    value: string;
};

export type FieldValueResultType = {
    field: IFieldModel;
    value: IFieldValueModel;
};
