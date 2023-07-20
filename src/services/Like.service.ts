import { ModelCtor, Op } from 'sequelize';

import LikeModel from '../models/like.model.js';

import { ILikeModel } from '../types/likes.type.js';

import DataAccessError from '../errors/DataAccess.error.js';

class LikeService {
    constructor(private likeModel: ModelCtor<ILikeModel>) { }

    public findOrSetLike = async (itemId: number, userId: number): Promise<ILikeModel> => {
        const [like, created] = await this.likeModel.findOrCreate({
            where: {
                [Op.and]: [
                    { itemId },
                    { userId }
                ]
            },
            defaults: { itemId, userId },
        });
        if(!created) throw new DataAccessError();
        return like;
    };

    public deleteLike = async (itemId: number, userId: number): Promise<void> => {
        await this.likeModel.destroy({
            where: {
                [Op.and]: [
                    { itemId },
                    { userId }
                ]
            }
        });
    };
}

export default new LikeService(LikeModel);
