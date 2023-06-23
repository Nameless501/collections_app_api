import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import CollectionModel from './collection.model.js';

import UserModel from './user.model.js';

export interface IItemModel
    extends Model<
        InferAttributes<IItemModel>,
        InferCreationAttributes<IItemModel>
    > {
    title: string;
}

const ItemModel = sequelize.define<IItemModel>(
    'Items',
    {
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
