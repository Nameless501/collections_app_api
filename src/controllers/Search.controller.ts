import { NextFunction, Request, Response } from 'express';

import { SearchHit } from '@elastic/elasticsearch/lib/api/types.js';

import searchService from '../services/Search.service.js';

import { Search } from '../types/search.types.js';

import { BulkFindItemById } from '../types/items.types.js';

import itemService from '../services/Item.service.js';
import { ItemScopes } from '../configs/enums.config.js';

class SearchController {
    constructor(
        private search: Search,
        private bulkFindItemsById: BulkFindItemById
    ) {}

    private getItemsIds = (result: SearchHit[]) =>
        result.reduce<number[]>((acc, { _id }) => {
            const id = Number(_id);
            if (!isNaN(id)) {
                acc.push(id);
            }
            return acc;
        }, []);

    private findResultItems = async (result: SearchHit[]) =>
        this.bulkFindItemsById(this.getItemsIds(result), [
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
                const items = await this.findResultItems(result.hits.hits);
                res.send(items);
            }
        } catch (err) {
            next(err);
        }
    };
}

export default new SearchController(
    searchService.search,
    itemService.bulkFindItemsById
);
