import { ModelCtor } from 'sequelize';

import {
    ICommentModel,
    CreateComment,
    FindAllComments,
    FindItemComments,
    DeleteItemComments,
    FindCommentById,
} from '../types/comments.types.js';

import CommentModel from '../models/comment.model.js';

class CommentService {
    constructor(private commentModel: ModelCtor<ICommentModel>) {}

    public createComment: CreateComment = (payload) =>
        this.commentModel.create(payload);

    private findAllComments: FindAllComments = (param, scopes) =>
        this.commentModel.scope(scopes).findAll({ where: param });

    public findItemComments: FindItemComments = (itemId, scopes) =>
        this.findAllComments({ itemId }, scopes);

    public deleteItemComments: DeleteItemComments = async (id) => {
        await this.commentModel.destroy({ where: { id } });
    };

    public findCommentById: FindCommentById = async (id) => {
        const [comment] = await this.commentModel.findAll({ where: { id } });
        return comment;
    };
}

export default new CommentService(CommentModel);
