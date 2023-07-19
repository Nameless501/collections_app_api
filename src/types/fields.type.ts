import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { FieldTypes } from '../configs/enums.config.js';

import { IItemModel } from './items.types.js';

import { IFieldValueModel } from './fieldValues.type.js';

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
    createItemField: ({
        itemId,
        value,
    }: {
        itemId: number;
        value: string;
    }) => IFieldValueModel;
    getItems: () => Array<IItemModel>;
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
