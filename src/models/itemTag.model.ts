import sequelize from '../configs/db.config.js';

import { IItemTagModel } from '../types/itemTags.types.js';

import { itemTagTableConfig } from '../configs/tables.config.js';

const ItemTagModel = sequelize.define<IItemTagModel>(
    itemTagTableConfig.name,
    itemTagTableConfig.attributes
);

export default ItemTagModel;
