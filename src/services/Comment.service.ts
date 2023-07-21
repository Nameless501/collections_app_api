import { ModelCtor } from 'sequelize';

import { ScopeType } from '../types/common.types.js';

import { CommentScopes } from '../configs/enums.config.js';

import { ICommentModel, CommentRequestType } from '../types/comments.type.js';

import CommentModel from '../models/comment.model.js';

class CommentService {
    constructor(private commentModel: ModelCtor<ICommentModel>) {}

    public createComment = (
        payload: CommentRequestType
    ): Promise<ICommentModel> => this.commentModel.create(payload);

    private findAllComments = (
        param?: Partial<ICommentModel>,
        scopes?: ScopeType<CommentScopes>
    ): Promise<ICommentModel[]> =>
        this.commentModel.scope(scopes).findAll({ where: param });

    public findItemComments = (
        itemId: number,
        scopes?: ScopeType<CommentScopes>
    ): Promise<ICommentModel[]> => this.findAllComments({ itemId }, scopes);

    public deleteItemComments = async (
        id: number | number[]
    ): Promise<void> => {
        await this.commentModel.destroy({ where: { id } });
    };
}

export default new CommentService(CommentModel);
