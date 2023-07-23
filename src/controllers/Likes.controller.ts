import { NextFunction } from 'express';

import likeService from '../services/Like.service.js';

import { DeleteLike, FindOrSetLike } from '../types/likes.types.js';

import { ResponseWithMessage, UserRequest } from '../types/common.types.js';

import { HttpMessages } from '../configs/httpResponse.config.js';

class LikesController {
    constructor(
        private findOrSetLike: FindOrSetLike,
        private deleteLike: DeleteLike
    ) {}

    public handleLikeSet = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (req.userId) {
                await this.findOrSetLike(Number(req.params.itemId), req.userId);
                res.send({ message: HttpMessages.updateSuccess });
            }
        } catch (err) {
            next(err);
        }
    };

    public handleLikeDelete = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (req.userId) {
                await this.deleteLike(Number(req.params.itemId), req.userId);
                res.send({ message: HttpMessages.deleteSuccess });
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new LikesController(
    likeService.findOrSetLike,
    likeService.deleteLike
);
