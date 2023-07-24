import { NextFunction, Request, Response } from 'express';

import { SearchHit } from '@elastic/elasticsearch/lib/api/types.js';

import searchService from '../services/Search.service.js';

import tagService from '../services/Tag.service.js';

import { Search } from '../types/search.types.js';

import { BulkFindItemById } from '../types/items.types.js';

import itemService from '../services/Item.service.js';

import { ItemScopes, TagsScopes } from '../configs/enums.config.js';

import { FindTagById } from '../types/tags.types.js';

class SearchController {
    constructor(
        private search: Search,
        private bulkFindItemsById: BulkFindItemById,
        private findTagById: FindTagById
    ) {}

    private getItemsIds = (result: SearchHit[]) =>
        result.reduce<number[]>((acc, { _id }) => {
            const id = Number(_id);
            if (!isNaN(id)) {
                acc.push(id);
            }
            return acc;
        }, []);

    private findResultItems = async (id: number[]) =>
        this.bulkFindItemsById(id, [
            ItemScopes.withCollection,
            ItemScopes.withFieldValues,
            ItemScopes.withFieldValues,
        ]);

    public handleSearch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { query } = req.query;
            if (typeof query === 'string') {
                const result = await this.search(query);
                const items = await this.findResultItems(
                    this.getItemsIds(result.hits.hits)
                );
                res.send(items);
            }
        } catch (err) {
            next(err);
        }
    };

    private findItemTags = async (req: Request) => {
        const tagId = Number(req.params.tagId);
        if (typeof tagId === 'number') {
            const tag = await this.findTagById(Number(req.params.tagId), [
                TagsScopes.withItemTags,
            ]);
            return tag?.itemTags ? tag.itemTags : undefined;
        }
    };

    private findTagItemsId = async (
        req: Request
    ): Promise<number[] | undefined> => {
        const itemTags = await this.findItemTags(req);
        if (Array.isArray(itemTags)) {
            return itemTags.map(({ itemId }) => itemId);
        }
    };

    public handleSearchByTag = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = await this.findTagItemsId(req);
            if (id) {
                const items = await this.findResultItems(id);
                res.send(items);
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new SearchController(
    searchService.search,
    itemService.bulkFindItemsById,
    tagService.findTagById
);
