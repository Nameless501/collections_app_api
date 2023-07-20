import sequelize from '../configs/db.config.js';

import { ILikeModel } from '../types/likes.type.js';

import { likesTableConfig } from '../configs/tables.config.js';

const LikeModel = sequelize.define<ILikeModel>(
    likesTableConfig.name,
    likesTableConfig.attributes
);

export default LikeModel;
