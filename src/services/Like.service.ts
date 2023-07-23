import { ModelCtor, Op } from 'sequelize';

import LikeModel from '../models/like.model.js';

import { DeleteLike, FindOrSetLike, ILikeModel } from '../types/likes.types.js';

import ForbiddenError from '../errors/Forbidden.error.js';

class LikeService {
    constructor(private likeModel: ModelCtor<ILikeModel>) {}

    public findOrSetLike: FindOrSetLike = async (itemId, userId) => {
        const [like, created] = await this.likeModel.findOrCreate({
            where: {
                [Op.and]: [{ itemId }, { userId }],
            },
            defaults: { itemId, userId },
        });
        if (!created) throw new ForbiddenError();
        return like;
    };

    public deleteLike: DeleteLike = async (itemId, userId) => {
        await this.likeModel.destroy({
            where: {
                [Op.and]: [{ itemId }, { userId }],
            },
        });
    };
}

export default new LikeService(LikeModel);
