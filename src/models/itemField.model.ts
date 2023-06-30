import sequelize from '../services/Sequelize.service.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

import { itemsFieldsTableConfig } from '../configs/tables.config.js';

const ItemFieldModel = sequelize.define<IItemFieldModel>(
    itemsFieldsTableConfig.name,
    itemsFieldsTableConfig.attributes
);

export default ItemFieldModel;
