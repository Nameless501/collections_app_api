import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import CollectionSubjects from '../configs/subjects.config.js';

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
}

export type CollectionCredentialsType = {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: string;
    UserId: number;
};
