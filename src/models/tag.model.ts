import sequelize from '../services/Sequelize.service.js';

import { ITagModel } from '../types/tags.types.js'

import { tagTableConfig } from '../configs/tables.config.js';

const TagModel = sequelize.define<ITagModel>(
    tagTableConfig.name,
    tagTableConfig.attributes
);

export default TagModel;