import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IFieldModel } from './fields.types.js';
import { ScopeType } from './common.types.js';
import { FieldValueScopes } from '../configs/enums.config.js';

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

export type SetFieldValue = (
    payload: FieldValueCredentialsType
) => Promise<IFieldValueModel>;

export type FindFieldValues = (
    payload: Partial<IFieldValueModel>,
    scopes?: ScopeType<FieldValueScopes>
) => Promise<IFieldValueModel[]>;

export type FindItemFieldsValues = (
    itemId: number
) => Promise<IFieldValueModel[]>;
