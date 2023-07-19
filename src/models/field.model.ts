import sequelize from '../configs/db.config.js';

import FieldValueModel from './fieldValue.model.js';

import { IFieldModel } from '../types/fields.type.js';

import { fieldTableConfig } from '../configs/tables.config.js';

const FieldModel = sequelize.define<IFieldModel>(
    fieldTableConfig.name,
    fieldTableConfig.attributes
);

FieldModel.hasMany(FieldValueModel);

FieldValueModel.belongsTo(FieldModel);

export default FieldModel;
