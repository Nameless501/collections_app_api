import sequelize from '../configs/db.config.js';

import { commentTableConfig } from '../configs/tables.config.js';

import { ICommentModel } from '../types/comments.type.js';

import UserModel from './user.model.js';

import ItemModel from './item.model.js';

const CommentModel = sequelize.define<ICommentModel>(
    commentTableConfig.name,
    commentTableConfig.attributes,
    commentTableConfig.options
);

CommentModel.belongsTo(ItemModel);

ItemModel.hasMany(CommentModel);

CommentModel.belongsTo(UserModel);

UserModel.hasMany(CommentModel);

export default CommentModel;
