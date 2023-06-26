import { DataTypes } from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import CollectionModel from './collection.model.js';

import ItemModel from './item.model.js';

import ItemFieldModel from './itemField.model.js';

import { IFieldModel } from '../types/fields.type.js';

import { FieldTypes } from '../configs/models.config.js';

const FieldModel = sequelize.define<IFieldModel>('Fields', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(FieldTypes)),
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

CollectionModel.hasMany(FieldModel);

FieldModel.belongsTo(CollectionModel);

FieldModel.belongsToMany(ItemModel, { through: ItemFieldModel });

ItemModel.belongsToMany(FieldModel, { through: ItemFieldModel });

FieldModel.sync();

export default FieldModel;
