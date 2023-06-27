import sequelize from '../services/Sequelize.service.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

import { itemsFieldsConfig } from '../configs/tables.config.js';

const ItemFieldModel = sequelize.define<IItemFieldModel>(
    itemsFieldsConfig.name,
    itemsFieldsConfig.attributes
);

export default ItemFieldModel;
