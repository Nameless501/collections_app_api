import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface ITagModel
    extends Model<
        InferAttributes<ITagModel>,
        InferCreationAttributes<ITagModel>
    > {
    id: CreationOptional<number>;
    value: string;
    itemId: CreationOptional<number>;
}

export type TagsCredentialsType = {
    value: string;
};