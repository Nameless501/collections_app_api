import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IFieldValueModel } from './fieldValues.types.js';

import { ICollectionModel } from './collections.types.js';

import { FieldTypes } from '../configs/enums.config.js';

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
    getCollection: () => Promise<ICollectionModel>;
}

export type FieldCredentialsType = {
    type: FieldTypes;
    label: string;
    collectionId?: number;
    itemFieldId?: number;
};

export type FieldWithValueType = {
    value: IFieldValueModel;
    field: IFieldModel;
};

export type FindFields = (
    payload: Partial<IFieldModel>
) => Promise<IFieldModel[]>;

export type FindCollectionFields = (
    collectionId: number
) => Promise<IFieldModel[]>;

export type FindFieldById = (id: number) => Promise<IFieldModel>;

export type UpdateField = (
    payload: Partial<IFieldModel>,
    id: number
) => Promise<void>;

export type DeleteField = (id: number) => Promise<void>;
