import { ModelCtor } from 'sequelize';

import TagModel from '../models/tag.model.js';

import { ITagModel, TagsCredentialsType } from '../types/tags.types.js';

class TagService {
    constructor(private tagModel: ModelCtor<ITagModel>) {}

    public findOrCreateTag = async (
        payload: TagsCredentialsType
    ): Promise<ITagModel> => {
        const tag = await this.tagModel.findOrCreate({ where: payload });
        return tag[0];
    };

    public findAllTags = (): Promise<ITagModel[]> => this.tagModel.findAll();
}

export default new TagService(TagModel);
