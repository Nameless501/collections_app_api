import { Request, Response, NextFunction } from 'express';

import { FindAllTags, ITagModel } from '../types/tags.types.js';

import tagService from '../services/Tag.service.js';

import { TagsScopes } from '../configs/enums.config.js';

class TagsController {
    constructor(private findAllTags: FindAllTags) {}

    public handleTagsList = async (
        req: Request,
        res: Response<ITagModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const tagsList = await this.findAllTags([TagsScopes.withItemTags]);
            res.send(tagsList);
        } catch (err) {
            next(err);
        }
    };
}

export default new TagsController(tagService.findAllTags);
