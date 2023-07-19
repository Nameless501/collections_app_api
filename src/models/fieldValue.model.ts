import sequelize from '../configs/db.config.js';

import { IFieldValueModel } from '../types/fieldValues.type.js';

import { fieldValueTableConfig } from '../configs/tables.config.js';

const FieldValueModel = sequelize.define<IFieldValueModel>(
    fieldValueTableConfig.name,
    fieldValueTableConfig.attributes,
    fieldValueTableConfig.options
);

export default FieldValueModel;
