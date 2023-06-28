import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export interface IItemTagModel
    extends Model<
        InferAttributes<IItemTagModel>,
        InferCreationAttributes<IItemTagModel>
    > {
    id: CreationOptional<number>;
    itemId: CreationOptional<number>;
    tagId: CreationOptional<number>;
}
