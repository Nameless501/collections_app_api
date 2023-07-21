import { ModelCtor } from 'sequelize';

import TagModel from '../models/tag.model.js';

import { ITagModel } from '../types/tags.types.js';

import { ScopeType } from '../types/common.types.js';

import { TagsScopes } from '../configs/enums.config.js';

class TagService {
    constructor(private tagModel: ModelCtor<ITagModel>) {}

    public findOrCreateTag = async (value: string): Promise<ITagModel> => {
        const tag = await this.tagModel.findOrCreate({ where: { value } });
        return tag[0];
    };

    public findAllTags = (scopes?: ScopeType<TagsScopes>): Promise<ITagModel[]> => this.tagModel.scope(scopes).findAll();
}

export default new TagService(TagModel);
