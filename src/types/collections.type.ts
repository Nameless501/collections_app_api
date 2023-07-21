import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { CollectionSubjects } from '../configs/enums.config.js';

import { FieldCredentialsType, IFieldModel } from './fields.type.js';

import { IItemModel } from './items.types.js';
import { IUserModel } from './users.types.js';

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
    items?: IItemModel[];
    user?: IUserModel;
    createField: (payload: FieldCredentialsType) => Promise<IFieldModel>;
    getFields: () => Promise<IFieldModel[]>;
    getUser: () => Promise<IUserModel>;
}

export type CollectionCredentialsType = {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: string;
    userId: number;
    id?: number;
};
