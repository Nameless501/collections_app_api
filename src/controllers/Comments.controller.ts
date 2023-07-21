import { Request, Response, NextFunction } from 'express';

import commentService from '../services/Comment.service.js';

import {
    ResponseWithMessage,
    ScopeType,
    TypedRequest,
} from '../types/common.types.js';

import { CommentScopes } from '../configs/enums.config.js';

import { ICommentModel, CommentRequestType } from '../types/comments.type.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';

class CommentsController {
    constructor(
        private createComment: (
            payload: CommentRequestType
        ) => Promise<ICommentModel>,
        private findItemComments: (
            itemId: number,
            scopes?: ScopeType<CommentScopes>
        ) => Promise<ICommentModel[]>,
        private deleteItemComments: (
            commentId: number | number[]
        ) => Promise<void>
    ) {}

    private handleCreateComment = (req: TypedRequest<CommentRequestType>) =>
        this.createComment({
            value: req.body.value,
            itemId: Number(req.params.itemId),
            userId: req.userId as number,
        });

    private getCommentUser = async (comment: ICommentModel) => {
        const user = await comment.getUser();
        comment.setDataValue('user', user);
    };

    public handleLeaveComment = async (
        req: TypedRequest<CommentRequestType>,
        res: Response<ICommentModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const comment = await this.handleCreateComment(req);
            await this.getCommentUser(comment);
            res.status(HttpStatusCodes.dataCreated).send(comment);
        } catch (err) {
            next(err);
        }
    };

    public handleItemComments = async (
        req: Request,
        res: Response<ICommentModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const comments = await this.findItemComments(
                Number(req.params.itemId),
                [CommentScopes.withUser]
            );
            res.send(comments);
        } catch (err) {
            next(err);
        }
    };

    public handleDeleteComment = async (
        req: TypedRequest<{ id: number | number[] }>,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.deleteItemComments(req.body.id);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };
}

export default new CommentsController(
    commentService.createComment,
    commentService.findItemComments,
    commentService.deleteItemComments
);
