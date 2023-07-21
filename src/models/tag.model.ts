import sequelize from '../configs/db.config.js';

import { ITagModel } from '../types/tags.types.js';

import { tagTableConfig } from '../configs/tables.config.js';

import ItemModel from './item.model.js';

import ItemTagModel from './itemTag.model.js';

const TagModel = sequelize.define<ITagModel>(
    tagTableConfig.name,
    tagTableConfig.attributes,
    tagTableConfig.options
);

ItemModel.belongsToMany(TagModel, { through: ItemTagModel });

TagModel.belongsToMany(ItemModel, { through: ItemTagModel });

ItemTagModel.belongsTo(ItemModel);

ItemModel.hasMany(ItemTagModel);

ItemTagModel.belongsTo(TagModel);

TagModel.hasMany(ItemTagModel);

export default TagModel;
