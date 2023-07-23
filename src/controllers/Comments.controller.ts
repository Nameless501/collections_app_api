import { Request, Response, NextFunction } from 'express';

import commentService from '../services/Comment.service.js';

import searchService from '../services/Search.service.js';

import {
    ResponseWithMessage,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import { CommentScopes } from '../configs/enums.config.js';

import {
    ICommentModel,
    CommentRequestType,
    CreateComment,
    FindItemComments,
    DeleteItemComments,
    FindCommentById,
} from '../types/comments.types.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';

import { checkEditRights } from '../utils/helpers.util.js';

import { DeleteCommentIndex, IndexNewComment } from '../types/search.types.js';

class CommentsController {
    constructor(
        private createComment: CreateComment,
        private findItemComments: FindItemComments,
        private deleteItemComments: DeleteItemComments,
        private findCommentById: FindCommentById,
        private indexNewComment: IndexNewComment,
        private deleteCommentIndex: DeleteCommentIndex
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
            await this.indexNewComment(comment);
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

    private deleteCommentData = async (
        comment: ICommentModel
    ): Promise<void> => {
        await this.deleteCommentIndex(comment);
        await this.deleteItemComments(comment.id);
    };

    public handleDeleteComment = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            const comment = await this.findCommentById(
                Number(req.params.commentId)
            );
            checkEditRights(req, comment.userId);
            await this.deleteCommentData(comment);
            res.send({ message: HttpMessages.deleteSuccess });
        } catch (err) {
            next(err);
        }
    };
}

export default new CommentsController(
    commentService.createComment,
    commentService.findItemComments,
    commentService.deleteItemComments,
    commentService.findCommentById,
    searchService.indexNewComment,
    searchService.deleteCommentIndex
);
