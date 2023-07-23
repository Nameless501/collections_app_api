import { ModelCtor } from 'sequelize';

import TagModel from '../models/tag.model.js';

import {
    FindAllTags,
    FindOrCreateTag,
    ITagModel,
} from '../types/tags.types.js';

class TagService {
    constructor(private tagModel: ModelCtor<ITagModel>) {}

    public findOrCreateTag: FindOrCreateTag = async (value) => {
        const [tag] = await this.tagModel.findOrCreate({ where: { value } });
        return tag;
    };

    public findAllTags: FindAllTags = (scopes) =>
        this.tagModel.scope(scopes).findAll();
}

export default new TagService(TagModel);
