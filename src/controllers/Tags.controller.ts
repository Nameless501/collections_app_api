import { Request, Response, NextFunction } from 'express';

import { ITagModel } from '../types/tags.types.js';

import tagService from '../services/Tag.service.js';

class TagsController {
    constructor(private findAllTags: () => Promise<ITagModel[]>) {}

    public handleTagsList = async (
        req: Request,
        res: Response<ITagModel[]>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const tagsList = await this.findAllTags();
            res.send(tagsList);
        } catch (err) {
            next(err);
        }
    };
}

export default new TagsController(tagService.findAllTags);
