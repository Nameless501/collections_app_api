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
    ItemId: CreationOptional<number>;
    FieldId: CreationOptional<number>;
    value: string;
}
