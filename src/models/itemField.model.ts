import sequelize from '../configs/db.config.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

import { itemsFieldsTableConfig } from '../configs/tables.config.js';

const ItemFieldModel = sequelize.define<IItemFieldModel>(
    itemsFieldsTableConfig.name,
    itemsFieldsTableConfig.attributes
);

export default ItemFieldModel;
