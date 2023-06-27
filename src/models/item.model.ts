import sequelize from '../services/Sequelize.service.js';

import { IItemModel } from '../types/items.types.js';

import { itemTableConfig } from '../configs/tables.config.js';

import ItemFieldModel from './itemField.model.js';

import UserModel from './user.model.js';

const ItemModel = sequelize.define<IItemModel>(
    itemTableConfig.name,
    itemTableConfig.attributes,
    itemTableConfig.options
);

ItemModel.hasMany(ItemFieldModel);

ItemFieldModel.belongsTo(ItemModel);

UserModel.hasMany(ItemModel);

ItemModel.belongsTo(UserModel);

export default ItemModel;
