import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import CollectionSubjects from '../configs/subjects.config.js';

import UserModel from './user.model.js';

export interface ICollectionModel
    extends Model<
        InferAttributes<ICollectionModel>,
        InferCreationAttributes<ICollectionModel>
    > {
    title: string;
    subject: CollectionSubjects;
    description: string;
    image?: CreationOptional<string>;
    UserId?: number;
}

const CollectionModel = sequelize.define<ICollectionModel>('Collections', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
});

UserModel.hasMany(CollectionModel);

CollectionModel.belongsTo(UserModel);

export default CollectionModel;
