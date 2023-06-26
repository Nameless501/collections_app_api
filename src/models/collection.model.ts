import { DataTypes } from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import { ICollectionModel } from '../types/collections.type.js';

import UserModel from './user.model.js';

import { CollectionSubjects } from '../configs/models.config.js';

const CollectionModel = sequelize.define<ICollectionModel>('Collections', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.ENUM(...Object.values(CollectionSubjects)),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
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

CollectionModel.sync();

export default CollectionModel;
