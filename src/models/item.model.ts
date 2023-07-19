import sequelize from '../configs/db.config.js';

import { IItemModel } from '../types/items.types.js';

import FieldValueModel from './fieldValue.model.js';

import TagModel from './tag.model.js';

import ItemTagModel from './itemTag.model.js';

import CollectionModel from './collection.model.js';

import { itemTableConfig } from '../configs/tables.config.js';

const ItemModel = sequelize.define<IItemModel>(
    itemTableConfig.name,
    itemTableConfig.attributes,
    itemTableConfig.options
);

CollectionModel.hasMany(ItemModel);

ItemModel.belongsTo(CollectionModel);

ItemModel.hasMany(FieldValueModel);

FieldValueModel.belongsTo(ItemModel);

ItemModel.belongsToMany(TagModel, { through: ItemTagModel });

TagModel.belongsToMany(ItemModel, { through: ItemTagModel });

export default ItemModel;
