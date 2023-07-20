import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export interface ILikeModel
    extends Model<
        InferAttributes<ILikeModel>,
        InferCreationAttributes<ILikeModel>
    > {
    id: CreationOptional<number>;
    itemId: number;
    userId: number;
}
