import sequelize from '../configs/db.config.js';

import { ICollectionModel } from '../types/collections.type.js';

import { collectionsTableConfig } from '../configs/tables.config.js';

import UserModel from './user.model.js';

import FieldModel from './field.model.js';

const CollectionModel = sequelize.define<ICollectionModel>(
    collectionsTableConfig.name,
    collectionsTableConfig.attributes,
    collectionsTableConfig.options
);

UserModel.hasMany(CollectionModel);

CollectionModel.belongsTo(UserModel);

CollectionModel.hasMany(FieldModel);

FieldModel.belongsTo(CollectionModel);

export default CollectionModel;
