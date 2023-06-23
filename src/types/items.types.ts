import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export interface IItemModel
    extends Model<
        InferAttributes<IItemModel>,
        InferCreationAttributes<IItemModel>
    > {
    id: CreationOptional<number>;
    title: string;
}

export type ItemCredentialsType = {
    title: string;
    CollectionId: number;
    UserId: number;
};
