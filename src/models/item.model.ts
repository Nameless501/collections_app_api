import sequelize from '../services/Sequelize.service.js';

import { IItemModel } from '../types/items.types.js';

import ItemFieldModel from './itemField.model.js';

import UserModel from './user.model.js';

import TagModel from './tag.model.js';

import ItemTagModel from './itemTag.model.js';

import { itemTableConfig } from '../configs/tables.config.js';

const ItemModel = sequelize.define<IItemModel>(
    itemTableConfig.name,
    itemTableConfig.attributes,
    itemTableConfig.options
);

ItemModel.hasMany(ItemFieldModel);

ItemFieldModel.belongsTo(ItemModel);

UserModel.hasMany(ItemModel);

ItemModel.belongsTo(UserModel);

ItemModel.belongsToMany(TagModel, { through: ItemTagModel });

TagModel.belongsToMany(ItemModel, { through: ItemTagModel });

export default ItemModel;
