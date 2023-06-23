import { DataTypes } from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import { IItemModel } from '../types/items.types.js';

import CollectionModel from './collection.model.js';

import UserModel from './user.model.js';

const ItemModel = sequelize.define<IItemModel>(
    'Items',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: false,
    }
);

CollectionModel.hasMany(ItemModel);

ItemModel.belongsTo(CollectionModel);

UserModel.hasMany(ItemModel);

ItemModel.belongsTo(UserModel);

ItemModel.sync();

export default ItemModel;
