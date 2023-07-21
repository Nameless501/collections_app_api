import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { IUserModel } from './users.types.js';

export interface ICommentModel
    extends Model<
        InferAttributes<ICommentModel>,
        InferCreationAttributes<ICommentModel>
    > {
    id: CreationOptional<number>;
    itemId: number;
    userId: number;
    value: string;
    createdAt: CreationOptional<Date>;
    user?: IUserModel;
    getUser: () => Promise<IUserModel>;
}

export type CommentRequestType = {
    itemId: number;
    userId: number;
    value: string;
};
