import { Request, Response, NextFunction } from 'express';

import commentService from '../services/Comment.service.js';

import searchService from '../services/Search.service.js';

import {
    ResponseWithMessage,
    ScopeType,
    TypedRequest,
    UserRequest,
} from '../types/common.types.js';

import { CommentScopes, SearchIndexes } from '../configs/enums.config.js';

import { ICommentModel, CommentRequestType } from '../types/comments.type.js';

import {
    HttpMessages,
    HttpStatusCodes,
} from '../configs/httpResponse.config.js';
import { checkEditRights } from '../utils/helpers.util.js';

class CommentsController {
    constructor(
        private createComment: (
            payload: CommentRequestType
        ) => Promise<ICommentModel>,
        private findItemComments: (
            itemId: number,
            scopes?: ScopeType<CommentScopes>
        ) => Promise<ICommentModel[]>,
        private deleteItemComments: (commentId: number) => Promise<void>,
        private findCommentById: (commentId: number) => Promise<ICommentModel>,
        private index: (
            index: SearchIndexes,
            id: number,
            document: { [key: string]: string | number }
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

    private indexComment = ({ id, itemId, value }: ICommentModel) =>
        this.index(SearchIndexes.comments, id, { itemId, value });

    public handleLeaveComment = async (
        req: TypedRequest<CommentRequestType>,
        res: Response<ICommentModel>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const comment = await this.handleCreateComment(req);
            await this.getCommentUser(comment);
            await this.indexComment(comment);
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

    private checkCommentEditRights = async (
        req: UserRequest
    ): Promise<void> => {
        const { userId } = await this.findCommentById(
            Number(req.params.commentId)
        );
        checkEditRights(req, userId);
    };

    public handleDeleteComment = async (
        req: UserRequest,
        res: ResponseWithMessage,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.checkCommentEditRights(req);
            await this.deleteItemComments(Number(req.params.commentId));
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
    searchService.index
);
