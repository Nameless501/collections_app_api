import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export interface IItemFieldModel
    extends Model<
        InferAttributes<IItemFieldModel>,
        InferCreationAttributes<IItemFieldModel>
    > {
    id: CreationOptional<number>;
    itemId: CreationOptional<number>;
    fieldId: CreationOptional<number>;
    value: string;
}

export type ItemFieldCredentialsType = {
    itemId: number;
    fieldId: number;
    value: string;
};
