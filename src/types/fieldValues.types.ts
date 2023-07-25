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

export type UpdateFieldValueRequestType = {
    value: string;
};

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

export type FindFieldValueById = (
    id: number,
    scopes?: ScopeType<FieldValueScopes>
) => Promise<IFieldValueModel | null>;

export type FindItemFieldsValues = (
    itemId: number
) => Promise<IFieldValueModel[]>;

export type UpdateFieldsValue = (id: number, value: string) => Promise<void>;
