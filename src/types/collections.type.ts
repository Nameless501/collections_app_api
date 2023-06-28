import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { CollectionSubjects } from '../configs/common.config.js';
import { FieldCredentialsType } from './fields.type.js';

export interface ICollectionModel
    extends Model<
        InferAttributes<ICollectionModel>,
        InferCreationAttributes<ICollectionModel>
    > {
    id: CreationOptional<number>;
    title: string;
    subject: CollectionSubjects;
    description: string;
    image: CreationOptional<string>;
    userId: CreationOptional<number>;
}

export type CollectionCredentialsType = {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: string;
    userId: number;
    fields: Array<FieldCredentialsType>;
};
